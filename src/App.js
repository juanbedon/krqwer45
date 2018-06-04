import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { newTask: '', errors: { newTask: false }, tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: false },
        { id: 3, name: "Leer un rato", done: false }
      ]
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li key={task.id} className={task.done ? 'done' : ''} onClick={this.toggleTask.bind(this, task.id)}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.addTask.bind(this)}>
            <input type="text" id="new-task" value={this.state.newTask} onChange={this.changeNewTask.bind(this)} className={this.state.errors.newTask ? 'error' : ''} placeholder="Ingresa una tarea y oprime Enter"/>
          </form>
        </div>
      </div>
    )
  }

  addTask(e) {
    e.preventDefault();

    if(this.validateTask()) {
      const taskName = this.state.newTask;
      const taskId = this.state.tasks.length + 1;
      const task = { id: taskId, name: taskName, done: false };

      this.setState({
        tasks: this.state.tasks.concat(task),
        newTask: '',
      });
    }
  }

  toggleTask(taskId, e){
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if(task.id === taskId) task.done = !task.done;
        return task;
      })
    })
  }

  changeNewTask(e) {
    this.setState({
      newTask: e.target.value
    });
  }

  validateTask() {
    const newTask = this.state.newTask;
    if(newTask === '') {
      this.setState({ errors: { newTask: true } });
      return false;
    }
    this.setState({ errors: { newTask: false } });
    return true;
  } 

}

export default App;

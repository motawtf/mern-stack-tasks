import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tasks: [],
      _id: '',
      editing: false
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  addTask(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch(`http://localhost:4000/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: '',
          description: '',
          editing: false
        });
        this.fetchTasks();
      })
      .catch(err => console.error(err));
    } else {
      fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: '',
          description: ''
        });
        this.fetchTasks();
      })
      .catch(err => console.error(err));
    }
  }

  deleteTask(id) {
    fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.fetchTasks();
    })
    .catch(err => console.error(err));
  }

  updateTask(id) {
    this.setState({
      editing: true
    });

    fetch(`http://localhost:4000/api/tasks/${id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        title: data.data.title,
        description: data.data.description,
        _id: data.data._id
      });
    })
    .catch(err => console.error(err));
  }

  fetchTasks() {
    fetch('http://localhost:4000/api/tasks')
    .then(res => res.json())
    .then(data => {
      this.setState({
        tasks: data.data
      });
    })
    .catch(err => console.error(err));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  renderTasks(tasks) {
    if (tasks.length > 0) {
      return (
        <div className="col s7">
          <table className="">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.tasks.map(task => {
                  return (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                        <button className="btn light-blue" onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                        <button className="btn light-blue" onClick={() => this.updateTask(task._id)} style={{margin: '4px'}}><i className="material-icons">edit</i></button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="col s7">
          <h5>No data to display!</h5>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <nav className="light-blue">
          <div className="container">
            <a className="brand-logo" href="/">MERN Stack</a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input 
                          name="title" 
                          onChange={this.handleChange}
                          type="text" 
                          placeholder="Task title" 
                          value={this.state.title}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea 
                          name="description" 
                          onChange={this.handleChange}
                          className="materialize-textarea" 
                          placeholder="Task description" 
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue">{this.state.editing ? 'Editing' : 'Add'}</button>
                  </form>
                </div>
              </div>
            </div>

            {this.renderTasks(this.state.tasks)}
            
          </div>
        </div>
      </div>
    )
  }
}

export default App;

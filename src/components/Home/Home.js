import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

import Todos from '../Todo/Todos';
import AddTodo from '../Todo/AddTodo';
import './Home.css';

class Home extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            user : props.user || JSON.parse(localStorage.getItem("user")),
            todos: []
        };
    }

  componentDidMount() {
    console.log(localStorage.getItem("user"));  
    let userID = this.state.user.userID;
    console.log(userID);  
    axios.get(`https://payme-backend.herokuapp.com/user/${userID}/todos`)
      .then(res => this.setState({ todos: res.data.data }));
  }

  // to mark item as Completed
  markComplete = (id) => {
    let userID = this.state.user.userID;
    this.setState({
        todos: this.state.todos.map(todo => {
            if(todo.ID === id) {
              todo.completed = 1;
              axios.put(`https://payme-backend.herokuapp.com/user/${userID}/todo/${id}`)
              .then(res => console.log(res.data.msg)
              );
            }
            return todo;
        })
    });
  }

  // to delete item
  delTodo = (id) => {
    let user =  this.state.user.userID;  
    axios.delete(`https://payme-backend.herokuapp.com/user/${user}/todo/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.ID !== id)]}));
  }

 // to add item
  addTodo = (title) => {
    let user =  this.state.user.userID;
    axios.post(`https://payme-backend.herokuapp.com/user/${user}/todo`, {
      todo: {
        title: title,
        completed: 0
      }  
    })
    .then(res => {
        window.location.reload(false);        
        this.setState({
            todos: [...this.state.todos, res.data.data]
        })
    });  
  }

  render() {
    return (
      <Router>
        <div className="home">
          <div className="homeContainer">
            <h1 className="todoLabel">TodoList</h1>
            <AddTodo addTodo={this.addTodo} />
            <Todos todos={this.state.todos} markComplete = {this.markComplete} delTodo={this.delTodo}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home;
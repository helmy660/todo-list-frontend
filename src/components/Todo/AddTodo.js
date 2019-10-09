import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Todo.css';


export class AddTodo extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({ title: e.target.value });

    render() {
        return (
            <form className="todoForm">
                <input
                    className="addFiled"
                    type="text" 
                    name="title"
                    placeholder="Add Todo..." 
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <button onClick={this.onSubmit} style={{ float: 'right' }}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                </button>
            </form>
        )
    }
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo;

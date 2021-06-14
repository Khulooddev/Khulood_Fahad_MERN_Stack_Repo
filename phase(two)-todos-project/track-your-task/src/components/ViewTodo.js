import React, { Component } from 'react'
import '../todo.css';
import { Button, FormControl, Col, Row, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

class ViewTodo extends Component {


    constructor(props) {
        super(props);
        // states
        this.state = { todo: [], editable: false };
    }

    // handles input field change
    handleChange = (e) => {
        this.setState({ todo: e.target.value });
    }

    viewToDoList = () => {

        const todoList = this.props.todo;
        console.log('viewToDoList function called');
        console.log(typeof (todoList), todoList);

        if (!todoList || !todoList.length) {
            return <p>No Tasks Added yet</p>
        }
    }

    render() {

        const todoList = this.props.todo;
        console.log('viewToDoList function called');
        console.log(typeof (todoList), todoList);

        return (
            < ul >
                {!todoList || !todoList.length ? <p>No Tasks Added Yet :)</p> :
                    todoList.map(task =>
                        <li key={task.id} onClick={() => this.setState(prevState => ({ editable: !prevState.editable }))}>
                            <Row className='tasks-container-view align-items-center'>
                                <Col className='col-sm-2'>
                                    <Form.Check
                                        className='checkbox-task'
                                        type='checkbox'
                                        checked={task.complete}
                                        onClick={() => { this.props.toggleTaskState(task.label, task.id, !task.complete); }} />
                                </Col>

                                {this.state.editable === false ?
                                    <Col className='col-lg-8'>
                                        <FormControl
                                            className={task.complete === false ? 'input-text-update' : 'input-text-update input-text-update-complete'}
                                            aria-label="new task"
                                            aria-describedby="basic-addon2"
                                            value={task.label}
                                            placeholder=''
                                            readOnly
                                        /> </Col>
                                    :
                                    <Col className='col-lg-8'>
                                        <FormControl
                                            className={task.complete === false ? 'input-text-update' : 'input-text-update input-text-update-complete'}
                                            aria-label="new task"
                                            aria-describedby="basic-addon2"
                                            onChange={this.handleChange}
                                            defaultValue={task.label}
                                            placeholder=''
                                            onBlur={() => this.props.updateATask(this.state.todo, task.id)} />
                                    </Col>
                                }
                                <Col className='col-sm-2'>
                                    <Button variant="outline-secondary float-right"
                                        className='button-delete'
                                        onClick={() => this.props.deleteATask(task.id)}> &#10005;
                                    </Button>
                                </Col>
                            </Row>
                        </li>)}
            </ul >

        )
    }
}

// REDUX SECTION
const mapStateToProps = (state) => {
    return {
        todo: state.todo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteATask: (id) => dispatch({ type: "DELETE-TASK", payload: id }),
        updateATask: (task, id) => dispatch({ type: "UPDATE-TASK", payload: { label: task, id: id } }),
        toggleTaskState: (task, id, taskState) => dispatch({ type: "TOGGLE-TASK-STATE", payload: { label: task, id: id, complete: taskState } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTodo);
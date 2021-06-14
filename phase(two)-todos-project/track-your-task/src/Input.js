import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.css';
import { Button, InputGroup, FormControl, Col, Row, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';


class Input extends Component {

    // states
    constructor(props) {
        super(props);
        this.state = { todo: [], editable: false, text: '', };
    }

    handleChange = (e) => {
        this.setState({ todo: e.target.value });
    }


    viewToDoList = () => {

        const todoList = this.props.todo;
        console.log('viewToDoList function called');
        console.log(typeof (todoList), todoList);

        // if (!todoList || !todoList.length) {
        //     return <p>No Tasks Added yet</p>
        // }

        return (
            < ul >
                {todoList.map(task =>
                    <li key={task.id} onClick={() => this.setState(prevState => ({ editable: !prevState.editable }))}>
                        <Row className='tasks-container-view align-items-center'>

                            <Col className='col-sm-1'>

                                <Form.Check
                                    className='checkbox-task'
                                    type='checkbox'
                                    checked={task.complete}
                                    onClick={() => { this.props.toggleTaskState(task.id, !task.complete); }} />

                            </Col>

                            {this.state.editable === false ?
                                <>
                                    <Col className='col-sm-10'>
                                        <FormControl
                                            className={task.complete === false ? 'input-text-update' : 'input-text-update input-text-update-complete'}
                                            aria-label="new task"
                                            aria-describedby="basic-addon2"
                                            // onChange={(e) => this.handleChange(e)}
                                            value={task.label}
                                            placeholder=''
                                            readOnly
                                        /> </Col>
                                </>
                                :
                                <>
                                    <Col className='col-sm-10'>
                                        <FormControl
                                            className={task.complete === false ? 'input-text-update' : 'input-text-update input-text-update-complete'}
                                            aria-label="new task"
                                            aria-describedby="basic-addon2"
                                            // onChange={(e) => this.handleChange(e)}
                                            onChange={this.handleChange}
                                            defaultValue={task.label}
                                            placeholder=''
                                            onBlur={() => this.props.updateATask(this.state.todo, task.id)} />
                                    </Col>
                                </>
                            }
                            <Col className='col-sm-1'>
                                <Button variant="outline-secondary float-right"
                                    className='button-delete'
                                    onClick={() => this.props.deleteATask(task.id)}> &#10005;
                                </Button>
                                {/* <Button variant="outline-secondary float-right"
                                    className='button-update'
                                    disabled={this.state.editable == false}
                                    onClick={() => this.props.updateATask(this.state.todo, task.id)}> &#10004;
                                </Button> */}
                            </Col>
                        </Row>
                    </li>)
                }
            </ul >
        )
    }

    render() {

        return (
            <>
                <Row id='form-container'>
                    <Col className='col-12 justify-content-sm-center'>
                        <InputGroup className="mb-3">
                            <FormControl
                                id='input-text'
                                placeholder="Add a new task here"
                                aria-label="new task"
                                aria-describedby="basic-addon2"
                                onChange={this.handleChange}
                                onFocus="this.value=''"
                            />
                            {/* <InputGroup.Append> */}
                            <Button variant="outline-secondary"
                                id='button-add'
                                onClick={() => { this.props.addATask(this.state.todo); document.getElementById('input-text').value = '' }}> +
                            </Button>
                            {/* </InputGroup.Append> */}
                        </InputGroup>
                    </Col>
                    <Col id='tasks-container' className='col-12 justify-content-sm-center'>
                        {this.viewToDoList()}
                    </Col>

                </Row>
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        todo: state.todo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        addATask: (task) => dispatch({ type: "ADD-TASK", payload: { label: task, id: nanoid(), complete: false } }),
        deleteATask: (id) => dispatch({ type: "DELETE-TASK", payload: id }),
        updateATask: (task, id) => dispatch({ type: "UPDATE-TASK", payload: { label: task, id: id } }),
        toggleTaskState: (id, taskState) => dispatch({ type: "TOGGLE-TASK-STATE", payload: { id: id, complete: taskState } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
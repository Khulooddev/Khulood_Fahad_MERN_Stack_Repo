import React, { Component } from 'react';
import '../todo.css';
import { Button, InputGroup, FormControl, Col, Row, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import ViewToDo from './ViewTodo';

class AddTodo extends Component {

    constructor(props) {
        super(props);
        // states
        this.state = { todo: [] };
    }

    // handles input field change
    handleChange = (e) => {
        this.setState({ todo: e.target.value });
    }

    render() {

        return (

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
                            required="true"
                        />
                        <Button variant="outline-secondary"
                            id='button-add'
                            onClick={() => { this.props.addATask(this.state.todo); document.getElementById('input-text').value = '' }}> +
                        </Button>
                    </InputGroup>
                </Col>
                <Col id='tasks-container' className='col-12 justify-content-sm-center'>
                    <ViewToDo />
                </Col>
            </Row>
        );
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

        addATask: (task) => dispatch({ type: "ADD-TASK", payload: { label: task, id: nanoid(), complete: false } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
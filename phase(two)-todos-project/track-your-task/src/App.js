import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import AddTodo from './components/AddTodo';

class App extends Component {
  render() {
    return (
      <Container id='container'>
        <Row className="justify-content-sm-center">
          <Col sm="auto">
            <h1 id='heading-title'>To-Do List</h1>
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col className='col-md-10' >
            <AddTodo />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
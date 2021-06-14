import { createStore } from 'redux';
import reducer from './reducer';

// STORE
// Creates a Redux store that holds the complete state tree of this app 
// Needed to store task content, id and complete state
export default createStore(reducer);
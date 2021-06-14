const initialState = {
    todo: [],
};

// Determines changes to an application's state
// Here the state is todo which holds the content, the id and the complete in the form of array 
const reducer = (state = initialState, action) => {

    // actions to be executed depending on the action type
    switch (action.type) {

        case 'ADD-TASK':
            return {
                ...state,
                todo: [...state.todo, action.payload],
            };

        case 'DELETE-TASK':
            return {
                ...state,
                todo: state.todo.filter(task => task.id !== action.payload),
            };

        case 'UPDATE-TASK':
            const updatedTask = state.todo.map(task => {
                if (task.id === action.payload.id) {
                    return { ...task, label: action.payload.label }
                }
                return task;
            })
            return { ...state, todo: updatedTask, };

        case 'TOGGLE-TASK-STATE':
            const toggleToComplete = state.todo.map(task => {
                if (task.id === action.payload.id) {
                    return { ...task, label: action.payload.label, complete: action.payload.complete }
                }
                return task;
            })
            return { ...state, todo: toggleToComplete, };


        default:
            return state;
    }
}

export default reducer;


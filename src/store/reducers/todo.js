import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: [
        { id: 1, title: 'SWPP', content: 'take swpp class', done: true},
        { id: 2, title: 'Movie', content: 'watch movie', done: false },
        { id: 3, title: 'Dinner', content: 'eat dinner', done: false },
    ],
    selectedTodo: null
};
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            const newTodo = {
                id: state.todos.length + 1,
                title: action.title, 
                content: action.content,
                done: false
            }
            return {...state, todos: [...state.todos, newTodo]};
        case actionTypes.TOGGLE_DONE:
            const modified = state.todos.map((todo) => {
                if (action.targetID === todo.id) {
                    return {...todo, done: !todo.done};
                } else {
                    return {...todo};
                }
            });
            return {...state, todos: modified};
        case actionTypes.DELETE_TODO:
            const deleted = state.todos.filter((todo) => {
                return action.targetID !== todo.id;
            })
            return {...state, todos: deleted};
        case actionTypes.GET_TODO:
            return {...state, selectedTodo: action.targetTodo};
        case actionTypes.GET_ALL:
            return {...state, todos: action.todos};
        default:
            break;
    }
    return state;
}
export default todoReducer;
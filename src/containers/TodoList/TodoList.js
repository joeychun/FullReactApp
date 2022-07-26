import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import WithRouter from '../../routerCode/withRouterSample';
import * as actionCreators from '../../store/actions/index';
import './TodoList.css';

import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

const TodoList = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    props.onGetAll();
    axios.get('/api/todo/')
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }, [])

  const defaultState = {
    todos: [
      { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
      { id: 2, title: 'Movie', content: 'watch movie', done: false },
      { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
  }

  const [state] = useState(defaultState);

  const todos = props.storedTodos.map((td) => {
    return (
      <Todo
        key={td.id}
        title={td.title}
        done={td.done}
        clickDetail={() => {
          console.log('click todo handler');
          navigate('/todos/' + td.id);
        }}
        clickDone={() => props.onToggleTodo(td.id)}
        clickDelete={() => props.onDeleteTodo(td.id)}
      />);
  });

  let todo = null;
  if (state.selectedTodo) {
    todo = <TodoDetail
      title={state.selectedTodo.title}
      content={state.selectedTodo.content}
    />
  }

  return (
    <div className="TodoList">
      <div className="title">{props.title}</div>
      <div>
        {todos.length > 0 ?
          <div className="todos">{todos}</div> : <h3>No TODOs</h3>}
      </div>
      {todo}
      <div className="BottomLink">
        <NavLink to='/new-todo' exact>
          <button className="btn">
            New Todo
            </button>
        </NavLink>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) =>
      dispatch(actionCreators.toggleTodo(id)),
    onDeleteTodo: (id) =>
      dispatch(actionCreators.deleteTodo(id)),
    onGetAll: () =>
      dispatch(actionCreators.getTodos())
  };
}

const mapStateToProps = (state) => {
  return {
    storedTodos: state.td.todos
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(TodoList));




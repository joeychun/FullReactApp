import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './NewTodo.css';
import * as actionCreators from '../../../store/actions/index';

const NewTodo = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const postTodoHandler = () => {
    props.onStoreTodo(title, content);
    setSubmitted(true);
  }

  let redirect = null;
  if (submitted) {
    return <Navigate replace to='/todos' />;
  }

  return (
    <div className="NewTodo">
      {redirect}
      <h1>Add a Todo</h1>
      <label>Title</label>
      <input type="text" value={title}
        onChange={(event) => setTitle(event.target.value)} />
      <br></br>
      <label>Content</label>
      <textarea rows="4" type="text" value={content}
        onChange={(event) => setContent(event.target.value)} />
      <button onClick={() => postTodoHandler()}>Submit</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreTodo: (title, content) =>
      dispatch(actionCreators.postTodo({ title: title, content: content }))
  };
};

export default connect(null, mapDispatchToProps)(NewTodo);
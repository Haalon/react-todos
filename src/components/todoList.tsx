import React, { SyntheticEvent, useCallback, useState } from "react";
import classes from "./todoList.module.scss"

type TodoListItem = {
  text: string,
  done: boolean
}

type TodoListProps = {
  todos: TodoListItem[];
};

export const TodoList = ({ todos: initialTodods }: TodoListProps) => {
  const [todos, setTodos] = useState(initialTodods);
  const [newTodoText, setNewTodoText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value)
  }

  const submitText = (e:React.SyntheticEvent) => {
    e.preventDefault();
    if (!newTodoText) return;
    if (editIndex < 0) {
      setTodos([{text: newTodoText, done: false}, ...todos]);
      setNewTodoText("");
      return;
    }

    setTodos(todos.map((item, i) => i === editIndex ? {...item, text: newTodoText} : item));
    setEditIndex(-1);
    setNewTodoText("");
  }

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
    setEditIndex(-1);
  }

  const switchTodoDone = (index: number) => {
    setTodos(todos.map((item, i) => i === index ? {...item, done: !item.done} : item));
    setEditIndex(-1);
  }

  const switchTodoEdit = (index: number) => {
    if (index === editIndex) {
      setEditIndex(-1);
      setNewTodoText("");
      return;
    }

    setEditIndex(index);
    setNewTodoText(todos[index].text);
  }


  return (
    <>
      <form className={classes.addTodo} onSubmit={submitText}>
        <input onChange={handleChange} value={newTodoText}></input>
        <button onClick={submitText}>{editIndex >= 0 ? "Edit" : "Add" }</button> 
      </form>
      <div className={classes.todoList}>
        {todos.map((item, i) => (
          <div className={classes.todoItem} key={i} data-done={item.done} data-edit={i === editIndex}>
            <button tabIndex={0} onClick={e => switchTodoDone(i)}>{item.done ? '☑' : '☐'}</button>
            
            <div tabIndex={0} onClick={e => switchTodoEdit(i)}>
              <span data-testid={`todo${i}`}>{item.text}</span>  
            </div>
            <button tabIndex={0} className={classes.deleteBtn} onClick={e => deleteTodo(i)}>🗙</button>
          </div>  
        ))}
      </div>
    </>

  );
};

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

  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value)
  }, [])

  const addTodo = useCallback(() => {
    if (!newTodoText) return;
    setTodos([{text: newTodoText, done: false}, ...todos])
  }, [newTodoText, todos])

  const deleteTodo = useCallback((index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }, [todos])

  const switchTodoDone = useCallback((index: number) => {
    setTodos(todos.map((item, i) => i === index ? {...item, done: !item.done} : item))
  }, [todos])


  return (
    <>
      <div className={classes.addTodo}>
        <input onChange={handleChange}></input>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className={classes.todoList}>
        {todos.map((item, i) => (
          <div className={classes.todoItem} key={i} data-done={item.done}>
            <button onClick={e => switchTodoDone(i)}>{item.done ? '☑' : '☐'}</button>
            
            <div>
              <span data-testid={`todo${i}`}>{item.text}</span>  
            </div>
            <button className={classes.deleteBtn} onClick={e => deleteTodo(i)}>🗙</button>
          </div>  
        ))}
      </div>
    </>

  );
};

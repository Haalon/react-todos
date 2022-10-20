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

  const addTodo = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    setTodos([{text: newTodoText, done: false}, ...todos])
  }, [newTodoText])


  return (
    <>
      <div className={classes.addTodo}>
        <input onChange={handleChange}></input>
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className={classes.todoList}>
        {todos.map((item, i) => (
          <li key={i}>
            <span data-testid={`todo${i}`}>{item.text}</span>
          </li>
        ))}
      </ul>
    </>

  );
};

import React from "react";
import classes from "./todoList.module.scss"

type TodoListItem = {
  text: string,
  done: boolean
}

type TodoListProps = {
  todos: TodoListItem[];
};

export const TodoList = ({ todos }: TodoListProps) => {


  return (
    <ul className={classes.todoList}>
      {todos.map((item, i) => (
        <li key={i}>
          <span data-testid={`todo${i}`}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

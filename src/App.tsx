import React from "react";
import { TodoList } from "./components/todoList";

import "./styles.scss";

export default function App() {
  const todos = [
    { text: "Buy milk", done: true },
    { text: "Buy bread", done: false }
  ];

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <TodoList todos={todos} />
    </div>
  );
}

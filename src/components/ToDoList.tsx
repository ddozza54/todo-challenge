import React from "react";
import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  const [todo, doing, done] = useRecoilValue(toDoSelector);
  return (
    <div>
      <CreateToDo />
      <ul>
        <h2>To Do</h2>
        {todo.map((todo) => (
          <ToDo {...todo} />
        ))}
        <hr />
        <h2>Doing</h2>
        {doing.map((todo) => (
          <ToDo {...todo} />
        ))}
        <hr />
        <h2>Done</h2>
        {done.map((todo) => (
          <ToDo {...todo} />
        ))}
        <hr />
      </ul>
    </div>
  );
}

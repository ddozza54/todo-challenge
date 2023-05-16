import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, customCategories, toDoState } from "../atoms";

export default function ToDo({ text, category, id, customCategory }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const newCategories = useRecoilValue(customCategories);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(name);
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  const onDeleteBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTodos((oldTodos) => oldTodos.filter((v) => v.id !== id));
  };
  return (
    <li key={id}>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {newCategories.map(
        (cate) =>
          category !== cate && (
            <button name={cate} onClick={onClick}>
              {cate}
            </button>
          )
      )}
      <button onClick={onDeleteBtnClick}>❌</button>
    </li>
  );
}

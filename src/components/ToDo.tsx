import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, customCategories, toDoState } from "../atoms";
import styled from "styled-components";

const TodoLi = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 8px;
  border-radius: 10px;
  color: white;
  background-color: #7c86c3;
  span {
    margin: 0 5px;
  }
`;
const Btn = styled.button`
  background-color: #dbc8e9;
  border-radius: 5px;
  border: none;
  margin: 0 3px;
  padding: 5px;
  :hover {
    cursor: pointer;
  }
`;

const DeleteBtn = styled(Btn)`
  background-color: #dd72a0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
    <TodoLi key={id}>
      <span>{text}</span>
      <ButtonWrapper>
        {category !== Categories.TO_DO && (
          <Btn name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Btn>
        )}
        {category !== Categories.DOING && (
          <Btn name={Categories.DOING} onClick={onClick}>
            Doing
          </Btn>
        )}
        {category !== Categories.DONE && (
          <Btn name={Categories.DONE} onClick={onClick}>
            Done
          </Btn>
        )}
        {newCategories.map(
          (cate) =>
            category !== cate && (
              <Btn name={cate} onClick={onClick}>
                {cate}
              </Btn>
            )
        )}
        <DeleteBtn onClick={onDeleteBtnClick}>✖️</DeleteBtn>
      </ButtonWrapper>
    </TodoLi>
  );
}

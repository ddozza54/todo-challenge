import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  customCategories,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import CreateCategory from "./CreateCategory";

const Wrapper = styled.div`
  min-width: 350px;
  max-height: 98vh;
  padding: 15px;
  background-color: #ebeae0;
  margin: 20px 0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  border: #dd72a0 3px solid;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: ${(prop) => prop.theme.textColor};
`;

const Select = styled.select`
  height: 30px;
  margin: 10px 0;
  border-radius: 8px;
  border: none;
  padding: 5px;
  background-color: #dd72a0;
`;

const Option = styled.option`
  background-color: #f396be;
`;

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const newCategories = useRecoilValue(customCategories);

  return (
    <Wrapper>
      <Title>To-Dos</Title>
      <Select value={category} onInput={onInput}>
        <Option value={Categories.TO_DO}>To Do</Option>
        <Option value={Categories.DOING}>Doing</Option>
        <Option value={Categories.DONE}>Done</Option>
        {newCategories?.map((category: any) => (
          <Option key={Math.random()}>{category}</Option>
        ))}
        <Option value={Categories.ADD}>+ Add Category</Option>
      </Select>
      {category === Categories.ADD && <CreateCategory />}
      {category !== Categories.ADD && <CreateToDo />}
      <TodoBox>
        {toDos?.map((aTodo) => (
          <ToDo key={aTodo.id} {...aTodo} />
        ))}
      </TodoBox>
    </Wrapper>
  );
}

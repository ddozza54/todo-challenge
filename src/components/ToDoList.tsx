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
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface ICategoryForm {
  newCategory: string;
}

const Title = styled.h1`
  font-size: 20px;
  font-weight: 400;
`;

export default function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [newCategories, setNewCategories] = useRecoilState(customCategories);
  const handleNewCategory = ({ newCategory }: ICategoryForm) => {
    setNewCategories((old) => [...old, newCategory] as any);
    setValue("newCategory", "");
  };
  return (
    <div>
      <Title>To Dos</Title>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {newCategories?.map((category) => (
          <option key={Math.random()}>{category}</option>
        ))}
        <option value={Categories.ADD}>+ Add Category</option>
      </select>
      {category === Categories.ADD && (
        <div>
          <form onSubmit={handleSubmit(handleNewCategory)}>
            <input
              {...register("newCategory", { required: "Please write a Name" })}
              placeholder="New Category's Name"
            ></input>
            <button>Save</button>
          </form>
        </div>
      )}
      {category !== Categories.ADD && <CreateToDo />}
      {toDos?.map((aTodo) => (
        <ToDo key={aTodo.id} {...aTodo} />
      ))}
    </div>
  );
}

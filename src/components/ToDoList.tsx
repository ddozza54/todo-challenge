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

interface ICategoryForm {
  newCategory: string;
}

export default function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [newCategories, setNewCategories] = useRecoilState(customCategories);
  const handleNewCategory = ({ newCategory }: ICategoryForm) => {
    console.log(newCategory);
    setNewCategories((old) => [...old, newCategory] as any);
    setValue("newCategory", "");
  };
  console.log(newCategories);
  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {newCategories?.map(category=> <option>{category}</option>)}
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

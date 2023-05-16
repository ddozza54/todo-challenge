import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategories } from "../atoms";
import styled from "styled-components";

interface ICategoryForm {
  newCategory: string;
}
const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  border: #7c86c3 2px solid;
  border-radius: 10px;
  padding: 5px;
  margin-right: 8px;
`;
const Button = styled.button`
  background-color: #f19066;
  height: 50px;
  width: 15%;
  border: none;
  border-radius: 10px;
  padding: 5px;
`;

export default function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const setNewCategories = useSetRecoilState(customCategories);
  const handleNewCategory = ({ newCategory }: ICategoryForm) => {
    setNewCategories((old) => [...old, newCategory] as any);
    setValue("newCategory", "");
  };
  return (
    <Wrapper onSubmit={handleSubmit(handleNewCategory)}>
      <Input
        {...register("newCategory", { required: "Please write a Name" })}
        placeholder="New Category's Name"
      ></Input>
      <Button>Save</Button>
    </Wrapper>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
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

export default function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldTodo) => [
      { text: toDo, id: Date.now(), category },
      ...oldTodo,
    ]);
    setValue("toDo", "");
  };
  return (
    <Wrapper onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      ></Input>
      <Button>Add</Button>
    </Wrapper>
  );
}

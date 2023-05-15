import React from "react";
import styled from "styled-components";
import ToDoList from "./components/ToDoList";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

function App() {
  const onChange = (event: React.FocusEvent<HTMLElement>) => {};
  return (
    <Wrapper>
      <ToDoList />
    </Wrapper>
  );
}

export default App;

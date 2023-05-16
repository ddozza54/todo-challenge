import React from "react";
import styled from "styled-components";
import ToDoList from "./components/ToDoList";

const Wrapper = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <ToDoList />
    </Wrapper>
  );
}

export default App;

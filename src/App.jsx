import React from "react";

import { Container, ChatSphere } from "./components/Index";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;

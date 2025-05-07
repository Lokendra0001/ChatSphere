import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/authSlice";
import authService from "./appwrite/authService";
import { Container } from "./components/Index";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) dispatch(addUser(user));
        else dispatch(removeUser());
      })
      .catch(() => dispatch(removeUser()));
  }, [dispatch]);

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;

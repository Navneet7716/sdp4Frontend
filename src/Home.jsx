import { Container } from "@mantine/core";
import Form from "./Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Home.css";
import NavBar from "./NavBar";
import FileHome from "./Components/FileHome/FileHome";
import PrivateRoute from "./utils/PrivateRoute";
import Converter from "./Components/Converter/Converter";
import UserFiles from "./Components/UserFiles/UserFiles";

function Home() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Container size="xl" padding="sm" className="Main-Container">
                <Form />
              </Container>
            }
          />

          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Container size="xl" padding="sm" className="Main-Container">
                  <FileHome />
                </Container>
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/convert/:type"
            element={
              <PrivateRoute>
                <Container size="xl" padding="sm" className="Main-Container">
                  <Converter />
                </Container>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/files/:email"
            element={
              <PrivateRoute>
                <Container size="xl" padding="sm" className="Main-Container">
                  <UserFiles />
                </Container>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default Home;

import { Container } from "@mantine/core";
import Form from "./Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Home.css";
import NavBar from "./NavBar";
import FileHome from "./Components/FileHome/FileHome";
import PrivateRoute from "./utils/PrivateRoute";

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
        </Routes>
      </Router>
    </>
  );
}

export default Home;

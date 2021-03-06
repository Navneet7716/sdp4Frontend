import React from "react";
import {
  Burger,
  Button,
  Drawer,
  Paper,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { SunIcon, MoonIcon } from "@modulz/radix-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveUser, selectUser } from "./Components/Redux/UserContext/UserSlice";
import { Link, Navigate } from "react-router-dom";

function NavBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const user = useSelector(selectUser);

  const dark = colorScheme === "dark";
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const dispatch = useDispatch();

  const HandleLogout = () => {
    dispatch(RemoveUser());
    localStorage.removeItem("token");
    <Navigate to="/" />;
  };

  const matches = useMediaQuery("(min-width: 900px)");
  return (
    <>
      {matches ? (
        <Paper padding="md" shadow="xs" withBorder className="Navbar">
          <div className="Navbar-Right">
            <Button
              leftIcon={
                dark ? (
                  <MoonIcon style={{ width: 18, height: 18 }} />
                ) : (
                  <SunIcon style={{ width: 18, height: 18 }} />
                )
              }
              loaderPosition="right"
              onClick={() => toggleColorScheme()}
              color={dark ? "yellow" : "blue"}
            >
              {dark ? "Dark" : "Light"}
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              onClick={HandleLogout}
            >
              {" "}
              Logout
            </Button>
            <Button
                component={Link}
                to={`/home`}
                variant="outline"
                color="blue"
              >
                Home
              </Button>
            <Button 
            component={Link}
            to={`/user/files/${user.email}`}
            variant="outline"> Files</Button>
          </div>

          <div className="Navbar-Left">
            <Title order={2}>ConvertIt</Title>
          </div>
        </Paper>
      ) : (
        <Paper padding="md" shadow="xs" withBorder className="Navbar-mobile">
          <Title order={2}>ConvertIt</Title>

          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
          />

          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Menu"
            padding="md"
            size="sm"
            position="right"
          >
            <div className="Navbar-Menu">
              <Button
                size="sm"
                leftIcon={
                  dark ? (
                    <MoonIcon style={{ width: 18, height: 18 }} />
                  ) : (
                    <SunIcon style={{ width: 18, height: 18 }} />
                  )
                }
                loaderPosition="right"
                onClick={() => toggleColorScheme()}
                color={dark ? "yellow" : "blue"}
              >
                {dark ? "Dark" : "Light"}
              </Button>
              <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              onClick={HandleLogout}
            >
              {" "}
              Logout
            </Button>
              <Button
                component={Link}
                to={`/home`}
                variant="outline"
                color="blue"
              >
                Home
              </Button>
              <Button
                component={Link}
                to={`/user/files/${user.email}`}
              variant="outline"> Files</Button>
            </div>
          </Drawer>
        </Paper>
      )}{" "}
    </>
  );
}

export default NavBar;

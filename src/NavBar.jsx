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

function NavBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === "dark";
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

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
            <Button variant="outline"> Home</Button>
            <Button variant="outline"> Files</Button>
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
              <Button variant="outline"> Home</Button>
              <Button variant="outline"> Files</Button>
            </div>
          </Drawer>
        </Paper>
      )}{" "}
    </>
  );
}

export default NavBar;

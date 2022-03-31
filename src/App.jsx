import {
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import Helmet from "react-helmet";
import Home from "./Home";
import { NotificationsProvider } from '@mantine/notifications';


function App() {
    const [colorScheme, setColorScheme] = useState("light");
    const toggleColorScheme = (value) => {
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    };
    const dark = colorScheme === "dark";

    console.log(dark);

    return (
        <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
          <Helmet>
          <title>Register</title>
          <style>{`body { background-color: ${dark ? "rgb(26, 27, 30)" : "white"}; color :  ${!dark ? "rgb(26, 27, 30)" : "white"};}`}</style>
        </Helmet>
        <NotificationsProvider>
        <Home />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
    );
}

export default App;
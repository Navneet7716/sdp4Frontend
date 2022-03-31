import React, { useState } from "react";
import { useForm, useMediaQuery } from "@mantine/hooks";
import { EnvelopeClosedIcon, LockClosedIcon } from "@modulz/radix-icons";
import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
  Title,
  Center,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { InitializeUser, RemoveUser, selectIsAuth } from "./Components/Redux/UserContext/UserSlice";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Form({ noShadow, noPadding, noSubmit, style }) {
  const [formType, setFormType] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  const isAuth = useSelector(selectIsAuth);
  console.log("🚀 ~ file: Form.jsx ~ line 31 ~ Form ~ isAuth", isAuth)
  const dispatch = useDispatch();

  

  const theme = useMantineTheme();

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
    setError(null);
  };


  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: true,
    },

    // validationRules: {
    //   firstName: (value) => formType === "login" || value.trim().length >= 2,
    //   lastName: (value) => formType === "login" || value.trim().length >= 2,
    //   email: (value) => /^\S+@\S+$/.test(value),
    //   password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
    //   confirmPassword: (val, values) =>
    //     formType === "login" || val === values.password,
    // },

    // errorMessages: {
    //   email: "Invalid email",
    //   password:
    //     "Password should contain 1 number, 1 letter and at least 6 characters",
    //   confirmPassword: "Passwords don't match. Try again",
    // },
  });

  const handleSubmit = async () => {
    if (formType === "register") {
      console.log(form.values);
      setLoading(true);
      setVisible(true);
      setError(null);

      const data = {
        email: form.values.email,
        password: form.values.password,
        username: form.values.username,
      };
      console.log(data);
      setVisible(false);
      let res = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        data
      );
      if (res.data.success === "True") {
        showNotification({
          title: "Success",
          message: "Hey there, you just registered!!",
          color: "green",
        });
      }
      setLoading(false);
      console.log(res);
    } else {
      setLoading(true);
      setVisible(true);
      setError(null);
      const data = {
        email: form.values.email,
        password: form.values.password,
      };

      setVisible(false);
      let res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        data
      );

	//   console.log(JSON.parse(res.data.tokens) )

      if (res.data.success === "True") {
        showNotification({
          title: "Success",
          message: "Hey there, you just Logged in!!",
          color: "green",
        });
		let userData = {token : res.data.access, ...res.data.data}
		dispatch(InitializeUser(userData));


      } else {
        showNotification({
          title: "Failed",
          message: "Login Failed!! Try Again",
          color: "red",
        });
      }
      setLoading(false);
      console.log(res);
	
    }
  };


  const matches = useMediaQuery("(min-width: 900px)");

  
  if(isAuth)
  {
	return <Navigate to="/home" />
  }
  
  


  return (
    <>
      {" "}
      {matches && (
        <Paper padding={"xl"} radius={"xl"}>
          <img src="./register.svg" alt="" />
        </Paper>
      )}
      <Paper
        padding={noPadding ? 10 : "lg"}
        shadow={noShadow ? null : "xl"}
        radius={"xl"}
        withBorder
        style={{
          position: "relative",
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          ...style,
          maxWidth: `${matches ? "50vw" : "80vw"}`,
          flex: "1",
          padding: "2rem",
        }}
      >
        <LoadingOverlay visible={visible} />
        <Center>
			{formType === "register" ? <Title> Register </Title> : <Title>Login</Title>}
          
        </Center>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{ marginTop: "1rem" }}
        >
          <LoadingOverlay visible={loading} />
          {formType === "register" && (
            <TextInput
              data-autofocus
              required
              placeholder="Your username"
              label="Username"
              {...form.getInputProps("username")}
            />
          )}

          <TextInput
            mt="md"
            required
            placeholder="Your email"
            label="Email"
            icon={<EnvelopeClosedIcon />}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Password"
            label="Password"
            icon={<LockClosedIcon />}
            {...form.getInputProps("password")}
          />

          {formType === "register" && (
            <PasswordInput
              mt="md"
              required
              label="Confirm Password"
              placeholder="Confirm password"
              icon={<LockClosedIcon />}
              {...form.getInputProps("confirmPassword")}
            />
          )}

          {formType === "register" && (
            <Checkbox
              mt="xl"
              label="I agree to sell my soul and privacy to this corporation"
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />
          )}

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          {!noSubmit && (
            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="gray"
                onClick={toggleFormType}
                size="sm"
              >
                {formType === "register"
                  ? "Have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>

              <Button color="blue" type="submit">
                {formType === "register" ? "Register" : "Login"}
              </Button>
            </Group>
          )}
        </form>
      </Paper>{" "}
    </>
  );
}

export default Form;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { css } from "@linaria/core";

import { TextField, Button } from "@material-ui/core";

import constants from "../constants";

const formStyle = css`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const textFieldStyle = css`
  background: #fdfcfc;
  box-shadow: 5px 5px 80px rgba(212, 173, 134, 0.4926);
  border-radius: 10px;
  margin-bottom: 16px !important;
`;

const buttonStyle = css`
  width: 100%;
  margin-bottom: 16px !important;
`;

interface LoginProps {
  isSignup: boolean;
}

const Login: React.FC<LoginProps> = ({ isSignup }) => {
  const history = useHistory();
  const [user, setUser] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  const handleLogin = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    const dataToSend = {
      userName: user,
      password,
    };
    fetch(`${constants.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      userName: user,
      password,
      email,
    };
    fetch(`${constants.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then(() => {
        handleLogin();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form
      className={formStyle}
      onSubmit={isSignup ? handleSignup : handleLogin}
    >
      <TextField
        className={textFieldStyle}
        variant="outlined"
        value={user}
        onChange={({ target: { value } }) => setUser(value)}
        placeholder="username"
      />
      <TextField
        className={textFieldStyle}
        type="password"
        variant="outlined"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="password"
      />
      {isSignup && (
        <TextField
          className={textFieldStyle}
          type="email"
          variant="outlined"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          placeholder="email"
        />
      )}
      <Button
        classes={{ root: buttonStyle }}
        variant="contained"
        color="primary"
        type="submit"
      >
        {isSignup ? "Signup" : "Login"}
      </Button>
      {!isSignup && (
        <Button
          classes={{ root: buttonStyle }}
          variant="contained"
          color="secondary"
          onClick={() => history.push("/signup")}
        >
          Signup
        </Button>
      )}
    </form>
  );
};

export default Login;

import React, { useEffect } from "react";
import classnames from "classnames";
import { css } from "@linaria/core";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";

import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";

import constants from "./constants";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Add from "./screens/Add";
import Details from "./screens/Details";

const app = css`
  background: #fff9f9;
  width: 100vw;
  height: 100vh;
`;

const navStyle = css`
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  background: white;
`;

const buttonStyle = css`
  display: flex;
  flex-direction: column;
  color: #bfbebf;
  &:hover {
    color: #000;
  }
`;

const selectedButtonStyle = css`
  color: #000;
`;

function Router() {
  const history = useHistory();
  const location = useLocation();

  const isOnLoginOrSignUp =
    /login/.test(location.pathname) || /signup/.test(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isOnLoginOrSignUp) {
      fetch(`${constants.baseUrl}/users`, {
        headers: token ? { "x-access-token": token } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.logged) {
            history.push("/login");
          }
        })
        .catch((e) => {
          if (!isOnLoginOrSignUp && history) {
            history.push("/login");
          }
        });
    } else if (token) {
      fetch(`${constants.baseUrl}/users`, {
        headers: { "x-access-token": token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.logged) {
            history.push("/");
          }
        })
        .catch((e) => {
          if (!isOnLoginOrSignUp && history) {
            history.push("/login");
          }
        });
    }
  }, [history, isOnLoginOrSignUp]);

  return (
    <main className={app}>
      <Switch>
        <Route path="/login">
          <Login isSignup={false} />
        </Route>
        <Route path="/signup">
          <Login isSignup />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/details/google/:id">
          <Details isAppBook={false} />
        </Route>
        <Route path="/details/:id">
          <Details isAppBook={true}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {!isOnLoginOrSignUp && (
        <nav className={navStyle}>
          <Button
            classes={{
              label: classnames(buttonStyle, {
                [`${selectedButtonStyle}`]: location.pathname === "/",
              }),
            }}
            onClick={() => history.push("/")}
          >
            <HomeIcon />
            Home
          </Button>
          <Button
            classes={{
              label: classnames(buttonStyle, {
                [`${selectedButtonStyle}`]: location.pathname === "/add",
              }),
            }}
            onClick={() => history.push("/add")}
          >
            <AddIcon />
            Add Book
          </Button>
          <Button
            classes={{
              label: classnames(buttonStyle, {
                [`${selectedButtonStyle}`]: location.pathname === "/profile",
              }),
            }}
            onClick={() => history.push("/profile")}
          >
            <PersonIcon />
            Profile
          </Button>
        </nav>
      )}
    </main>
  );
}

export default Router;

import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Login = ({setIsAuth}) => {
  const cookies = new Cookies();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const logIn = async () => {
    await axios
      .post("http://localhost:4000/login", { username, password })
      .then((res) => {
        const { token, userId, firstName, lastName, username } =
          res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        setIsAuth(true);
      });
  };
  return (
    <div className="login">
      <label htmlFor="">Login</label>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={logIn}>Login</button>
    </div>
  );
};

export default Login;

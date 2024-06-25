import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Signup = ({setIsAuth}) => {
  const cookies = new Cookies();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const signUp = async () => {
    await axios
      .post("http://localhost:4000/signup", user)
      .then((res) => {
        const { token, userId, firstName, lastName, username, hashPassword } =
          res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("hashPassword", hashPassword);
        setIsAuth(true);
      });
  };
  return (
    <div className="signUp">
      <label htmlFor="signup">Sign Up</label>
      <input
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => {
          setUser({ ...user, firstName: e.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => {
          setUser({ ...user, lastName: e.target.value });
        }}
      />
      <input
        placeholder="Username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <input
        placeholder="Password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default Signup;

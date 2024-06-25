import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { StreamChat } from "stream-chat";
import {Chat} from "stream-chat-react"
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";
import "./App.css"

function App() {
  const api_key = "qtkzuesypjfq";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashPassword: cookies.get("hashPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("useerId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("hashPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}>LogOut</button>
        </Chat>
      ) : (
        <>
          <Signup setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;

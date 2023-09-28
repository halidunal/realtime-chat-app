import "./App.css";
import Room from "./components/Room";
import Chat from "./components/Chat";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [inChat, setInChat] = useState(false);
  return (
    <div className="App">
      {!inChat ? (
        <Room
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          setInChat={setInChat}
          socket={socket}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

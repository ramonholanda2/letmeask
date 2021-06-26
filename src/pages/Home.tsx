import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import { useDarkModeContext } from '../contexts/DarkModeContext';
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuthContext();
  const { darkMode } = useDarkModeContext();
  const [roomCode, setRoomCode] = useState("");


  async function handleNewRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room not exists.");
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={darkMode && 'darkMode'}>
      <aside>
        <img
          src={illustrationImg}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong onClick={() => console.log(user)}>
          Crie salas de Q&amp;A ao-vivo
        </strong>
        <p>tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />
          <button onClick={handleNewRoom} className="create-room">
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entre na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;

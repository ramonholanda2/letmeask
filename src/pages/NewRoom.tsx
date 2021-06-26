import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import Button from '../components/Button';

import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import { useDarkModeContext } from '../contexts/DarkModeContext';

import '../styles/auth.scss';
import { database } from '../services/firebase';

const NewRoom = () => {
    const { user } = useAuthContext();
    const { darkMode } = useDarkModeContext();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
      event.preventDefault();
      
      if(newRoom.trim() === '') {
        return;
      }

      const roomRef = database.ref("rooms");

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id
      });

      history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth" className={darkMode && 'darkMode'} >
          <aside>
            <img
              src={illustrationImg}
              alt="ilustração simbolizando perguntas e respostas"
            />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>tire as dúvidas da sua audiência em tempo real</p>
          </aside>
          <main>
            <div className="main-content">
              <img src={logoImg} alt="logo" />
              <h2>Criar uma nova sala</h2>
              <div className="separator">ou entre em uma sala</div>
              <form onSubmit={handleCreateRoom}>
                <input type="text" placeholder="nome da sala" onChange={event => setNewRoom(event.target.value)} value={newRoom} />
                <Button type="submit">Criar sala</Button>
              </form>
              <p>Quer entrar em uma sala existente?  <Link to="/">Clique aqui</Link> </p>
            </div>
          </main>
        </div>
      );
}

export default NewRoom

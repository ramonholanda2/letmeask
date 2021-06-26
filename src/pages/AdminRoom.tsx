import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Question from "../components/Question";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { useDarkModeContext } from '../contexts/DarkModeContext';
import { CgDetailsMore } from 'react-icons/cg';
import Menu from "../components/Menu";

import logoImg from "../assets/images/logo.svg";

import RoomCode from "../components/RoomCode";

import { useRomm } from "../hooks/useRoom";
import { database } from "../services/firebase";
import ActivateDarkMode from "../components/ActivateDarkMode/index";
import "../styles/room.scss";
import { useState } from "react";

interface RoomParams {
  id: string;
}

const AdminRoom = () => {
  const { darkMode, renderMenu, toggleRenderMenu } = useDarkModeContext();
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const { title, questions } = useRomm(roomID);
  const [screenWidth, setScreenWidth] = useState<Number>(window.innerWidth);
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("tem certeza que deseja apagar essa pergunta")) {
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightedQuestion(questionId: string) {
    await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }


 function sizeOfWidth() {
    const width = window.innerWidth;
    setScreenWidth(width);
  }

  window.addEventListener("resize", sizeOfWidth);

  

  return (
    <div id="page-room" className={darkMode && 'darkMode'}>
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomID} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
            <ActivateDarkMode />
          </div>
          {screenWidth <= 820 && (
            <button onClick={() => toggleRenderMenu()}>
              <CgDetailsMore
                size="2.3rem"
                color={
                  darkMode === "darkMode" 
                  ? "white" 
                  : "black"
                }
              />
            </button>
          )}
        </div>
        {renderMenu && <Menu />}
      </header>
      <main>
        <div className="content">
          <div className="room-title">
            <h1>Sala {title}</h1>
            <span>
              {questions?.length > 0 && (
                <span>{questions?.length} pergunta(s)</span>
              )}
            </span>
          </div>
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightedQuestion(question.id)}
                  >
                    <img src={answerImg} alt="dar destaque a pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="deletar" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;

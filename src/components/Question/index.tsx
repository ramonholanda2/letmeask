import { ReactNode } from "react";
import { useDarkModeContext } from '../../contexts/DarkModeContext';
import "./styles.scss";

interface QuestionProps {
  content: String;
  author: {
    name: string;
    avatar: string;
  };

  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

const Question = ({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) => {
  const { darkMode } = useDarkModeContext();

  return (
    <div
      className={`question ${isAnswered && "answered"} ${
        (isHighlighted && !isAnswered) && "highlighted"
      } ${darkMode && 'darkMode'}`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default Question;

import "./styles.scss";
import { useDarkModeContext as UseDarkModeContext } from "../../contexts/DarkModeContext";

const index = () => {
  const { darkMode, toggleDarkMode } = UseDarkModeContext();

  return (
    <div className={`dark ${darkMode && 'active'}`}>
      <button onClick={toggleDarkMode}>
        <div className="circle"></div>
      </button>
    </div>
  );
};

export default index;

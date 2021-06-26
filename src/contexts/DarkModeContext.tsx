import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type DarkModeContextType = {
  darkMode: string;
  renderMenu: boolean;
  toggleRenderMenu: () => void;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext({} as DarkModeContextType);

type DarkModeContextProps = {
  children: ReactNode;
};

export function DarkModeProvider({ children }: DarkModeContextProps) {
  const [renderMenu, setRenderMenu] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<string>("");

  function toggleDarkMode() {
    const dark = darkMode === "" ? "darkMode" : "";
    setDarkMode(dark);
    localStorage.setItem("darkMode", dark);
  }

  function toggleRenderMenu() {
    setRenderMenu(!renderMenu);
  }

  useEffect(() => {
    const getDarkModeActive = String(localStorage.getItem("darkMode"));
    setDarkMode(getDarkModeActive);
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        renderMenu,
        toggleDarkMode,
        toggleRenderMenu
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
};

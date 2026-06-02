import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./Components/LoadingScreen";
import MainMenu from "./Components/MainMenu";
import About from "./Components/Sections/About";
import Skills from "./Components/Sections/Skills";
import Projects from "./Components/Sections/Projects";

type GameState = "loading" | "menu" | "about" | "skills" | "projects" | "services" | "contact";

const App = () => {
  const [gameState, setGameState] = useState<GameState>("loading");

  const handleStart = () => setGameState("menu");
  const handleMenuSelect = (section: string) => setGameState(section as GameState);
  const handleBack = () => setGameState("menu");

  return (
    <AnimatePresence mode="wait">
      {gameState === "loading" && (
        <LoadingScreen key="loading" onStart={handleStart} />
      )}
      {gameState === "menu" && (
        <MainMenu key="menu" onSelect={handleMenuSelect} />
      )}
      {gameState === "about" && (
        <About key="about" onBack={handleBack} />
      )}
      {gameState === "skills" && (
        <Skills key="skills" onBack={handleBack} />
      )}
      {gameState === "projects" && (
        <Projects key="projects" onBack={handleBack}/>
      )}
    </AnimatePresence>
  );
};

export default App;
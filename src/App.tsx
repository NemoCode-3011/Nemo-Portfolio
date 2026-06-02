import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./Components/LoadingScreen";
import MainMenu from "./Components/MainMenu";
import About from "./Components/Sections/About";
import Skills from "./Components/Sections/Skills";
import Projects from "./Components/Sections/Projects";
import Services from "./Components/Sections/Services";
import Contact from "./Components/Sections/Contact";
import { lazy, Suspense } from "react";

type GameState = "loading" | "menu" | "about" | "skills" | "projects" | "services" | "contact";

const App = () => {
  const [gameState, setGameState] = useState<GameState>("loading");

  const handleStart = () => setGameState("menu");
  const handleMenuSelect = (section: string) => {
    if (section === "restart") {
      setGameState("loading");
      return;
    }
    setGameState(section as GameState);
  };
  const handleBack = () => setGameState("menu");
  const handleContact = () => setGameState("contact")

  const About = lazy(() => import("./Components/Sections/About"));
  const Skills = lazy(() => import("./Components/Sections/Skills"));
  const Projects = lazy(() => import("./Components/Sections/Projects"));
  const Services = lazy(() => import("./Components/Sections/Services"));
  const Contact = lazy(() => import("./Components/Sections/Contact"));

  return (
    <Suspense fallback={null}>

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
        <Projects key="projects" onBack={handleBack} />
      )}
      {gameState === "services" && (
        <Services key="services" onBack={handleBack} onContact={handleContact} />
      )}
      {gameState === "contact" && (
        <Contact key="contact" onBack={handleBack} />
      )}
    </AnimatePresence>
    </Suspense>


  );
};

export default App;
import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Window from "./Components/Window/window";
import Panel from "./Components/Panel/Panel";

function App() {
  const [windows, setWindows] = useState([]);

  const handleCreateWindow = () => {
    setWindows([...windows, { windowId: nanoid(5), isShown: true }]);
  };

  const handleCloseWindow = (id) => {
    const newWindowsArray = windows.filter((window) => window !== id);
    setWindows(newWindowsArray);
  };

  const handleShowWindow = (fn) => {
    fn(false);
  };

  return (
    <>
      <div>
        <button onClick={() => handleCreateWindow()}>Create window</button>
        {windows.map((window) => (
          <Window
            key={window.windowId}
            id={window.windowId}
            handleCloseWindow={() => handleCloseWindow(window)}
            handleShowWindow={handleShowWindow}
          />
        ))}
        <Panel />
      </div>
    </>
  );
}

export default App;

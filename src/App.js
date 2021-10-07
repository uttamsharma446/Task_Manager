import GlobalContainer from "./context/global.context";
import TaskManager from "./Pages/TaskManager";

function App() {
  return (
    <GlobalContainer>
      <TaskManager />
    </GlobalContainer>
  );
}

export default App;

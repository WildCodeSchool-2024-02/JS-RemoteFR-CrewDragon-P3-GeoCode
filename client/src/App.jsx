import { Outlet } from "react-router-dom";

import "./styles/index.scss";

function App() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default App;

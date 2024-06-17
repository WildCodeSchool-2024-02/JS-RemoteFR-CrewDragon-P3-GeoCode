import { Outlet } from "react-router-dom";

import Menu from "./components/Menu";

import "./styles/index.scss";

function App() {
  return (
    <main className="container">
      <Menu />
      <Outlet />
    </main>
  );
}

export default App;

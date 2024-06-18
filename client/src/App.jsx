import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";

import hero from "./assets/images/hero-relative.png";

function App() {
  return (
    <main className="container">
      <div className="menu">
        <Menu />
      </div>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      />
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}

export default App;

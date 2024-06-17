import { Outlet } from "react-router-dom";
import "./styles/index.scss";
import hero from "./assets/images/hero-relative.png";

function App() {
  return (
    <main className="container">
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

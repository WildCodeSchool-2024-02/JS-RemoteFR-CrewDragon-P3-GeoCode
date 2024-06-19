import { Outlet, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import heroData from "./services/heroData";

function App() {
  const location = useLocation();
  const page = location.pathname.replaceAll("/", "");
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  function isCurrentPage(Data, path) {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].img.includes(path)) {
        return Data[i].img;
      }
    }
    return false;
  }

  return (
    <main className="container">
      <div className="menu">
        <Menu />
      </div>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${isCurrentPage(heroData, page)})`,
        }}
      />
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}

export default App;

import { Outlet, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import heroData from "./services/heroData";

function App() {
  const location = useLocation();

  const page = location.pathname.replaceAll("/", "");
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  function isCurrentPage(Data, path) {
    for (let i = 0; i < Data.length; i++) {
      if (
        Data[i].img.includes(path) ||
        Data[i].img.startsWith(path.slice(0, 4))
      ) {
        return Data[i].img;
      }
    }
    return Data[0].img;
  }

  function isFullPage(path) {
    if (path === "carte" || path === "") {
      return true;
    }
    return false;
  }

  function isMenu(path) {
    if (path === "") {
      return true;
    }
    return false;
  }

  return (
    <main className="container">
      <div className="menu" hidden={isMenu(page)}>
        <Menu />
      </div>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${isCurrentPage(heroData, page)})`,
        }}
      />
      <div
        className="content"
        style={
          isFullPage(page)
            ? {
                width: "100%",
                height: "100vh",
                marginTop: "0",
                borderRadius: "0",
                padding: "0",
              }
            : { marginBottom: "4rem" }
        }
      >
        <Outlet />
      </div>
    </main>
  );
}

export default App;

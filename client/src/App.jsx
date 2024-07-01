import { Outlet, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import heroData from "./services/heroData";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const { auth } = useAuth();
  console.info(auth);
  const page = location.pathname.replaceAll("/", "");
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  function isCurrentPage(Data, path) {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].img.includes(path)) {
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
            : {}
        }
      >
        <Outlet />
      </div>
    </main>
  );
}

export default App;

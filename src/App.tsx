// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { permissionRoute } from "./routes/route-guard/RouteGuard";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((item, index) => {
            const Page = item.element;
            return <Route key={index} path={item.path} element={<Page />} />;
          })}
          {permissionRoute()
            ? privateRoutes.map((item, index) => {
                const Page = item.element;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })
            : ""}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

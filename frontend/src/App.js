import { Routes as Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";

import HomePage from "./allPages/HomePage";
import Login from "./allPages/Login";
import Register from "./allPages/Register";


const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <MainPage>
          <Switch>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Switch>
        </MainPage>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;

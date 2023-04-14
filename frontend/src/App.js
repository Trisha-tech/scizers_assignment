import { Routes as Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";

import HomePage from "./allPages/HomePage";
import Login from "./allPages/Login";
import Register from "./allPages/Register";
import CreateNewContact from "./allPages/CreateNewContact";
import AllContacts from "./allPages/AllContacts";


const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <MainPage>
          <Switch>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateNewContact />} />
            <Route path="/mycontacts" element={<AllContacts />} />
          </Switch>
        </MainPage>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;

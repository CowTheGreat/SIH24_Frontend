// App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Importing Pages
import ChatBot from "./routes/chatbot.jsx";
import Home from "./routes/home.jsx";
import Login from "./routes/login.jsx";
import Multifactor from "./routes/MultiFactor.jsx";
import MultiFactorG from "./routes/MultiFactorG.jsx";
import AuthEmail from "./components/loginComponents/authemail.jsx";
import Steps_google from "./components/loginComponents/Steps_for_google_auth.jsx";
import Profile from "./components/common/Profile.jsx";
import PrivateRoute from "./routes/PrivateRoute";

import LoginProvider from "./Contexts/LoginContext.jsx";

const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },

  // Protected Routes
  {
    path: "/multifactor",
    element: (
      <PrivateRoute>
        <Multifactor />
      </PrivateRoute>
    ),
  },
  {
    path: "/multifactor/google",
    element: (
      <PrivateRoute>
        <MultiFactorG />
      </PrivateRoute>
    ),
  },
  {
    path: "/chatBot",
    element: (
      <PrivateRoute>
        <ChatBot />
      </PrivateRoute>
    ),
  },
  {
    path: "multifactor/authemail",
    element: (
      <PrivateRoute>
        <AuthEmail />
      </PrivateRoute>
    ),
  },
  {
    path: "multifactor/steps_google",
    element: (
      <PrivateRoute>
        <Steps_google />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />;
    </LoginProvider>
  );
}

export default App;

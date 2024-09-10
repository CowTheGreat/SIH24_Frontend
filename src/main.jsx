import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

// Importing Pages
import ChatBot from "./routes/chatbot.jsx";
import Home from "./routes/home.jsx";
import Login from "./routes/login.jsx";
import Multifactor from "./routes/MultiFactor.jsx";
import MultiFactorG from "./routes/MultiFactorG.jsx"; // Import MultiFactorG component
import RootLayout from "./routes/RouteLayout.jsx";
import AuthEmail from "./components/loginComponents/authemail.jsx";
import Steps_google from "./components/loginComponents/Steps_for_google_auth.jsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   children: [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/multifactor", element: <Multifactor /> },
  { path: "/multifactor/google", element: <MultiFactorG /> }, // Add route for MultiFactorG
  //   ],
  // },
  { path: "/chatBot", element: <ChatBot /> },
  { path: "multifactor/authemail", element: <AuthEmail /> },
  { path: "multifactor/steps_google", element: <Steps_google /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

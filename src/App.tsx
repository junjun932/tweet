import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import {
  useEffect,
  useState
} from "react";

import CreateAccount from "./routes/create-account";
import Home from "./routes/home";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Login from "./routes/login";
import Profile from "./routes/profile";
import { auth } from "./firebase";
import reset from "styled-reset";

const Wrapper = styled.div`
  height:100vh;
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;


function App() {
  const [isLoading, setIsLoading] =useState(true);
  const init = async ()=> {
    await auth.authStateReady();
    setIsLoading(false);
    };
  useEffect (()=> {
    init();
  }, []);
  return (
  
  <>
  <Wrapper>
  <GlobalStyles />
  {isLoading ? <LoadingScreen /> :
  <RouterProvider router ={router} /> }
  </Wrapper>
  </>
  );
}

export default App;

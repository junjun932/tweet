import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Profile from "./routes/profile";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
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
  const init = async()=> {
    await auth.authStateReady();
    setIsLoading(false);
    
  };
  useEffect (()=> {
    init();
  }, []);
  return (
  <>
  <GlobalStyles />
  {isLoading ? <LoadingScreen /> :
  <RouterProvider router ={router} /> }
  </>
  );
}

export default App;

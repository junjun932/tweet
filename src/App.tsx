import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import Profile from "./routes/profile";

const router = createBrowserRouter ([
  {
    path:"/" ,
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
]);

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

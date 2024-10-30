import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import Profile from "./routes/profile";

const router = createBrowserRouter ([
  {
    path:"/" ,
    element: <Layout /> ,
    children : [
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
  return (<>
  <RouterProvider router ={router} />
  </>
  );
}

export default App;

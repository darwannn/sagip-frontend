import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routers/routers";

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, } from 'react-toastify';

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer
        theme="colored"
        draggable={false}
      />
    </>
  )
}

export default App;

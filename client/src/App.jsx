import React from "react"
import Navbar from "./components/navbar/Navbar"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/MyGigs/MyGigs";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Footer from "./components/footer/Footer";
import Add from "./pages/add/Add";
import './app.scss'
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import Game from "./Game";
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from '@tanstack/react-query'


function App() {
  const queryClient = new QueryClient()
  const Layout = ()=>{
    return(
      <>
      {/* <Game/> */}
      <QueryClientProvider client={queryClient}>
      <ScrollToTop/>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </QueryClientProvider>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/> ,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/gigs",
          element:<Gigs/>
        },
        {
          path:"/gig/:id",
          element:<Gig/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/mygigs",
          element:<MyGigs/>
        },
        {
          path:"/add",
          element:<Add/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },{
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        // {
        //   path: "/pay/:id",
        //   element: <Pay />,
        // },
        // {
        //   path: "/success",
        //   element: <Success />,
        // },
      ]
    },
  ]);
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default App

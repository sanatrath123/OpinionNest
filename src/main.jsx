import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  store  from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Authprotection} from './components/index.js'

//import all pages 
import AddPost from './Pages/AddPost'
import AllPost from './Pages/AllPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Home from './Pages/Home.jsx'


//Implementing Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
   
    children: [
      {
        path: "/",
        element: <Authprotection authentication={true}> 
        <Home />
        </Authprotection>
      },
      {
        path: "/Allpost",
        element: <Authprotection authentication={true}>
              <AllPost />
        </Authprotection>
      },
      {
        path: "/Addpost",
        element:<Authprotection authentication={true}>
        <AddPost />
  </Authprotection>
      },

    {
      path: `/Edit-Post/:slug`,
      element: <Authprotection authentication={true}>
        <EditPost />
      </Authprotection>
    },
    {
         path: "/post/:slug",
         element: <Authprotection authentication={true}>
           <Post />
         </Authprotection>
    },
    {
      path: "/Login",
      element: <Authprotection authentication={false}>
            <Login />
      </Authprotection>
    } ,
    {
      path: "/Signup",
      element: <Authprotection authentication={false}>
            <Signup />
      </Authprotection>
    }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Provider store={store}>
<RouterProvider router={router} />
</Provider>

</React.StrictMode>,
)

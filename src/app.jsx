import React from "react";
import Login from "./components/login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ViewPost from "./components/ViewPost";
import Home from "./components/Home";
import CreatePost from "./components/Creteimage";
import Protected from "./components/ProtectedRoute";
import EditProfile from "./components/Editprofile";
import { createBrowserRouter, RouterProvider } from "react-router";
import Search from "./components/Search";
import ExploreUsers from "./components/ExploreUsers";
import "./css/viewPost.css";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/profile",
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/editProfile",
    element: (
      <Protected>
        <EditProfile />
      </Protected>
    ),
  },
  {
    path: "/search",
    element: (
      <Protected>
        <Search />
      </Protected>
    ),
  },
  {
    path: "/createpost",
    element: (
      <Protected>
        <CreatePost />
      </Protected>
    ),
  },
  {
    path: "/exploreUsers",
    element: (
      <Protected>
        <ExploreUsers />
      </Protected>
    ),
  },
  {
    path: "/view-post/:postId",
    element: (
      <Protected>
        <ViewPost />
      </Protected>
    ),
    loader: async ({ params }) => {
      const { postId } = params;
      try {
        const res = await fetch(
          `https://instagram-backend-jyvf.onrender.com/user/post/${postId}`
        );
        if (res.ok) {
          const post = await res.json();
          return post;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

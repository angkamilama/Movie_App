import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login";
import About from "./components/About";
import RootLayout from "./components/RootLayout";
import Contact from "./components/Contact";
import MovieList from "./components/MovieList";
import Register from "./components/Register";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="movieList" element={<MovieList />} />
      <Route path="movieList/:userId" element={<MovieDetail />} />
      <Route path="Register" element={<Register />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

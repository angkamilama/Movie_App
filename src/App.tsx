import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import RootLayout from "./components/RootLayout";
import Contact from "./components/Contact";
import MovieList from "./components/Movies";
import MovieDetail from "./components/MovieDetail";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="About" element={<About />} />
      <Route path="Register" element={<Register />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Movies" element={<MovieList />} />
      <Route path="shoppingCart" element={<ShoppingCart />} />
      <Route path="movies/:movieId" element={<MovieDetail />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

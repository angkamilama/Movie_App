import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy } from "react";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Contact = lazy(() => import("./components/Contact"));
const ShoppingCart = lazy(() => import("./components/ShoppingCart"));
const Movies = lazy(() => import("./components/Movies"));
const MovieDetail = lazy(() => import("./components/MovieDetail"));
const RootLayout = lazy(() => import("./components/RootLayout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="About" element={<About />} />
      <Route path="Register" element={<Register />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Movies" element={<Movies />} />
      <Route path="shoppingCart" element={<ShoppingCart />} />
      <Route path="movies/:movieId" element={<MovieDetail />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

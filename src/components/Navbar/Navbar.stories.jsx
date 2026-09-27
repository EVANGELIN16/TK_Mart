import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

export const Default = () => (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
);

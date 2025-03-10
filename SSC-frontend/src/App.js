import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Footer from "./components/footer";
import Home from "./components/Home.js"
import Navbar from "./components/Navbar.js";
import Team from './components/Team.js'
import About from "./components/About.js"
import SPC from "./components/Spc.js"
import KU from "./components/Ku.js"
import HHC from "./components/HHC.js"
import Sahyog from "./components/Sahyog.js"
import Updates from "./components/Updates.js";
import UpdatesAdmin from "./components/admin/UpdatesAdmin";
import ListAdmin from "./components/admin/ListAdmin";
import AddAdmin from "./components/admin/AddAdmin";
import LoginAdmin from "./components/admin/LoginAdmin.js";
import AdminDash from "./components/admin/AdminDash.js";
import DonateUs from "./components/DonateUs.js";
import AddPostHolders from "./components/admin/PostHostldersAdmin";
import AddSliderImages from "./components/admin/SliderImagesAdmin";
import AddEvents from "./components/admin/EventsAdmin";
import RegistrationForm from './components/RegistrationForm';
// import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Provider } from "react-redux"
import store from "./store"
import { useContext, useEffect } from "react";
import { Context } from "./index"
import axios from "axios";
import { Toaster } from "react-hot-toast";



export default function App() {
  const { setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getsingleadmin", // Replace with the correct endpoint
          {
            withCredentials: true,
          }
        );
        console.log("Fetched user:", response.data.user); // Debugging
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/spc" element={<SPC />} />
            <Route exact path="/ku" element={<KU />} />
            <Route exact path="/sahyog" element={<Sahyog />} />
            <Route exact path="/hhc" element={<HHC />} />
            <Route exact path="/updates" element={<Updates />} />
            <Route exact path="/donate" element={<DonateUs />} />
            <Route exact path="/admin/updates" element={<UpdatesAdmin />} />
            <Route exact path="/admin/list" element={<ListAdmin />} />
            <Route exact path="/admin/add" element={<AddAdmin />} />
            <Route exact path="/admin/login" element={<LoginAdmin />} />
            <Route exact path="/admin/dashboard" element={<AdminDash />} />
            <Route exact path="/admin/addPH" element={<AddPostHolders />} />
            <Route exact path="/admin/addSI" element={<AddSliderImages />} />
            <Route exact path="/admin/addevents" element={<AddEvents />} />
            <Route path="/register/:club/:event" element={<RegistrationForm />} />
          </Routes>
          <Footer />
          <Toaster />
        </Router>
      </Provider>
    </>
  );
}





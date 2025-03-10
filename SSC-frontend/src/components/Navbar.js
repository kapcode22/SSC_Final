import React, { useContext, useState, useEffect } from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom"; 
import SSC from "../images/ssclogo-removebg-preview.png";
import "./Home.css";
import { Context } from "../index";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { isAuthorized, setIsAuthorized,  setUser } = useContext(Context);
  const navigate = useNavigate();

  // ✅ Ensure user data persists and is correctly initialized
  const userType = localStorage.getItem("type");

  // ✅ Scroll Effect for Navbar
  useEffect(() => {
    function scrollHandler() {
      updateNavbar(window.scrollY >= 20);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  
  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const response = await axios.get("https://ssc-final-backend.onrender.com/api/admin/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message);

      // ✅ Clear stored data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("type");

      setIsAuthorized(false);
      setUser(null);

      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(false);
      setUser(null);
    }
  };

  return (
    <NavBar expanded={expand} fixed="top" expand="md" className={navColour ? "sticky navbar" : "navbar"}>
      <Container style={{ paddingTop: "10px" }}>
        <NavBar.Brand as={Link} to="/" className="d-flex">
          <img src={SSC} className="img-fluid logo" alt="brand" />
        </NavBar.Brand>
        <NavBar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(!expand)}
        >
          <span></span>
          <span></span>
          <span></span>
        </NavBar.Toggle>
        <NavBar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item><Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/about" onClick={() => updateExpanded(false)}>About Us</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/team" onClick={() => updateExpanded(false)}>Team</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/updates" onClick={() => updateExpanded(false)}>Updates</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/donate" onClick={() => updateExpanded(false)}>Donate Us</Nav.Link></Nav.Item>

            {/* Club Dropdown */}
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} id="dropdown-club">Club</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/spc" onClick={() => updateExpanded(false)}>SPC</Dropdown.Item>
                <Dropdown.Item as={Link} to="/ku" onClick={() => updateExpanded(false)}>KU</Dropdown.Item>
                <Dropdown.Item as={Link} to="/hhc" onClick={() => updateExpanded(false)}>HHC</Dropdown.Item>
                <Dropdown.Item as={Link} to="/sahyog" onClick={() => updateExpanded(false)}>Sahyog</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            
            {isAuthorized && (userType === "ADMIN" || userType === "SUBADMIN") && (
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-admin">Admin Access</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/admin/add" onClick={() => updateExpanded(false)}>Add Admin</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/updates" onClick={() => updateExpanded(false)}>Add Updates</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/addPH" onClick={() => updateExpanded(false)}>Add PostHolders</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/list" onClick={() => updateExpanded(false)}>List Admin</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/addSI" onClick={() => updateExpanded(false)}>Add SliderImages</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/addevents" onClick={() => updateExpanded(false)}>Add Events</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/dashboard" onClick={() => updateExpanded(false)}>Admin Dashboard</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
           
             {/* ✅ Login/Logout Button */}
            {isAuthorized ? (
              <Nav.Item>
                <button className="navbar-button" onClick={handleLogout}>Logout</button> 
              </Nav.Item>
            ) : (
              <Nav.Item>
                <button className="navbar-button" onClick={() => { updateExpanded(false); navigate('/admin/login'); }}>Login</button>
              </Nav.Item>
            )}
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default Navbar;

import React from "react";
import bg from "../images/main.png";
import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import { AiFillInstagram, AiFillLinkedin, AiFillMail,  } from "react-icons/ai";

import "./Home.css";
const styles = {
  
  color: 'purple'
};
const Home = () => {
  return (
    <>
      <Container fluid className="home-section" id="home" >
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 className="heading">
              Elevating Communities,<div style={styles}>Empowering </div>Change :Student-Driven Social Service by IIT BHU
              </h1>
              <div style={{ textAlign: "left", height: "80px" }}>
                {" "}<Type />{" "}
              </div>

              <div className="home-btn">
                <a href="/About" className="home-getStartBtn" style={{ color: "#fff" }} >
                  Get Start
                </a>
              </div>

             

              <ul className="homePage-icons">
                <li className="social-icons">
                  <a
                    href="https://www.linkedin.com/company/ssc-iitbhu/"
                    style={{ color: "black" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillLinkedin />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="mailto:gensec.ssc@itbhu.ac.in"
                    style={{ color: "black" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillMail />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://instagram.com/ssc.iitbhu?igshid=NzZlODBkYWE4Ng=="
                    style={{ color: "black" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillInstagram />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;

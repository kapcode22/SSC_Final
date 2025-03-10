import React, { useState, useEffect } from "react";
import axios from "axios";
import HHC from '../images/HHC_logo.jpg';
import hstyles from './hhc.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTeam, fetchEvents } from '../reducers/hhcReducer';
import Type from "./Type";
import { AiFillInstagram, AiFillLinkedin, AiFillMail } from "react-icons/ai";

const Hhc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { team, events, loading, error } = useSelector((state) => state.hhcReducer);

  const [carouselImages, setCarouselImages] = useState([]);
  useEffect(() => {
    dispatch(fetchTeam());
    dispatch(fetchEvents());
    fetchCarouselImages();
  }, [dispatch]);

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sliderImages/hhc');
      setCarouselImages(response.data); // Assuming response.data is an array of image URLs
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };

  const handleJoinClick = () => {
    window.location.href = 'https://chat.whatsapp.com/DVChQ1r0P70AbOzvFrGWDg';
  };

  const handleRegisterClick = (club, event) => {
    navigate(`/register/${club}/${event}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={hstyles.bodies}>
      <div className={`${hstyles.carousel_container}`}>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {carouselImages && carouselImages.length > 0 ? (
              carouselImages.map((carouselimage, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img className={hstyles.carousel_img} src={`http://localhost:5000/${carouselimage.imageUrl.replace(/\\/g, '/')}`} alt="" />
                </div>
              ))
            ) : (
              <p>No carousel images found.</p>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className={hstyles.club_header}>
        <h2 className={hstyles.club_name}>Health & Hygiene Club</h2>
        <div className={hstyles.type}>
          <Type text="“Promoting Wellness, Cultivating Hygiene”"/>
        </div>
      </div>

      <div className={`${hstyles.about} ${hstyles.container}`}>
        <img src={HHC} alt="" />
        <div className={hstyles.aboutContent}>
          <h3>About Us</h3>
          <p className={hstyles.dis}>
            Established in 2017, the Health & Hygiene Club of IIT (BHU), Varanasi, is committed to fostering a secure and health-conscious environment within the community. Our initiatives include organizing school meets for underprivileged children, plantation drives, raising awareness on mental health, diseases, healthy habits, sustainability, and hygiene practices.
          </p>
          <button onClick={handleJoinClick} className={`${hstyles.btn} ${hstyles.btnSecondary}`}>
            Join Us
          </button>
        </div>
      </div>

      <div className={hstyles.eventsBack}></div>
      <div className={`${hstyles.events} ${hstyles.container}`}>
        <h2>Events & Activities</h2>
        {events.map((event, index) => (
          <div className={hstyles.event} key={index}>
            <div className={hstyles.eventContent}>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
              <div className="home-btn">
                <button onClick={() => handleRegisterClick('hhc', event.title)} className="home-getStartBtn" style={{ color: '#fff' }}>
                  Register Now
                </button>
              </div>
            </div>
            <img className={hstyles.img_ani} src={`http://localhost:5000/${event.image.replace(/\\/g, '/')}`} alt="" />
            <div className={hstyles.date}></div>
          </div>
        ))}
      </div>

      <div className={hstyles.home_container}>
        <h1 className={hstyles.heading}>Meet Our Team</h1>
        <div className={hstyles.row}>
          {team.map((member, index) => (
            <div className={hstyles.profile_card} key={index}>
              <div className={hstyles.img}>
                <img src={`http://localhost:5000/${member.image.replace(/\\/g, '/')}`} alt="" />
              </div>
              <div className={hstyles.caption}>
                <h3>{member.name}</h3>
                <p>{member.post}</p>
                <div className={hstyles.homePage_icons}>
                  <div className={hstyles.social_icons}>
                    <a href={member.instaLink}>
                      <AiFillInstagram />
                    </a>
                  </div>
                  <div className={hstyles.social_icons}>
                    <a href={member.facebookLink}>
                      <AiFillMail />
                    </a>
                  </div>
                  <div className={hstyles.social_icons}>
                    <a href={member.linkdinLink}>
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hhc;

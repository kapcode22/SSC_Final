import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTeam, fetchEvents } from '../reducers/spcReducer';
import styles from './spc.module.css';
import spc from '../images/spc.jpg';
import { AiFillInstagram, AiFillLinkedin, AiFillMail } from 'react-icons/ai';
import axios from 'axios';
import Type from "./Type";

const Club = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { team, events, loading, error } = useSelector((state) => state.spcReducer);

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    dispatch(fetchTeam());
    dispatch(fetchEvents());
    fetchCarouselImages();
  }, [dispatch]);

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('https://ssc-final-backend.onrender.com/api/sliderImages/spc');
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
    <div className={styles.bodies}>
      <div className={styles.carousel_container}>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {carouselImages && carouselImages.length > 0 ? (
              carouselImages.map((carouselimage, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={`https://ssc-final-backend.onrender.com/${carouselimage.imageUrl.replace(/\\/g, '/')}`} alt="" />
                </div>
              ))
            ) : (
              <p>No carousel images found.</p>
            )}

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className={styles.club_header}>
        <h2 className={styles.club_name}>Social Projects Club</h2>
        <div className={styles.type}>
          <Type  text="“Innovate, Empower, Impact: Shaping Futures Together”"/>
        </div>
      </div>

      <div className={`${styles.about} ${styles.container}`}>
        <img src={spc} alt="" />
        <div className={styles.aboutContent}>
          <h3>About Us</h3>
          <p className={styles.dis}>
            Social Projects’ Club aka SPC, is a team of visionary youth working under the guidance of the Social service council of IIT (BHU), Varanasi on various issues of public interest. We identify problems which affect our society and incorporate our technical skills in addition to proper planning and strategy to come up with innovative solutions. We as a team have taken the challenge of empowering society by employing simple and effective methods.
          </p>
          <button onClick={handleJoinClick} className={`${styles.btn} ${styles.btnSecondary}`}>
            Join Us
          </button>
        </div>
      </div>

      <div className={styles.eventsBack}></div>
      <div className={`${styles.events} ${styles.container}`}>
        <h2>Events & Activities</h2>

        {events.map((event, index) => (
          <div className={styles.event} key={index}>
            <div className={styles.eventContent}>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
              <div className="home-btn">
                <button onClick={() => handleRegisterClick('spc', event.title)} className="home-getStartBtn" style={{ color: '#fff' }}>
                  Register Now
                </button>
              </div>
            </div>
            <img className={styles.img_ani} src={`https://ssc-final-backend.onrender.com/${event.image.replace(/\\/g, '/')}`} alt="" />
            <div className={styles.date}></div>
          </div>
        ))}
      </div>

      <div className={styles.home_container}>
        <h1 className={styles.heading}>Meet Our Team</h1>
        <div className={styles.row}>
          {team.map((member, index) => (
            <div className={styles.profile_card} key={index}>
              <div className={styles.img}>
                <img src={`https://ssc-final-backend.onrender.com/${member.image.replace(/\\/g, '/')}`} alt="" />
              </div>
              <div className={styles.caption}>
                <h3>{member.name}</h3>
                <p>{member.post}</p>
                <div className={styles.homePage_icons}>
                  <div className={styles.social_icons}>
                    <a href={member.instaLink}>
                      <AiFillInstagram />
                    </a>
                  </div>
                  <div className={styles.social_icons}>
                    <a href={member.facebookLink}>
                      <AiFillMail />
                    </a>
                  </div>
                  <div className={styles.social_icons}>
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

export default Club;

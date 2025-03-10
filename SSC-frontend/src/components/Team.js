import React, { useState, useEffect } from "react";
import axios from "axios";
import coun from "../images/counselor.jpg";
import tstyle from "./Teams.module.css";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
} from "react-icons/ai";
const Team = () => {
  const [team, setTeam] = useState([]);
  // const [events, setEvents] = useState([]);
 
   useEffect(() => {
     fetchData();
   }, []);
 
   const fetchData = async () => {
     try {
       const res = await axios.get('http://localhost:5000/api/postholders/council', {
         headers: {
           'authorization': localStorage.getItem('token')
         }
       });
       setTeam(res.data);
       // Assuming you have a separate endpoint or way to get events data
       
     } catch (err) {
       console.error('Error fetching data:', err);
     }
   };

  return (
    <div>
      <div className={tstyle.home_container} style={{ marginBottom: '25rem' }}>
        <div >
          <svg >
            <text className={tstyle.svgtext} x="50%" y="60%" text-anchor="middle"  >
              Our Team
            </text>
          </svg>
        </div>

        <div className={tstyle.blockquote_wrapper}>
          < div className={tstyle.blockquote}>
            <h2>
            Not all of us can do <span style={{ color: 'black' }}>great things,</span> but we can do small things with <span style={{ color: 'black' }}> great love.</span>
            </h2>
            <h4>&mdash;Mother Teresa<br /></h4>
          </div>
        </div>


        <div className={tstyle.row} >
          <div className={tstyle.profile_card}>
            <div className={tstyle.img}>
              <img src={coun} alt="..." />
            </div>
            <div className={tstyle.caption}>
              <h3>Dr. Sukhada </h3>
              <p>Counsellor</p>
              <div class={tstyle.homePage_icons}>

                <div class={tstyle.social_icons}>
                  <a href="sukhada.hss@iitbhu.ac.in">
                    <AiFillMail />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className={tstyle.row} >
          {team.map((member, index) => (
            <div className={tstyle.profile_card} key={index}>
              <div className={tstyle.img}>
                              <img src={`http://localhost:5000/${member.image}`} alt={member.name} />
              </div>
              <div className={tstyle.caption}>
                <h3>{member.name}</h3>
                <p>{member.post}</p>
                <div class={tstyle.homePage_icons}>
                  <div class={tstyle.social_icons}>
                    <a href={member.instaLink}>
                      <AiFillInstagram />
                    </a>
                  </div>
                  <div class={tstyle.social_icons}>
                    <a href={member.facebookLink}>
                      <AiFillMail />
                    </a>
                  </div>
                  <div class={tstyle.social_icons}>
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

export default Team;

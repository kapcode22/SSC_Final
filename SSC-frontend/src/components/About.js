import React from "react";
import styles from "./About.module.css";
import ssc from "../images/ssclogo-removebg-preview.png"
import spc from "../images/spc.jpg"
import ku from "../images/ku_logo.jpg"
import sah from "../images/sahyog_logo.jpg"
import hhc from "../images/HHC_logo.jpg"
import ab4 from "../images/bhu.jpg"

import { AiFillInstagram, AiFillLinkedin, AiFillMail,  } from "react-icons/ai";



function Events() {
    const team = [
        { name: "Kashi Utkarsh", img: ku, path:"/ku", instalink:"https://instagram.com/ku_iitbhu?igshid=OGQ5ZDc2ODk2ZA", maillink:"kashiutkarsh@gmail.com",linkdinlink:"https://www.linkedin.com/company/kashiutkarsh-iitbhu/"},
        { name: "Social Project Club", img: spc,path:"/spc", instalink:"https://www.instagram.com/spc_iitbhu/", maillink:"mailto:spc.iitbhu@gmail.com",linkdinlink:"https://www.linkedin.com/company/spc-iitbhu/"},
        { name: "Health n Hygeine club", img: hhc,path:"/hhc",instalink:"https://www.instagram.com/hhc_iitbhu/", maillink:"mailto:hhc.iitbhu@gmail.com",linkdinlink:"https://www.linkedin.com/company/health-hygiene-club-iit-bhu/" },
        { name: "Sahyog", img: sah, path:"/sahyog",instalink:"https://www.instagram.com/sahyog_iitbhu/", maillink:"/",linkdinlink:"/" },
      ];
    return (
         <div>
           <section className={styles.container}>
            <img src={ab4} alt="..." className={styles.container_img}></img>
            <img src={ssc} alt="..." className={styles.logo}></img>
           
           </section>

           <section className={styles.layout_center}>
            <div className={styles.layout_center_grid}>
                <div className={styles.layout_center_vertical}>
                <h1 className={styles.black_lives_matter }>Social Service Council</h1>
                    <p className={styles.layout_center_text}>
                      Social Service Council IIT(BHU) Varanasi embraces of the clube dedicated to bringing about positive changes in our society's social aspects.
                      We are committed to developing and disseminating professional knowledge, critical analysis and drafting innovative solutions, consequently contributing to overall responsive social welfare.
                      We believe that the inherent humane quaities and the sprit of volunteerism already existent in every individual needs to be nurtured and further developed, thereby blooming out with the full potential to benefit the society as a whole.
                    </p>
                </div>
            </div>
           </section>

         
           <section>
           <h1 className={styles.black_lives_matter} style={{marginTop:'1rem'}}>Our Fest</h1>
          <div className={`${styles.about} ${styles.container2}`}> 
          <img  src="https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-64316cae6bec2_jagritilogo23.png" alt="jagriti-img" />
          <div className={styles.aboutContent}>
         
            <h3 style={{marginTop:'3em'}}> Jagriti</h3>

            <p className={styles.dis}>
            Jagriti is an enlightening and edifying annual social service fest concentrated primarily on raising awareness through an assortment of educative and profound thinking events. 
            We conduct an array of events circulating the theme of social issues. 
            Jagriti is on way to self-contentment wherein we help the underprivileged, borrowing time and drawing attention from our surplus lives.
            </p>
            <div className="home-btn"> <a href="https://jagritissc.com/" className="home-getStartBtn" style={{ color: "#fff" }} >Explore </a></div>
          </div>
          </div>
         
           </section>


           <section>
            <h1 className={styles.black_lives_matter} style={{marginTop:'4rem'}}>Our Clubs</h1>
            <div>
          <div className={styles.card_body}>
            {team.map((member, index) => (
              <div className={styles.card} key={index}>
                <img src={member.img} alt="Image 1" />
                <h6>{member.name}</h6>
                <div className="home-btn"> <a href={member.path} className="home-getStartBtn" style={{ color: "#fff" }} >Explore </a></div>
                <div class={styles.homePage_icons}>
                  <div class={styles.social_icons}>
                    <a href={member.instalink}><AiFillInstagram/></a>
                  </div>
                  <div className={styles.social_icons}>
                  <a href={member.maillink}><AiFillMail/></a>
                  </div>
                  <div className={styles.social_icons}>
                  <a href={member.linkdinlink}><AiFillLinkedin/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
           </section>

        

         </div>
           
            

          

        
    )
}
export default Events;

/* <div >
<div className={styles.container}>
    <img src={bg} alt="..."></img>
</div>
<div className={styles.middle}>
<section className={styles.about}>
    
<div className={styles.container}>
        <div className={styles.img2}>
            <img className={styles.logo} src={SSC} alt="jagriti-img" />
        </div>
        <div className={styles.para}>
            <h1 className="heading pb-3"><strong>About US</strong></h1>
            <p >
                <div className={styles.text}>
                Jagriti is an enlightening and edifying annual social service fest concentrated primarily on raising
                awareness through an assortment of educative and profound thinking events.
                We conduct an array of events circulating the theme of social issues.
                Jagriti is on way to self-contentment wherein we help the underprivileged, borrowing time and drawing attention from our surplus lives.
                </div>
              
            </p>
          
            <div className={styles.contain}><button type="button" className="btn btn-primary btn-lg btn-success opacity-75">Explore Now</button></div>
        </div>
    </div>

    <div className={styles.container}>
        <div className={styles.img}>
            <img className={styles.logo} src="https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-64316cae6bec2_jagritilogo23.png" alt="jagriti-img" />
        </div>
        <div className={styles.para}>
            <h1 className="heading pb-3"><strong>Jagriti</strong></h1>
            <p >
                <div className={styles.text}>
                Jagriti is an enlightening and edifying annual social service fest concentrated primarily on raising
                awareness through an assortment of educative and profound thinking events.
                We conduct an array of events circulating the theme of social issues.
                Jagriti is on way to self-contentment wherein we help the underprivileged, borrowing time and drawing attention from our surplus lives.
                </div>
              
            </p>
            {/* <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className>
                        <div className="card-body">
                            <h5 className="card-title">Lorem ipsum</h5>
                            <p className="card-text">With supporting text below.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className>
                        <div className="card-body">
                            <h5 className="card-title">Lorem ipsum</h5>
                            <p className="card-text">With supporting text below.</p>
                        </div>
                    </div>
                </div>
            </div> */
//             <div className={styles.contain}><button type="button" className="btn btn-primary btn-lg btn-success opacity-75">Explore Now</button></div>
//         </div>
//     </div>

//     <hr className="bold "></hr>

//     <div><h1 className={styles.title}><strong>Our Partners</strong></h1></div>
   
//         <div className="flex flex-col gap-8 py-8 mb-10">
      
//             <Marquee style={{ overflow: "hidden" }} gradient={false} speed="35" className=" mx-auto w-full"> 
//                 {/* {array.map((item, index) => (
// <Corousel key={index}></Corousel>
// ))} */}                 
                 
               
//                 <a className="cursor-pointer mx-10" href="//pfcindia.com/Home"><img src={pfc} className="h-auto w-60" alt="LWT Logo"></img></a>
//                 <a className="cursor-pointer mx-10" href="//pregrad.in"><img src={ummed} className="h-auto w-60" alt="LWT Logo"></img></a>
//                 <a className="cursor-pointer mx-10" href="//theproductfolks.com"><img src={pregrad} className="h-auto w-60" alt="LWT Logo"></img></a>
//                 <a className="cursor-pointer mx-10" href="//theproductfolks.com"><img src={lwt} className="h-auto w-60" alt="LWT Logo"></img></a>
//                 <a className="cursor-pointer mx-10" href="//theproductfolks.com"><img src={pfc} className="h-auto w-60" alt="LWT Logo"></img></a>
                

//              </Marquee> 
//         </div>
    
// </section>
// </div>


// <section className={styles.speaker}>
// <div className={styles.middle}>
//     <h1 className={styles.middlediv}><strong>Our Speakers</strong></h1>
//     <div className="container">
//         <div className="row">
//             <div className="col-md-4">
//                 <div className="card h-60 w-60">
//                     <img src={am} className="card-img-top" alt="..." />
//                     <div className="card-body">
//                         <p className="card-text">UPSC AIR 26 (IIT BHU BATCH'15)</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-md-4">
//                 <div className="card">
//                     <img src={pm} className="card-img-top" alt="..." />
//                     <div className="card-body">
//                         <p className="card-text">UPSC AIR 52 (IIT BHU BATCH'18)</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-md-4">
//                 <div className="card">
//                     <img src={vc} className="card-img-top" alt="..." />
//                     <div className="card-body">
//                         <p className="card-text">SAMAGRA CEO Office</p>
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//     </div>
// </div>
// </section>

// <section className={styles.gallery}>
// <div className={styles.middlediv}>
//     <h1><strong>Our gallery</strong></h1>
// </div>
// <div>
//     <div className="row">
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/0/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/18/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/6/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/12/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/13/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/8/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/20/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//         <div className="col-md-3">
//             <div className>
//                 <img src="https://picsum.photos/id/28/367/267" className="card-img-top" alt="" />
//             </div>
//         </div>
//     </div>
// </div>
// </section>
// </div> */}

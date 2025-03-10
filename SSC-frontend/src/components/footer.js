import React from 'react'
import './footer.css'
import {SiFacebook,SiLinkedin,SiInstagram} from 'react-icons/si'

const footer = () => {
  return (
    <footer className="footerbody">
  	 <div className="footerContainer">
  	 	<div className="footerRow">
  	 		<div className="footer-column">
  	 			<h4>SSC</h4>
  	 			<ul>
  	 				<li><a href="/event">About us</a></li>
  	 				<li><a href="/team">Our Team</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-column">
  	 			<h4>Get help</h4>
  	 			<ul>
  	 				<li><a href="/">FAQ</a></li>
  	 				<li><a href="/">FAQ</a></li>
  	 				<li><a href="/">FAQ</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-column">
  	 			<h4>Our Clubs</h4>
  	 			<ul>
  	 				<li><a href="/spc">Social Projects club</a></li>
  	 				<li><a href="/hhc">Health & Hygeine Club</a></li>
  	 				<li><a href="/ku">Kashi Utkarsh</a></li>
  	 				<li><a href="/sahyog">Sahyog</a></li>
  	 				
  	 			</ul>
  	 		</div>
  	 		<div className="footer-column">
  	 			<h4>follow us</h4>
  	 			<div className="social-links">
				<a href="/"><SiFacebook/></a>
                <a href="/https://www.linkedin.com/company/ssc-iitbhu/"><SiLinkedin/></a>
                <a href="/https://instagram.com/ssc.iitbhu?igshid=NzZlODBkYWE4Ng=="><SiInstagram/></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
  )
}

 export default footer
// import React from "react";

// import FooterIcons from "./FooterIcons";

// const footer = () => {
  
//   const Icons = [{
//     name:"Kashi Utkarsh",
//     img:"../images/ku_logo.jpg",
//     alt:"Kashi Utkarsh",
//   },{
//     name:"Social Projects Club",
//     img:"../images/spc.jpg",
//     alt:"Social Projects Club",
//   },{
//     name:"SSCmain",
//     img:"../images/ssclogo-removebg-preview.png",
//     alt:"SSCmain",
//   },{
//     name:"Sahyog Club",
//     img:"../images/sahyog_logo.jpg",
//     alt:"Sahyog Club",
//   },{
//     name:"Health and Hygiene",
//     img:"../images/HHC_logo.jpg",
//     alt:"Health and Hygiene",
//   },]

//   return (
//     <div className="bg-light-black   text-white pb-12">
//       <div className="md:flex md:flex-row justify-evenly py-10 font-popins grid grid-cols-2 grid-rows-3">
       
//       {
//         Icons.map(item=><FooterIcons
//           name = {item.name}
//           alt = {item.alt}
//           img = {item.img}
//         >

//         </FooterIcons>)
//       }
      
      
//       </div>

//       <div className="bg-white w-[85%] h-0.5 m-auto mb-7 hidden md:block"></div>

//       <div className=" font-Montserrat flex justify-around font-medium md:flex-row flex-col-reverse gap-12  items-center ">
//         <div className="flex flex-col items-center justify-around  gap-7 w-[80%] justify-items-center content-center ">
//           <div>
//             <h3 className="md:text-4xl xs:text-3xl text-xl  ">Contact Us</h3>
//           </div>
        
//         </div>
//         <div className="bg-white w-0.5 h-[126px] hidden md:block"></div>

//         <div className="flex flex-col items-center justify-around gap-7 w-[80%] ">
//           <div>
//             <h3 className="md:text-4xl xs:text-3xl text-xl ">Connect with us</h3>
//           </div>

          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default footer;


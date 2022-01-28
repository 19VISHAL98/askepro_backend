import React from "react";
import { Grid, Image } from "semantic-ui-react";
import "../../Sass/Sass-Main/_About.scss"
import AOS from "aos";

export const MyJourney = () => {
  AOS.init({
    offset: 100,
    duration: 1100,
    easing: 'ease-in-sine',
    delay: 100,
  });
  return (
    <div>
      <div className="my_journey">
        <h1 className="headingOne">Our Journey </h1>
        <div className="journey_tree">

          <div className="odd_child" >
            <Year number='2015' />
            <div className="odd_child_content" data-aos="fade-right">
              <img src={"/Assets/images/inaguration.jpg"} />
              <div className="flex_content">
                <h2>LAID THE FOUNDATION

                </h2>
                <p>FOR OUR NEW JOURNEY</p>
              </div>
            </div>
          </div>

          <div className="even_child"  >
            <Year number='2016' />
            <div className="even_child_content" data-aos="fade-left" >
              <div  >
                <h2>NEW CEO JOINED TO OUR TEAM</h2>
                <p>Hamad Mohammed 
                  Bakhit Suhail Alrashdi 
                  Become our company CEO</p>
              </div>
              <img src={"/Assets/images/hamad2.jpg"} />
            </div>
          </div>

          <div className="odd_child" >
            <Year number='2017' />
            <div className="odd_child_content" data-aos="fade-right">
              <img src={"/Assets/images/100.png"} />
              <div className="flex_content">
                <h2>REACHED OUR FIRST MILE STONE</h2>
                <p>Joined 100 Companies with Us in This Journey</p>
              </div>
            </div>
          </div>

          <div className="even_child"  >
            <Year number='2018' />
            <div className="even_child_content" data-aos="fade-left">
              <div className="flex_content">
                <h2>JOURNEY CONTINUES </h2>
                <p>Opened a new branch
                  Collectively to our parent company</p>
              </div>
              <img src={"/Assets/images/tabrez.jpg"} />
            </div>
          </div>

          <div className="odd_child" >
            <Year number='2019' />
            <div className="odd_child_content" data-aos="fade-right">
              <img src={"/Assets/images/login-bg.png"} />
              <div className="flex_content">
                <h2>ESTABLISHED A NEW DIRECTORY BOARD </h2>
                <p>Join 100 Companies with Us in This Journey</p>
              </div>
            </div>
          </div>

          <div className="even_child"  >
            <Year number='2020' />
            <div className="even_child_content" data-aos="fade-left">
              <div className="flex_content">
                <h2>Here We Go… </h2>
                <p> Curtain raised for our 2nd branch
          To enhance services  
</p>
              </div>
              <img src={"/Assets/images/login-bg.png"} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const Year = (props) => {
  return (
    <div className="content_list_item">
      <span>{props.number}</span>
    </div>
  );
};

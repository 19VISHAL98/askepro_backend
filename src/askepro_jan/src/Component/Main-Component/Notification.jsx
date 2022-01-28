import React, {useState} from 'react';
import { Button, Icon} from "semantic-ui-react";
import '../../Sass/Sass-Main/_home.scss';


const Notification = () => {
  const [showText, setShowText]=useState(true);
   
  return(
        <>
      {showText &&  
      <div className="banner3">
      
      
        <img src="Assets/images/covid-19.png"/>
          <div className="pop_content">
            <h6>Covid-19 Guidelines & Updates</h6>
            <p>
              Given the COVID-19 outbreak, we urge you to stay tuned to updates
              by airlines & hoteliers to make informed decisions regarding
              travel date changes & cancellations.
            </p>
          </div>
          <div className="pop_btn">
          
            <button className="same-btn" 
            style={{padding:'0'}}><a href="https://u.ae/en/information-and-services/justice-safety-and-the-law/handling-the-covid-19-outbreak/travelling-amid-covid-19/travelling-to-the-uae" target="_blank" rel="regulations">
              KNOW MORE </a>
            </button>  <div className="cancel-tab">
            <button style={{border:'none', background:'white'}}onClick={() => setShowText(!showText)} > <Icon name='close' size='large'/>
               </button>
            </div>
          </div>  
          
        </div>
      }
        </>
    );
}
export default Notification;
import React from "react";
import { Container, Breadcrumb } from "semantic-ui-react";
import Header from "../../Component/Main-Component/Header";
import Footer from "../../Component/Main-Component/Footer";
import Notification from "../../Component/Main-Component/Notification";
import Visa from "../../Component/Main-Component/Visa";
import Accordion from "../../Component/Main-Component/Accordion/Accordion";
import "../../Sass/Sass-Main/_home.scss";
import "../../Sass/Sass-Main/_About.scss";
import AOS from "aos";
import Crumb from "../../Component/Main-Component/Crumb";

const Service = () => {
  AOS.init({
    offset: 100,
    duration: 600,  
    easing: 'ease-in-sine',
    delay: 100, 
  });
  return (
    <>
      <div className="crumb">
       {/*  <Crumb
          section={[
            { key: "home", content: "Home", link: true },
            { key: "apply", content: "Service", active: true },
          ]}
        /> */}
          <Breadcrumb>
                <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                  Service
                </Breadcrumb.Section>
              </Breadcrumb>
      </div>
      <div className="service-banner">
        <img src={process.env.PUBLIC_URL + "/Assets/images/service.jpg"} />
        <div className="banner-content">
          <h1>Our Services</h1>

          <h2>
          
          </h2>
        </div>
      </div>
      <div className="service-formation" id={'section1'}>
        <Container>
          <h1 className="headingOne">List Of Our Services</h1>

          <p>
          We provide all types of services ranging from your tourist visa needs to forming a company in UAE. Consider us at every level to serve you the best.
          </p>
        </Container>
      </div>
      <Visa />
      <Accordion />
      <Footer />
    
    </>
  );
};

export default Service;

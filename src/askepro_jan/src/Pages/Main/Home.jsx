import React from "react";
import { Container, Grid } from "semantic-ui-react";
import Header from "../../Component/Main-Component/Header";
import Visa from "../../Component/Main-Component/Visa";
import Apply from "../../Component/Main-Component/Apply";
import Footer from "../../Component/Main-Component/Footer";
import Notification from "../../Component/Main-Component/Notification";
import "../../Sass/Sass-Main/_home.scss";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import Dubai from "../../video/video.mp4";
import AOS from "aos";
import Slider from "react-slick";

const Home = () => {
  const history = useHistory();

  const [offers, setOffer] = React.useState([]);
  React.useEffect(() => {
    getUser();
    // getoffers();
  }, []);


  const getoffers = async () => {
    const offer = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/offer`, { method: "GET" })
    ).json();

    setOffer(offer.data);
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  AOS.init({
    offset: 100,
    duration: 600,  
    easing: 'ease-in-sine',
    delay: 100, 
  });
  const [user, setUser] = React.useState(null);
  const getUser = async () => {
   
    const id = localStorage.getItem("id");
    let user = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();
    user = user.data;

    if (user && user.isAdmin) {
      history.push("/admin");
    } else {
      setUser(1);
    }
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <div className="cover">
        <main>
          {/* <!-- //second division// --> */}
          

          <div className="video_wrapper">
            <div class="overlay"></div>
            <video autoPlay loop muted className="video">
              <source src={Dubai} type="video/mp4" />
            </video>
            <Slider {...sliderSettings} className="video_content">
            <div >
              <h1>Our business is to make your business<br/> easier in the UAE. </h1>
             {/*  <p>LEADING IMMIGRATION CONSULTANTS IN DUBAI</p> */}
             {/*  <Link to="apply">
                <button type="button" className="same-btn">
                  APPLY NOW
                </button>
              </Link> */}
              <Link to="/service#section1">
               <button
              
                        className="same-btn"
                        // onClick={() => history.push("/service#section1")}
                      >
                        KNOW MORE
                      </button>
                      </Link>
            </div>
            <div>
                      <div className="one"></div>

                      <div className="two">
                        <h1>Set up your business in the WORLDS<br/> #1 BUSINESS HUB</h1>
                        <p></p>
                      </div>
                      <button
                        className="same-btn"
                        onClick={() => history.push("/contact")}
                      >
                        KNOW MORE
                      </button>
                    </div>
                    <div>
                      <div className="one"></div>

                      <div className="two">
                       <h1> GET LICENSE UNDER 100%<br/> OWNERSHIP IN UAE</h1> 
                       <p></p>
                      </div>
                      <button
                        className="same-btn"
                        onClick={() => history.push("/contact")}
                      >
                        KNOW MORE
                      </button>
                    </div>
            </Slider>
          </div>

    
          {/* <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <Container>
              <Grid stackable columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <div className="customer-card">
                      <div className="one"></div>

                      <div className="two">
                        SET UP YOUR BUSINESS IN THE WORLDS #1BUSINESS HUB
                      </div>
                      <button
                        className="same-btn"
                        onClick={() => history.push("/contact")}
                      >
                        KNOW MORE
                      </button>
                    </div>
                  </Grid.Column>

                  <Grid.Column>
                    <div className="customer-card">
                      <div className="one"></div>

                      <div className="two">
                        GET LICENSE UNDER 100% OWNERSHIP IN UAE
                      </div>
                      <button
                        className="same-btn"
                        onClick={() => history.push("/contact")}
                      >
                        KNOW MORE
                      </button>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div> */}

          {/*  ///Home Div//
          <div className="home">
            <div className="home-content">
              <div className="main_content">
                <h1>Leading Immigration Consultants in Dubai</h1>
                <p>Our business is to make your business easier in the UAE.</p>
                <Link to="apply">
                  <button type="button" className="same-btn">
                    APPLY NOW
                  </button>
                </Link>
              </div>
            </div>
            <div className="home-bg">
              <img
                src={process.env.PUBLIC_URL + "/Assets/images/login-bg.png"}
              />
            </div>
          </div> */}

          <div className="service_heading">
            <h1 className="headingOne">Our Services</h1>
          </div>
          <div className="wrapper_home">
            <Visa />

            <Apply />
            <Footer />
            <Notification />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

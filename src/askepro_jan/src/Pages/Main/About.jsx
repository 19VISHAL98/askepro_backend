import React from "react";
import { Container, Grid, Breadcrumb } from "semantic-ui-react";
import Footer from "../../Component/Main-Component/Footer";
import Crumb from "../../Component/Main-Component/Crumb";

import "../../Sass/Sass-Main/_About.scss";
import AOS from "aos";
import { MyJourney } from "../../Component/Main-Component/MyJourney";

const About = () => {
  AOS.init({
    offset: 100,
    duration: 1300,
    easing: "ease-in-sine",
    delay: 100,
  });
  return (
    <>
      <div className="about_crumb">
        {/*     <Crumb
          section={[
            { key: "home", content: "Home", link: true },
            { key: "apply", content: "About", active: true },
          ]}
        /> */}
        <Breadcrumb>
          <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>About</Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <div className="about">
        <img
          className="about_bg"
          src={process.env.PUBLIC_URL + "/Assets/images/texture.png"}
        />

        <div className="about-content">
          <img
            className="about_logo"
            src={process.env.PUBLIC_URL + "/Assets/images/Epro Logo_Web@3x.png"}
          />
          <h1 className="headingOne">About</h1>
          <br />

          <Container text>
            <div data-aos="fade-right">
              <h2>WHY WE ARE DIFFERENT ?</h2>

              <p>
                Our core values are trust, integrity and confidentiality. We
                strive to deliver a cost-effective, professional and speedy
                service in line with customer requirements. We have a dedicated
                team of professionals and experienced hands with in-depth
                knowledge of the laws and procedures relating to governmental
                transactions. We provide advice which works and ensure that an
                assignment achieves timely completion. We believe in long term
                relationships and hence are committed to providing the best
                services to our Clients
              </p>
            </div>
            <br />
            <br />
            <br />
            <div data-aos="fade-left">
              <h2>WE ARE AIMING TO</h2>
              <p>
                Our goal is to be the PRO concierge service of choice for
                businesses and individuals across the UAE. Navigating the UAE’s
                complex landscape of administrative and regulatory obligations
                can be time-consuming and overwhelming, whether you’re an
                individual, a start-up, SME or large-scale corporate
              </p>
            </div>
            <br />
            <br />
            <br />
            <div data-aos="fade-right" data-aos-anchor-placement="top-bottom">
              <h2>MISSION</h2>
              <p>
                Our mission is to take the hassle out of business by
                consistently providing superior services designed to put our
                clients at ease. And with unparalleled depth of both functional
                and industrial expertise, we not only help clients enter the UAE
                market with condense and poise but also build their capabilities
                for the future. Our knowledge, expertise, local insight and
                passion allow us to address governmental challenges that no one
                else can.
              </p>
            </div>
          </Container>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="team">
        <Container>
          <div className="about_container">
            <h1 className="headingOne">Meet Our Management Team </h1>

            <Grid stackable columns={1}>
              <Grid.Column>
                <div
                  className="space1"
                  data-aos="fade-right"
                  data-aos-anchor-placement="top-bottom"
                >
                  
                  <div className="about-card">
                    <div className="team_column">
                      <div className="team_text">
                        <div className="team-name">
                          <h5>Shefeek Ismail</h5>
                          <h6>FOUNDER, ASK E PRO</h6>
                        </div>
                        <div className="team-content">
                          <p>
                            Welcome to ASKEPRO, It’s very happy to see you
                            pleasured on our aids on your much important moments
                            of life till the date. We extremely made the days to
                            have our services related to your Documentation and
                            Data oriented works which changes your way of life.
                            We will undertake changes And innovations for a
                            greater customer experience by which we accurately
                            identify the needs of customers to provide them with
                            unexpected benefits and values, exceeding their
                            expectations, to create a truly positive customer
                            experience. All ASK E PRO employees will continue to
                            dedicate themselves to maximizing customer values
                            through growth and development. We ask for your
                            steadfast support and interest.
                          </p>
                        </div>
                      </div>
                      <div className="team_image">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/sheffek.jpg"
                          }
                        />
                      </div>
                      {/*  <div className="team-image">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/team.svg"
                          }
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div
                  className="space2"
                  data-aos="fade-left"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="about-card">
                    <div className="team_column">
                      <div className="team_text">
                        <div className="team-name">
                          <h5>Hamad Mohammed Bakhit Suhail Alrashdi</h5>
                          <h6>CO-FOUNDER, ASK E PRO</h6>
                        </div>
                        <div className="team-content">
                          <p>
                            We are pleased to welcome you to our networks
                            website. The history of ASKEPRO began in 2005. Since
                            then, ASKEPRO has been engaging in various services
                            based on its widely stemming reach from its local
                            and global networks, strong sourcing base, and
                            excellent technical capacities. ASKEPRO is always
                            with its customers in their lives as a trustworthy
                            partner that provides a much better help to their
                            life changing moments. We at ASKEPRO will try our
                            best to make the lives of our customers more
                            comfortable and prosperous.
                          </p>
                        </div>
                      </div>
                      <div className="team_image">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/hamad.jpg"
                          }
                        />
                      </div>
                      {/*  <div className="team-image">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/team.svg"
                          }
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <div
                  className="space2"
                  data-aos="fade-left"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="about-card">
                    <div className="columns">
                      <div className="team-name">
                        <h5>Agent Name</h5>
                        <p>Chief Operating Officer, askEPro</p>
                      </div>
                      <div className="team-content">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry’s standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type
                        </p>
                      </div>
                      <div className="team-image">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/team2.svg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </div>
      <MyJourney />
      <br />
      <br />
      <br />


      {/* <div className="our_journey">
        <h1 className="headingOne">Our Journey</h1>
        <p>Follow our history from humble beginnings to a world-class trade center.</p>
        <div className="flow_chart">
          <ul className="content_list">
            <li><p>2002</p></li>
            <li><p>2003</p></li>
            <li><p>2004</p></li>
            <li><p>2005</p></li>
            <li><p>2008</p></li>
          </ul>
        </div>
      </div> */}

      <Footer />
     
    </>
  );
};

export default About;

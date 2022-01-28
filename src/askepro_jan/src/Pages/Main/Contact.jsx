import React from "react";
import { Grid, Container, Form, Breadcrumb } from "semantic-ui-react";
import Notification from "../../Component/Main-Component/Notification";
import Footer from "../../Component/Main-Component/Footer";
import "../../Sass/Sass-Main/_About.scss";
import Crumb from "../../Component/Main-Component/Crumb";
import AOS from "aos";
import Updated from "../../Component/popup/updated";

const Contact = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/contact/create`;
  AOS.init({
    offset: 100,
    duration: 600,
    easing: "ease-in-sine",
    delay: 100,
  });
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [query, setQuery] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const createContact = async (event) => {
    try {
      event.preventDefault();
      const jsonPostData = {
        name: name,
        email: email,
        query: query,
      };

      const result = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonPostData),
      });
      var form = document.getElementsByName("query")[0];
      form.reset();
      const data = await result.json();

      if (data && result.status == 200) {
        setMsg("Your complaint is submitted successfully");
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="crumb">
        {/* <Crumb
        section={[
          { key: "home", content: "Home", link: true },
          { key: "apply", content: "Contact", active: true },
        ]}
      /> */}
        <Breadcrumb>
          <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Contact</Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <div class="contact">
        <img src={process.env.PUBLIC_URL + "/Assets/images/LETS.jpg"} />
        <div className="contact_content">
          <h1>Let's have a talk </h1>

          {/*  <h2>
          Experience success with UAE and take your business to new heights with
          Askepro.
          <br />
          Contact us, today!
        </h2> */}
        </div>
      </div>
      <center>
        <h1 className="headingOne">Contact us</h1>
      </center>

      <div class="address">
        <Grid doubling stackable columns={3}>
          <Grid.Row>
            <Grid.Column>
              <div
                class="contact-details-1"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
              >
                <img src={process.env.PUBLIC_URL + "/Assets/images/pin.png"} />
                <p>
                  Kalari Documents Clearing Services
                  <br />
                  Dragon Mart 1,Shop No DHOFF16 Dubai, United Arab Emirates
                </p>
              </div>
              <div
                class="contact-details"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
              >
                <img
                  src={process.env.PUBLIC_URL + "/Assets/images/phone.png"}
                />
                <a href="https://wa.me/971565472003">
                  <p style={{ textDecoration: "underline" }}>+97180073232</p>
                </a>
              </div>
              <div
                class="contact-details"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
              >
                <img src={process.env.PUBLIC_URL + "/Assets/images/mail.png"} />
                <p><a style={{color:'black'}} href="mailto:care@askepro.ae">care@askepro.ae</a></p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div id="map" data-aos="fade-up">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.8211987464706!2d55.410161214484!3d25.175514538758975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f61ce99959ff3%3A0x9f391776b31195c4!2sKALARI%20DCS!5e0!3m2!1sen!2sin!4v1619901723581!5m2!1sen!2sin"></iframe>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div
                className="information"
                onSubmit={createContact}
                data-aos="fade-left"
                data-aos-anchor-placement="top-bottom"
              >
                <Form name="query">
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Name</label>
                      <input
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder=" Enter your email Id"
                        required
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field>
                    <label>Query</label>
                    <Form.TextArea
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Describe Your Query"
                      required
                    />

                    <div className="reach-Submit">
                      <p>
                        By clicking on 'Submit' you will agree to T&C of AskePro
                      </p>
                      <button className="same-btn" type="submit">
                        SUBMIT
                      </button>
                    </div>
                  </Form.Field>
                </Form>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <footer className="footer">
        <Container fluid>
          <Grid stackable columns={2}>
            <Grid.Column width={9}>
              <div className="footer-part-1">
                <a href="#">
                  <img
                    className="footer_image"
                    src={
                      process.env.PUBLIC_URL +
                      "/Assets/images/Epro Logo_Web.png"
                    }
                  />
                </a>

                <img
                  className="footer_image1"
                  src={process.env.PUBLIC_URL + "/Assets/images/playstore.png"}
                />

                <img
                  className="footer_image2"
                  src={process.env.PUBLIC_URL + "/Assets/images/ios.png"}
                />
              </div>
            </Grid.Column>

            <Grid.Column width={7}>
              <div className="footer-part-2">
                <p>copyright © 2021 AskePro</p>
                <div className="bottom-button">
                  {/*<a href="#" style={{ borderLeft: "none" }}>
                    Site Map
                  </a>
                   <a href="#">Legal Notice</a>
                  <a href="#">Data Policy</a>
                  <a href="#">Terms and Conditions</a>
                  <a href="#">Privacy Policy</a> */}
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Updated open={open} msg={msg} onClose={() => setOpen(false)} />
      </footer>

      <Notification />
    </>
  );
};

export default Contact;

import React from "react";
import { Grid, Segment, Container, Form } from "semantic-ui-react";
import "../../Sass/Sass-Main/_Footer.scss";
import Updated from "../../Component/popup/updated";
const Footer = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/contact/create`;

  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [query, setQuery] = React.useState(null);
  const [open,setOpen] = React.useState(false);
  const [msg,setMsg] = React.useState(false);
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
        setMsg(data.msg)
        setOpen(true)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     
      <div className="reach">
        <Container fluid>
          <h2>Reach Out To Us</h2>

          <p>Kalari Documents Clearing Services</p>
          <p>Dragon Mart 1,Shop No DHOFF16</p>
          <p className="reach_break">Dubai, United Arab Emirates</p>

          <p className="reach_break">care@askepro.ae</p>
          <p>+97180073232</p>

          <div className="information" onSubmit={createContact}>
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
                    placeholder=" Enter your email address"
                    required
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Query</label>
                <Form.TextArea
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Describe Your Query"
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
        </Container>
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
                    process.env.PUBLIC_URL + "/Assets/images/Epro Logo_Web.png"
                  }
                /></a>

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
        <Updated open={open} msg={msg} onClose={()=>setOpen(false)}/>
      </footer>
      
    </>
  );
};

export default Footer;

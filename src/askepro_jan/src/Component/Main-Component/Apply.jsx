import React from "react";
import { Grid, Segment, Container, Icon, Button } from "semantic-ui-react";
import Slider from "react-slick";

const Apply = () => {
  const [offers, setOffer] = React.useState([]);
  React.useEffect(() => {
    getoffers();
  }, []);


  const getoffers = async () => {
    const offer = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/offer`, { method: "GET" })
    ).json();

    setOffer(offer.data);
  };
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    speed: 600,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const offer = {
    dots: true,
    infinite: true,
    autoplay: true,
    infinite: true,
    speed: 600,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="service_heading">
        <h1 className="headingOne">Our Offers</h1>
      </div>
      <Slider {...offer}>
        {offers.map(ele=><div className="offer_banner" >
  <img src={"data:image/png;base64," +ele.data} />
    </div>)}
      </Slider>

      <section className="step">
        <div className="apply">
          <h1 className="headingOne">How to apply</h1>
          <div className="dashed_line"></div>
          <p>
            At Askepro, we are committed to provide quick and efficient
            expert-services in overcoming challenges of migration visas, <br />
            overseas business establishment, and resettlement in UAE.
          </p>
        </div>
        <Container>
          <Grid stackable columns={3}>
            <Grid.Row>
              <Grid.Column>
                <div
                  className="outer_circle"
                  data-aos="zoom-out-right"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="circle">
                    <img
                      src={process.env.PUBLIC_URL + "/Assets/images/step1.png"}
                    />
                  </div>
                </div>
                <div className="step_heading">
                  <h6>Step 1</h6>
                  <p>
                    Get in-touch with our world-class consultants that will help
                    you in navigating through the best solutions of setting up a
                    business in Dubai
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="outer_circle">
                  <div
                    className="circle"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/Assets/images/step2.png"}
                    />
                  </div>
                </div>
                <div className="step_heading">
                  <h6>Step 2</h6>
                  <p>
                    After fixating on the solutions, we take up the challenges
                    and help in setting up your organization that can include
                    finding an office space and arranging supplies too.
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div
                  className="outer_circle"
                  data-aos="zoom-out-left"
                  data-aos-anchor-placement="top-bottom"
                >
                  <div className="circle">
                    <img
                      src={process.env.PUBLIC_URL + "/Assets/images/step3.png"}
                    />
                  </div>
                </div>
                <div className="step_heading">
                  <h6>Step 3</h6>
                  <p>
                    Once done, we keep on following up to ensure that the
                    business is covered from 360-degree perspective and help you
                    in managing all your legal and subjective requirements.
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>

      <div
        className="bottom_slider"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="slider_image_section">
          <img src={process.env.PUBLIC_URL + "/Assets/images/brands.jpg"} />
        </div>
        <div className="slider_content">
          <h2>
            We Are Closely Working With All <br />
            Government Departments
          </h2>
          <Container>
            <Slider {...settings}>
              <div className="slider_glide">
                <img
                  id="xl_glide"
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/images/Dubai-Health-Authority-Jobs.png"
                  }
                  width="135px"
                />
              </div>
              <div className="slider_glide">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/images/Dubai-Municipality-2048x1063.png"
                  }
                />
              </div>
              <div className="slider_glide">
                <img
                  src={process.env.PUBLIC_URL + "/Assets/images/images.png"}
                  width="125px"
                />
              </div>
              <div className="slider_glide">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/images/kissclipart-trakhees-logo-clipart-logo-trakhees-environment-1c20dac0f2e57ace.png"
                  }
                />
              </div>
              <div className="slider_glide">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/images/kisspng-tasheel-abu-dhabi-business-service-company-dubai-5acc8fa6463572.2931354715233555582876.png"
                  }
                />
              </div>
              <div className="slider_glide">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/images/1200px-UAE_MOH_brandmark_Vertical_RGB_AE.png"
                  }
                />
              </div>
              <div className="slider_glide">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/images/ministry-of-interior.png"
                  }
                />
              </div>
              <div className="slider_glide">
                <img
                  src={process.env.PUBLIC_URL + "/Assets/images/new-amer.png"}
                />
              </div>
              <div className="slider_glide">
                <img
                  src={process.env.PUBLIC_URL + "/Assets/images/pngegg.png"}
                  width="100px"
                />
              </div>
              <div className="slider_glide" id="glide_box">
                <img
                  src={process.env.PUBLIC_URL + "/Assets/images/logo_ded.png"}
                />
              </div>
            </Slider>
          </Container>
        </div>
      </div>

      {/* <section className="customer">
        
          <h1 className="headingOne">Customer Reviews</h1>

          <p>
            Our Clients and their successful businesses are a true mark of our
            values and skills that we use to ensure that your venture thrives.
            Our success depends on your success.
            Here’s what your successful clients have to say about Askepro
          </p>
          <Grid stackable columns={3}>
            <Grid.Row>
              <Grid.Column>
                <div className="customer-card">
                  <div className="one">
                    <div className="left">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/Assets/images/user_review.png"
                        }
                      />
                    </div>
                    <div className="right">
                      Fatima Sheikh <br />
                      <img
                        src={
                          process.env.PUBLIC_URL + "/Assets/images/ratings.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="two">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column>
                <div className="customer-card">
                  <div className="one">
                    <div className="left">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/Assets/images/user_review.png"
                        }
                      />
                    </div>
                    <div className="right">
                      Muhammed Al- Rasool <br />
                      <img
                        src={
                          process.env.PUBLIC_URL + "/Assets/images/ratings.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="two">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column>
                <div className="customer-card">
                  <div className="one">
                    <div className="left">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/Assets/images/user_review.png"
                        }
                      />
                    </div>
                    <div className="right">
                      Muhammed Al-Imran
                      <br />
                      <img
                        src={
                          process.env.PUBLIC_URL + "/Assets/images/ratings.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="two">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <div className="slide-btn">
            <Icon name="chevron left"></Icon>
            <Icon name="chevron right"></Icon>
          </div>
        
      </section> */}
    </>
  );
};

export default Apply;

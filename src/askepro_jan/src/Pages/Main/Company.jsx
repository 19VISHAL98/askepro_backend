import React from "react";
import { Container, Dropdown, Table, Grid } from "semantic-ui-react";
import Footer from "../../Component/Main-Component/Footer";
import Header from "../../Component/Main-Component/Header";
import { Link, useHistory, useParams } from "react-router-dom";
import Crumb from "../../Component/Main-Component/Crumb";
import "../../Sass/Sass-Main/_About.scss";
import { HashLink } from "react-router-hash-link";

const Company = () => {
  const history = useHistory();
  const [service, setService] = React.useState({});
  const [serviceType, setServiceType] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [show, setShow] = React.useState(false);
  // const [sub, setSub] = React.useState(null);
  const [subOpt, setSubOpt] = React.useState(null);

  const { slug } = useParams();
  const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory/${slug}`;
  React.useEffect(() => {
    getServiceSlugDetail();
  }, []);

  const getServiceSlugDetail = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();

    if (services.data.category.length > 0) {
      const serviceData = {
        deleted: services.data.raw.deleted,
        _id: services.data.raw._id,
        name: services.data.raw.name,
        scode: services.data.raw.scode,
        overview: services.data.raw.overview,
        serviceDetail: services.data.raw.serviceDetail,
        description: services.data.raw.description,
        slug: services.data.raw.slug,
      };
      setService(serviceData);
      setSubOpt(
        services.data.category.map((e) => ({
          text: e,
          value: e,
          key: e,
        }))
      );
    } else {
      const serviceData = {
        deleted: services.data.raw.deleted,
        _id: services.data.raw._id,
        name: services.data.raw.name,
        scode: services.data.raw.scode,
        overview: services.data.raw.overview,
        serviceDetail: services.data.raw.serviceDetail,
        description: services.data.raw.description,
        slug: services.data.raw.slug,
      };
      let serviceOptions = services.data.raw.serviceDetail.map((e) => ({
        text: e.name,
        value: e._id,
        key: e._id,
      }));
      setOptions(serviceOptions);
      setService(serviceData);
    }
  };
  const getserviceType = async (val) => {
    let sub = service.serviceDetail.find((o) => o._id === val);
    setShow(true);
    console.log(sub);
    setServiceType(sub);
  };
  const handleSub = async (ele) => {
    setOptions(
      service.serviceDetail
        .filter((x) => x.type.toString() === ele.toString())
        .map((e) => ({
          text: e.name,
          value: e._id,
          key: e._id,
        }))
    );
    // getserviceType(val);
  };
  const handleSubmit = async (slug, name, subCatId, subCatName, type) => {

    if(!localStorage.getItem("token"))(
      history.push("/login")
    )
    localStorage.removeItem("mode");
    localStorage.setItem("serviceSlug", slug);
    let jsonPostData = {
      serviceName: name,
    };
    let userId = localStorage.getItem("id");
    let url = `${process.env.REACT_APP_BASE_URL}/service/${userId}`;
    const result = await (
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(jsonPostData),
      })
    ).json();

    localStorage.setItem("applicationId", result.data._id);
    localStorage.setItem("subCatId", subCatId);
    jsonPostData = {
      subCat: subCatName,
      cat: type,
    };

    url = `${process.env.REACT_APP_BASE_URL}/service/type/${result.data._id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonPostData),
    });

    history.push(`/fill`);
  };
console.log(serviceType)
  if (!service) return <div></div>;
  return (
    <>
      <div className="company_wrapper">
        <Crumb />
        <div
          class="company"
          style={{
            background: `url(${
              process.env.PUBLIC_URL + "/Assets/images/contact-bg.png"
            })`,
            backgroundSize: "cover",
          }}
        >
          <Container>
            <h1>{service.name} </h1>
            <p>
              {service.description}
              {/* <br />
            veniam. Doloribus officiis minus Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Sunt, ratione. eius!
            */}
            </p>
          </Container>
        </div>
        <Container>
          <div className="overview">
            <Grid stackable column={2}>
              <Grid.Column>
                <div className="service_dropdown">
                  {subOpt ? (
                    <Dropdown
                      className="golu"
                      placeholder="Choose Category"
                      options={subOpt}
                      icon="angle down"
                      onChange={(e, i) => {
                        const val = i.value;
                        handleSub(val);
                      }}
                    ></Dropdown>
                  ) : (
                    <></>
                  )}

                  <Dropdown
                    className="golu"
                    placeholder={
                      subOpt ? "Select Sub Category" : "Select Category"
                    }
                    options={options}
                    icon="angle down"
                    onChange={(e, i) => {
                      const val = i.value;
                      getserviceType(val);
                    }}
                  />

                  {show ? (
                    <Grid.Column>
                      <div className="company_plans">
                        <div className="tourist" style={{ margin: "0" }}>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column>
                                <div className="tourist-border">
                                  <div className="hours">
                                    <h3>{serviceType.name}</h3>
                                
                                      {" "}
                                      <button
                                        className="same-btn"
                                        type="submit"
                                        onClick={() =>
                                          handleSubmit(
                                            service.slug,
                                            service.name,
                                            serviceType._id,
                                            serviceType.name,
                                            serviceType.type
                                          )
                                        }
                                      >
                                        APPLY NOW
                                      </button>
                                 
                                  </div>
                                  <Table fixed>
                                    <Table.Row>
                                      {/* <Table.HeaderCell>Processing Time</Table.HeaderCell>
                                    <Table.HeaderCell>Stay Period</Table.HeaderCell>
                                    <Table.HeaderCell>Validity</Table.HeaderCell>
                                    <Table.HeaderCell>Entry</Table.HeaderCell> */}
                                      <Table.HeaderCell>Fees</Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      {/* <Table.Cell>
                                      Upto {serviceType.processT} Days
                                    </Table.Cell>
                                    <Table.Cell>
                                      {serviceType.stayPeriod} Days
                                    </Table.Cell>
                                    <Table.Cell>
                                      {serviceType.validity} Days
                                    </Table.Cell>
                                    <Table.Cell>{serviceType.entry}</Table.Cell> */}
                                      <Table.Cell>
                                        <span className="total-right"  style={{ textDecoration : serviceType?.discountPrice>0 ? 'line-through' : 'none' }}>

                                         {serviceType.price} AED
                                        </span>
                                        {" "}{serviceType?.discountPrice>0?<span className="total-right">
                                       {serviceType.price-serviceType?.discountPrice} AED
                                      </span>:<></>}
                                      </Table.Cell>
                                    </Table.Row>
                                  </Table>
                                </div>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </div>
                      </div>
                      <h3>Documents Required</h3>

                      {serviceType.reqDocs &&
                        serviceType.reqDocs.map((d) => (
                          <div className="testimonial">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/Assets/images/pinpoint.png"
                              }
                            />
                            <p>{d}</p>
                          </div>
                        ))}
                    </Grid.Column>
                  ) : (
                    <></>
                  )}

                  {/*
              <div className="testimonial">
              <img src={process.env.PUBLIC_URL + '/Assets/images/pinpoint.png'} />
                <p>Lorem Ipsum is simply dummy text of the printing </p>
              </div>
              <div className="testimonial">
              <img src={process.env.PUBLIC_URL + '/Assets/images/pinpoint.png'} />
                <p>Lorem Ipsum is simply dummy text of the printing </p>
              </div>
              <div className="testimonial">
              <img src={process.env.PUBLIC_URL + '/Assets/images/pinpoint.png'} />
                <p>Lorem Ipsum is simply dummy text of the printing </p>
              </div>
              <div className="testimonial">
              <img src={process.env.PUBLIC_URL + '/Assets/images/pinpoint.png'} />
                <p>Lorem Ipsum is simply dummy text of the printing </p>
              </div>
              */}
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};
export default Company;

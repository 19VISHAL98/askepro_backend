import React, { useState } from "react";
import { useFormik, useformik } from 'formik';
import { useHistory } from "react-router";
import {
  Container,
  Grid,
  Radio,
  Divider,
  Checkbox,
} from "semantic-ui-react";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import ButtonBar from "../../Component/ButtonBar/buttonbar";
import Heading from "../../Component/Heading/heading";
import Stepper from "../../Component/Stepper/stepper";
import "../StepPages/stepPage.scss";

function ApplyStepper() {
  localStorage.removeItem("mode");
  const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory`;
  const [services, setServices] = React.useState(null);
  const history = useHistory();


  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = services.data.map((e) => ({
      _id: e._id,
      name: e.name,
      scode: e.scode,
      slug: e.slug,
    }));
    setServices(serviceData);
  };

  const handleSubmit = async (name,slug) => {
    localStorage.setItem("serviceSlug",slug);
    const jsonPostData={
      "serviceName": name
    }
    let userId= localStorage.getItem('id')
    const url=`${process.env.REACT_APP_BASE_URL}/service/${userId}`
    const result = await(await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token':localStorage.getItem("token")
      },
      body: JSON.stringify(jsonPostData)
    })).json();
    
    localStorage.setItem("applicationId", result.data._id);
    history.push(`/type`);
  }

  // const formik =useFormik({
  //   initialValues,
  //   onSubmit:(values)=>{
  //     alert(JSON.stringify(values, null, 2));
  //   }
  // });

  return (
    <main>
      <div className="apply-section">
        <BreadCrumbs
          section={[
            { key: "home", content: "Home", link: true },
            { key: "apply", content: "Apply Now", active: true },
          ]}
        />
        <Heading />
        <Container className="stepper-container" stackable="mobile">
          <Stepper />
          <Divider />
          <div className="form">
            <Grid columns="3" stackable="mobile">
              <Grid.Row>
                {services &&
                  services.map((service) =>
                    <Grid.Column >

                      <div class="checkbox p-default p-round pretty">
                        <input type="radio" name="service_radio" onClick={() =>handleSubmit(service.name,service.slug)}/>
                        <span class="state">
                          <label>{service.name}</label>
                        </span>
                      </div>

                    </Grid.Column>
                  )}
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </div>
      {/* <ButtonBar /> */}
    </main>
  );
}
export default ApplyStepper;

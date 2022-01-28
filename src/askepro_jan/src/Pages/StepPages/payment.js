import React from "react";
import { useHistory } from "react-router";
import {
  Container,
  Header,
  Divider,
  Grid,
  Radio,
  Button,
  Form,
  Select
} from "semantic-ui-react";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import Heading from "../../Component/Heading/heading";
import Updated from "../../Component/popup/updated";
import Stepper from "../../Component/Stepper/stepper";
import "../StepPages/stepPage.scss";

const Payment = () => {
  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener('popstate', function (event) {
    window.history.pushState(null, document.title, window.location.href);
  });
  const countryOptions = [
    { key: 'normal', value: 0, text: 'Normal' },
    { key: 'urgent', value: 50, text: 'Urgent' },
  ]

  const [method, setMethod] = React.useState(null);
  const [adFess, setFees] = React.useState(0);
  const [mainService, setMainService] = React.useState(null);
  const [name, setName] = React.useState(null);
  const history = useHistory();
  const requestId = localStorage.getItem("applicationId");
  const url = `${process.env.REACT_APP_BASE_URL}/service/payment/${requestId}`
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");

  const [services, setService] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  React.useEffect(async () => {
    await getServices();
    await getServiceSlugDetail();
  }, []);

  const slug = localStorage.getItem("serviceSlug");
  const surl = `${process.env.REACT_APP_BASE_URL}/serviceCategory/${slug}`;
 

  const subCatId = localStorage.getItem("applicationId");
  const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory/subCat/${subCatId}`;
  const getServiceSlugDetail = async () => {
    const ser = await (await fetch(surl, { method: "GET" })).json();

    {
      const serviceData = {
        deleted: ser.data.raw.deleted,
        _id: ser.data.raw._id,
        name: ser.data.raw.name,
        scode: ser.data.raw.scode,
        overview: ser.data.raw.overview,
        serviceDetail: ser.data.raw.serviceDetail,
        description: ser.data.raw.description,
        slug: ser.data.raw.slug,
      };
      setMainService(serviceData);
    }
  }


const getServices = async () => {
  const service = await (await fetch(service_url, { method: "GET" })).json();
  console.log(service);
  const serviceData = {
    name: service.data.name,
    reqDocs: service.data.reqDocs,
    overview: service.data.overview,
    processT: service.data.processT,
    stayPeriod: service.data.stayPeriod,
    validity: service.data.validity,
    entry: service.data.entry,
    price: service.data.price
  };
  setService(serviceData);

};



const handleSubmit = async (state) => {

  const jsonData = {
    "price": adFess,
    "type": method,
    "status": state,
  }

  const result = await (await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem("token")
    },
    body: JSON.stringify(jsonData)
  })).json();

  if (state === "Failed") {
    setOpen(true)
    setMsg("There has been issue with your payment, please create a new Application")



  }
  else if (result.status === 1)
    history.push();
  window.location.href = result.url;
}


if (!services) {
  return <div />;
}
return (
  <main>
    <div className="payment-section">
      <BreadCrumbs
        section={[
          { key: "home", content: "Home", link: true },
          { key: "apply", content: "Apply Now", active: true },
        ]}
      />
      <Heading />
      <Container className="stepper-container">
        <Stepper />
        <Divider />
        <div className="form">
          <label className="payment-header">Summary</label>
          <div className="payment-container">
            <h2>{mainService?.name}</h2>
            <h3>{services.name}</h3>
            <Grid columns="5" fluid stackable="tablet">
              <Grid.Row>
                {/* <Grid.Column>
                    <label className="heading">Processing Time</label>
                    <label className="value">
                      Upto {services.processT} days
                    </label>
                  </Grid.Column>
                  <Grid.Column>
                    <label className="heading">Stay Period</label>
                    <label className="value">{services.stayPeriod} days</label>
                  </Grid.Column>
                  <Grid.Column>
                    <label className="heading">Validity</label>
                    <label className="value">{services.validity} Days</label>
                  </Grid.Column>
                  <Grid.Column>
                    <label className="heading">Entry</label>
                    <label className="value">{services.entry}</label>
                  </Grid.Column> */}
                <Grid.Column>
                  <label className="heading fees">Fees</label>
                  <label className="value total">{parseInt(services.price + adFess)} AED</label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <label className="payment-header">Choose payment method</label>
          <Grid columns="3" stackable="mobile">
            <Grid.Row>
              <Grid.Column>
                <Radio
                  label="Pay via Debit Card"
                  name="paymentGroup"
                  id="dc"
                  onClick={() => { setMethod('Debit Card') }}
                />
              </Grid.Column>
              <Grid.Column>
                <Radio
                  label="Pay via Credit Card"
                  name="paymentGroup"
                  id="cc"
                  onClick={() => { setMethod('Credit Card') }}
                />
              </Grid.Column>
              <Grid.Column>
                <Radio
                  label="Pay via Net Banking"
                  name="paymentGroup"
                  id="upi"
                  onClick={() => { setMethod('Net Banking') }}
                />
              </Grid.Column>
              <Grid.Column>
                <label className="payment-header">Priority</label>
                <Select placeholder='Priority' options={countryOptions} onChange={(e, { value }) => setFees(value)} />
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <label className="notice">
            Final price mentioned in the summary will be deducted from the
            account provided
          </label>
          <div className="button-group">
            <Button size='big' onClick={() => { handleSubmit("Complete") }}>YES</Button>
            <Button size='big' onClick={() => { handleSubmit("Failed") }}>NO</Button>
          </div>
        </div>
        <Updated open={open} wrong={open} msg={msg} onClose={() => { setOpen(false); history.push("/fill"); }} />
      </Container>
    </div>
  </main>
);
    };
export default Payment;

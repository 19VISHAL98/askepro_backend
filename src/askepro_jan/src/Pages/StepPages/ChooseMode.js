import React, { useState } from "react";
import { useHistory } from "react-router";
import {
    Grid,
    Divider,
    Form,
    Message,
    Container,
    Select,
    Input,
    Label,
    CardDescription,
    Radio,
} from "semantic-ui-react";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import ButtonBar from "../../Component/ButtonBar/buttonbar";
import DataCard from "../../Component/Card/card";
import Heading from "../../Component/Heading/heading";
import Stepper from "../../Component/Stepper/stepper";
import "../StepPages/stepPage.scss";

function Mode() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
        window.history.pushState(null, document.title, window.location.href);
    });


    const [Name, setName] = React.useState(null);
    const history = useHistory();
    const requestId = localStorage.getItem("applicationId");
    const url = `${process.env.REACT_APP_BASE_URL}/service/mode/${requestId}`
    if (!localStorage.getItem("token") && !localStorage.getItem("id"))
        history.push("/login");

    const [services, setService] = React.useState(null);
    
    React.useEffect(() => {
        getServices();
    }, []);

    const slug = localStorage.getItem("serviceSlug");
    // const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory/${slug}`;

    const subCatId= localStorage.getItem("applicationId");
    const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory/subCat/${subCatId}`;

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


    const handleSubmit = async (val) => {
        await localStorage.setItem("mode", val);
        const result = await (await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ "mode": val })
        })).json();

        if (val === 'Online')
            history.push("/upload");
        else if (val === 'Offline')
            history.push("/book");
       
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
                <Grid columns='2' stackable='tablet' className='data'>
                    <Grid.Column width={11}>
                    <Container className="stepper-container">
                        <Stepper />
                        <Divider />
                        <div className="form">
                            <label className="payment-header">Choose Documnent Submission Method method</label>

                            <Grid columns="3" stackable="mobile">
                                <Grid.Row>
                                    <Grid.Column>
                                        <Radio
                                            label="Online"
                                            name="online"
                                            id="online"
                                            onClick={() => handleSubmit('Online')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Radio
                                            label="Offline"
                                            name="Offline"
                                            id="Offline"
                                            onClick={() => handleSubmit('Offline')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>


                        </div>
                    </Container>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <DataCard />
                    </Grid.Column>
                </Grid>
            </div>
        </main>
    );
};
export default Mode;

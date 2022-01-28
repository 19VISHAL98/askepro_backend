import React from 'react';
import { Grid, Divider, Form, Message , Container, Select, Input, CardDescription, Icon, Header, Button, Label, GridRow} from 'semantic-ui-react';
import BreadCrumbs from '../../Component/Breadcrumb/breadcrumb';
import Heading from '../../Component/Heading/heading';
import Stepper from '../../Component/Stepper/stepper';
import '../StepPages/stepPage.scss';
import '../../Sass/app.scss';
import { useHistory } from 'react-router';

const Success = () =>{
    const history=useHistory();
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });
    const [data, setData]=React.useState(null);
    if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
    const requestId=localStorage.getItem("applicationId");
    React.useEffect(() => {
        getServices();
      }, []);
      const service_url = `${process.env.REACT_APP_BASE_URL}/service/${requestId}`;
      const getServices = async () => {
        const service = await (await fetch(service_url, { method: "GET" })).json();
        setData(service);
      };

      if(!data){
          return(<></>)
      }
      console.log(data);
            return(
            <main>
             <div className='success-main'>
                 <BreadCrumbs section={[
                        {key:'home', content:'Home', link:true },
                        {key:'apply', content:'Apply Now', active:true }
                 ]}/>
                 <Heading/>
             <div className='step-data'>
                <Container className="stepper-container" stackable='mobile'>
                <Stepper/>
                <Divider/>
                <div className="success-form">  
                <div className='success-box'>
                <div> 
                <Icon name='check'/>
                </div>   
                <p className='text'>
                   Your payment was successful and we have also recieved the slot for your appointment.
                   You can keep track of your application from your 
                   "History". 
                </p>
                </div>
                <Divider/>
                <Grid columns='2' stackable='mobile' >
                <Grid.Row>
                <Grid.Column>
                <h3>{data.serviceCategory.name}</h3>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column>
                <Grid columns='6' fluid stackable='tablet'>
                    <Grid.Row>
                        <Grid.Column width={7}>
                        <label className='heading'>Date</label>
                        <label className='value'>{new Date(data.transaction.createdAt).toLocaleString()}</label>
                        </Grid.Column>
                        <Grid.Column width={7}>
                        <label className='heading'>Service Id</label>
                        <label className='value'>{data.serviceCategory._id}</label>
                        </Grid.Column>
                        <Grid.Column width={7}>
                        <label className='heading'>Transaction Id</label>
                        <label className='value'>{data.transaction._id}</label>
                        </Grid.Column>
                        <Grid.Column  width={7}>
                        <label className='heading'>Mode of Payment</label>
                        <label className='value'>{data.transaction.ptype}</label>
                        </Grid.Column>
                        <Grid.Column  width={7}>
                        <label className='heading'>Amount Paid</label>
                        <label className='total-label'>{data.transaction.amount}</label>
                        </Grid.Column>
                        <Grid.Column width={7} >
                        <label  className='heading'>Status</label>
                        <Label className='status' as='a'>{data.transaction.status}</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Grid.Column>
                <Grid.Column>
                <div className='event-card'>
                 <div className='calender'>
                    <label className='date'>{data.appointment.appt_date}</label>
                    <label className='month'>{data.appointment.appt_month} {data.appointment.appt_year}</label>
                 </div>
                 <div className='event-info'>
                 <Label as='a' className='upcoming'>{data.appointment.status}</Label>
                 <p>{data.appointment.title}</p>
                 <label className='time'>{data.appointment.time||""}</label>
                 </div>
                </div>
                </Grid.Column>
                </Grid.Row>
                </Grid>
                </div>
                <div className='bottom-btn'>
                 {/* <Button className='btn download'>Download Reciept</Button> */}
                 <Button className='btn home' onClick={()=>history.push("/")}>Go To Home</Button>
                </div>
                </Container>     
            </div>
            </div>       
            </main>
        )
}

export default Success;
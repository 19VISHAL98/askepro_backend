import React from 'react'
import { Header, Divider, Container, Grid, Form, Select, Input, Label } from 'semantic-ui-react';
import { Calendar } from 'react-calendar';
import Stepper from '../../Component/Stepper/stepper';
import BreadCrumbs from '../../Component/Breadcrumb/breadcrumb';
import Heading from '../../Component/Heading/heading';
import DataCard from '../../Component/Card/card';
import ButtonBar from '../../Component/ButtonBar/buttonbar';
import '../StepPages/stepPage.scss';
import { useHistory } from 'react-router';
import Updated from '../../Component/popup/updated';
import Accepted from '../../Component/popup/accepted';

const BookAppointment = () => {
    const [msg,setMsg] =React.useState(null);
    const [open, setOpen] =React.useState(false);
    const [success,setSuccess] =React.useState(false);
    const [data, setData] = React.useState(null);
    const history = useHistory();
    if (!localStorage.getItem("token") && !localStorage.getItem("id"))
        history.push("/login");
        window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });
    const [date, setDate] = React.useState(new Date());
    let jsonData;
    const requestId=localStorage.getItem("applicationId");
    const url = `${process.env.REACT_APP_BASE_URL}/service/appointment/${requestId}`
    const onDateChange =async date => {
        let dates = date.toString();
        dates = dates.split(" ")
        setOpen(true)
        setMsg(`Are you sure you want to select ${dates[1]} ${dates[2]},${dates[3]} as your appointment`)

                
            jsonData = {
                "day": dates[0],
                "date": dates[2],
                "month": dates[1],
                "year": dates[3]
            }
            setData(jsonData)

            
       
        
    }

    const submitForm= async()=>{
        const result = await(await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })).json();
        if(result.status===1){
            setMsg("Your appointment date has been booked")
            setSuccess(true)
            history.push("/payment");
         
        }
        
    }

    return (
        <main>
            <div className='book-section'>
                <BreadCrumbs section={[
                    { key: 'home', content: 'Home', link: true },
                    { key: 'apply', content: 'Apply Now', active: true }
                ]} />
                <Heading />
                <Grid columns='2' stackable='tablet' className='data'>
                    <Grid.Column width={11}>
                        <Container className="stepper-container">
                            <Stepper />
                            <Divider />
                            <div className="form">
                                <Grid stackable='tablet' centered>
                                    <Grid.Row>
                                        <Grid.Column className='date' width={6}>
                                            <label className='date-title'>Choose your preferred date</label>
                                            <Calendar
                                                onChange={onDateChange}
                                                value={date}
                                                showNeighboringMonth={false}
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
            {/* <ButtonBar /> */}
            <Updated open={success} msg={msg} onClose={()=>setOpen(false)}/>
            <Accepted open={open} msg={msg} onClose={()=>setOpen(false)} onSubmit={()=>submitForm()}/>
        </main>
    )
}
export default BookAppointment;
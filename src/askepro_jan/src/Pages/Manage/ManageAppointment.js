import React from 'react';
import { Container, Breadcrumb,Dimmer,Loader, Pagination, Table } from 'semantic-ui-react';
import BreadCrumbs from '../../Component/Breadcrumb/breadcrumb';
import StatusChip from '../../Component/StatusChip/StatusChip';
import SideBar from '../../Component/Nav/Sidebar';
import Reject from "../../Component/Main-Component/Reject";
import Accept from "../../Component/Main-Component/Accept";
import './manage.scss';
import { useHistory } from 'react-router';

const ManageAppointments = ({title}) =>{
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
  history.push("/login");
  const [appointment, setAppointment] = React.useState(null);
    React.useEffect(() => {
        getappointment();
    }, []);

    const getappointment = async () => {
      let id = localStorage.getItem("id");
      let user = await (
        await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
      ).json();
      user = user.data;
  
      if (!user.isAdmin) {
        history.push('/')
      }
        const appointment = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/appointment`, { method: "GET"})).json();
       
        setAppointment(appointment);
    }
    
    const pageClick = async (p) => {
      if(Number.isNaN(p) || p===0 || p < 0|| p===appointment.totalPages+1 || p>appointment.totalPages+1 || appointment.totalPages===1 )
      return;
      const app= await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/appointment?page=${p}`, { method: "GET"})).json();
      setAppointment(app);
    };
    
    if(!appointment)
    {return (<div> <Dimmer active>
      <Loader size='large'>Loading</Loader>
    </Dimmer></div>)}

        return (
          
          <main className='manage-main'>
            <SideBar value='appointment' active='active'/>
            <div className='table-container'>
            <Breadcrumb>
                <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                Manage Appointments
                </Breadcrumb.Section>
              </Breadcrumb> 
            <div className='manage-container'>
            <h2>{title}</h2>
            <Container fluid>
          <Table striped stackable='tablet'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Client Id</Table.HeaderCell>
        <Table.HeaderCell>Client Name</Table.HeaderCell>
        <Table.HeaderCell>Email Id</Table.HeaderCell>
        <Table.HeaderCell>Phone No.</Table.HeaderCell>
        <Table.HeaderCell>Service Name</Table.HeaderCell>
        <Table.HeaderCell>Appointment Date</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {appointment.data&&appointment.data.map((ele) =>  <Table.Row>
        <Table.Cell>{ele.users._id}</Table.Cell>
        <Table.Cell>{ele.users.name}</Table.Cell>
        <Table.Cell>{ele.users.email}</Table.Cell>
        <Table.Cell>{ele.users.phone}</Table.Cell>
        <Table.Cell>{ele.serviceCategory.name}</Table.Cell>
        <Table.Cell>{ele.appt_date} {ele.appt_month} {ele.appt_year}</Table.Cell>
        <Table.Cell className='action'>
        <Accept id={ele._id} name={ele.users.name} />    
        <Reject id={ele._id} />
        </Table.Cell>
      </Table.Row>)}
        
    </Table.Body>
 </Table>
</Container>
<div className='pagination-container'>
<label className='page-name'>Showing {(appointment.currentPage * appointment.data.length % 10 === 0 && appointment.currentPage * appointment.data.length % 100 !== 0? appointment.currentPage * appointment.data.length : (appointment.currentPage - 1) * 10 + appointment.data.length)} of  {appointment.count}</label>
<Pagination
    size='small'
    defaultActivePage={appointment.currentPage}
    firstItem={null}
    lastItem={null}
    prevItem={{ content: <label className='next' onClick={() => pageClick(appointment.currentPage-1)}>PREV</label>}}
    nextItem={{ content: <label className='prev' onClick={() => pageClick(appointment.currentPage+1)}>NEXT</label>}}
    totalPages={appointment.totalPages}
    onClick={e => pageClick(parseInt(e.target.innerText))}
  />
 </div>

 </div>
 </div>
 </main>
   
 
        )
}

export default ManageAppointments;
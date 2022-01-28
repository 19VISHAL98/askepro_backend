import React from 'react';
import { Container, Loader, Dimmer, Breadcrumb, Pagination, Table } from 'semantic-ui-react';
import BreadCrumbs from '../../Component/Breadcrumb/breadcrumb';
import StatusChip from '../../Component/StatusChip/StatusChip';
import SideBar from '../../Component/Nav/Sidebar'
import './manage.scss';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ManageApplication = ({title}) =>{
  const history = useHistory();
    if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
  
  const [application, setApplication] = React.useState(null);
    React.useEffect(() => {
        getapplication();
    }, []);

    const getapplication = async () => {
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
        const application = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/application`, { method: "GET"})).json();
       
        setApplication(application);
    }
    
    const pageClick = async (p) => {
      if(Number.isNaN(p) || p===0 || p < 0|| p===application.totalPages+1 || p>application.totalPages+1 || application.totalPages===1 )
      return;
      const app = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/application?page=${p}`, { method: "GET"})).json();
      setApplication(app);

    };
    console.log(application)
    if(!application)
    {return (<div> <Dimmer active>
      <Loader size='large'>Loading</Loader>
    </Dimmer></div>)}
        return (
          
          <main className='manage-main'>
            <SideBar  value='application' active='active'/>
            <div className='table-container'>
            <Breadcrumb>
                <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                Manage applications
                </Breadcrumb.Section>
              </Breadcrumb> 
            <div className='manage-container'>
            <h2>{title}</h2>
            <Container fluid>
          <Table striped stackable='tablet'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Service Id</Table.HeaderCell>
        <Table.HeaderCell>Service name</Table.HeaderCell>
        <Table.HeaderCell>Transaction Id</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Mode</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Amount(AED)</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {application.data&&application.data.map((ele) => <Table.Row>
        <Table.Cell>{moment(ele.createdAt).format('ll')}</Table.Cell>
        <Table.Cell>{ele.serviceCategory.name}</Table.Cell>
        <Table.Cell>{ele.serviceCategory.scode}</Table.Cell>
        <Table.Cell>{ele.transaction&&ele.transaction._id}</Table.Cell>
        <Table.Cell><StatusChip value={ele.status}/></Table.Cell>
        <Table.Cell>{ele.transaction&&ele.transaction.ptype}</Table.Cell>
        <Table.Cell textAlign='right'>{ele.transaction&&ele.transaction.amount}</Table.Cell>
       <Link to={`/application/${ele._id}`}> <Table.Cell className='view' textAlign='right'>View Details</Table.Cell></Link>
      </Table.Row>)}
      
    </Table.Body>
 </Table>
</Container>
<div className='pagination-container'>
<label className='page-name'>Showing {(application.currentPage * application.data.length % 10 === 0 && application.currentPage * application.data.length % 100 !== 0? application.currentPage * application.data.length : (application.currentPage - 1) * 10 + application.data.length)} of  {application.count}</label>
<Pagination
    size='small'
    defaultActivePage={application.currentPage}
    firstItem={null}
    lastItem={null}
    prevItem={{ content: <label className='next' onClick={() => pageClick(parseInt(application.currentPage)-1)}>PREV</label>}}
    nextItem={{ content: <label className='prev' onClick={() => pageClick(parseInt(application.currentPage)+1)}>NEXT</label>}}
    totalPages={application.totalPages}
    onClick={e => pageClick(parseInt(e.target.innerText))}
  />
 </div>
 </div>
 </div>
 </main>
        )
}

export default ManageApplication;
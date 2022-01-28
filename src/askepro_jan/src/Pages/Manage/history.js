import React from 'react';
import { Container, Icon,Dimmer,Loader, Pagination, Table, Label, Button, Breadcrumb } from 'semantic-ui-react';
import BreadCrumbs from '../../Component/Breadcrumb/breadcrumb';
import StatusChip from '../../Component/StatusChip/StatusChip';
import './manage.scss';
import { useHistory } from 'react-router';

const History = ({ title, key }) => {
  const history = useHistory(); const [application, setApplication] = React.useState(null);

  React.useEffect(() => { getApplication() }, []);
  let id = localStorage.getItem('id');
  const getApplication = async () => {
    if (!localStorage.getItem("token") && !localStorage.getItem("id")) { history.push("/login"); }
    else {
      let application = await (
        await fetch(
          `${process.env.REACT_APP_BASE_URL}/service/application/${id}`,
          {
            method: "GET",
            headers: {
              "x-access-token": localStorage.getItem("token"),
            }

          })).json();

      setApplication(application || <div>   <Dimmer active>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
</div>);
    }
  }
  const handleClick = async (status, id, slug) => {
    localStorage.setItem("applicationId", id);
    localStorage.setItem("serviceSlug", slug);
    if (status === "Type Pending")
      history.push('/type');
    else if (status === "Mode Pending")
      history.push('/mode');
    else if (status === "Details Pending")
      history.push('/fill');
    else if (status === "Upload Pending")
      history.push('/upload');
    else if (status === "Appointment Pending")
      history.push('/book');
    else if (status === "Payment Pending")
      history.push('/payment');
    else
      alert("Please apply for a new application")
  };
  const pageClick = async (p) => {
    console.log(p)
    const application = await (await fetch(`${process.env.REACT_APP_BASE_URL}/service/application/${id}?page=${p}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })).json();

    setApplication(application || []);
  };
  if (!application) {
    return (<div> <Dimmer active>
      <Loader size='large'>Loading</Loader>
    </Dimmer></div>);
  }
  console.log(application);
  function dateFormat(d) {
    const date = new Date(d);
    return `${date.toLocaleString()}`
  };

  return (
    <main className='manage-main'>
      <div className='history-main'>
      <Breadcrumb>
                <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
               Application History
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
                  <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                  <Table.HeaderCell ></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                </Table.Row>
                {application.data && application.data.map((ele) => <Table.Row>
                  <Table.Cell>{new Date(ele.createdAt).toLocaleString()}</Table.Cell>
                  <Table.Cell>{ele.serviceCategory.scode}</Table.Cell>
                  <Table.Cell>{ele.serviceCategory.name}</Table.Cell>
                  <Table.Cell>{ele.transaction && ele.transaction._id}</Table.Cell>
                  <Table.Cell><StatusChip value={ele.status} /></Table.Cell>
                  <Table.Cell>{ele.transaction && ele.transaction.ptype}</Table.Cell>
                  <Table.Cell textAlign='right'>{ele.transaction && ele.transaction.amount}</Table.Cell>
                  <Table.Cell className='view' style={{ cursor: 'pointer' }} textAlign='right' onClick={() => history.push(`/view/${ele._id}`)}>View Details</Table.Cell>
                  <Table.Cell className='view' style={{ cursor: 'pointer' }} textAlign='right' onClick={() => handleClick(ele.status, ele._id, ele.serviceCategory.slug)}>Resume</Table.Cell>

                </Table.Row>)}
              </Table.Body>
            </Table>
          </Container>
          <div className='pagination-container'>
            <label className='page-name'>Showing {(application.currentPage * application.data.length % 10 === 0 && application.currentPage * application.data.length % 100 !== 0 ? application.currentPage * application.data.length : (application.currentPage - 1) * 10 + application.data.length)} of  {application.count}</label>
            <Pagination
              size='small'
              defaultActivePage={application.currentPage}
              // firstItem={null}
              // lastItem={null}
              prevItem={{ content: <label className='next' onClick={e=>pageClick(--application.currentPage)}>PREV</label> }}
              nextItem={{ content: <label className='prev' onClick={e=>pageClick(++application.currentPage)}>NEXT</label> }}
              totalPages={application.totalPages}
              onClick={e => pageClick(parseInt(e.target.innerText))}
            />
          </div>

        </div>
      </div>
    </main>
  )
}

export default History;
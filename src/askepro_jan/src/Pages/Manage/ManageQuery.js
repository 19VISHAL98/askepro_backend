import React from 'react';
import { Container, Icon, Dropdown, Breadcrumb, Pagination, Table, Label, Sidebar, Button, StepGroup, Loader, Dimmer } from 'semantic-ui-react';
import BreadCrumbs from '../../Component/Breadcrumb/breadcrumb';
import StatusChip from '../../Component/StatusChip/StatusChip';
import SideBar from '../../Component/Nav/Sidebar'
import './manage.scss';
import { useHistory } from 'react-router';
import Updated from '../../Component/popup/updated';
import moment from 'moment';

const ManageQuery = ({ title }) => {
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
  const [query, setquery] = React.useState(null);
  const [status, setStatus] = React.useState("Open");
  const [pop, setPop]= React.useState(false);
const [msg, setMsg]= React.useState();
  React.useEffect(() => {
    getquery();
  }, []);

  const getquery = async (status) => {
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
    if (!status) {
      status = "Open";
    }
    const query = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/query?status=${status}`, {
      method: "GET", headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })).json();
    setquery(query);
  }

  const pageClick = async (p) => {

    if(Number.isNaN(p) || p===0 || p < 0|| p===query.totalPages+1 || p>query.totalPages+1 || query.totalPages===1 )
    return;
    const q = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/query?page=${p}&status=${status}`, {
      method: "GET", headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })).json();

    setquery(q);
  };

  const statusChange = async (id) => {

    const query = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/query/${id}`, {
      method: "PUT", headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })).json();
    if (query.status === 1) {
      setMsg(query.msg);
      setPop(true);
      getquery();
    }
  }

  if (!query) {
    return (<div> <Dimmer active>
      <Loader size='large'>Loading</Loader>
    </Dimmer></div>)
  }
  return (
    <main className='manage-main'>
      <SideBar value='query' active='active' />
      <div className='table-container'>
      <Breadcrumb>
                <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                Manage Query
                </Breadcrumb.Section>
              </Breadcrumb> 
        <div className='manage-container'>
          <h2>{title}</h2>
          <Container fluid>
            <Table striped stackable='tablet'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Query</Table.HeaderCell>
                  <Table.HeaderCell>
                    <Dropdown text='Status' scrolling='true'>
                      <Dropdown.Menu >
                        <Dropdown.Item text='Open' onClick={() => { getquery('Open'); setStatus("Open") }} />
                        <Dropdown.Item text='Resolved' onClick={() => { getquery('Resolved'); setStatus("Resolved") }} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.HeaderCell>
                  {status === "Open" ? <Table.HeaderCell>Actions</Table.HeaderCell> : <Table.Cell></Table.Cell>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {query.data && query.data.map((ele) => <Table.Row>
                  <Table.Cell>{moment(ele.createdAt).format('ll')}</Table.Cell>
                  <Table.Cell>{ele.name}</Table.Cell>
                  <Table.Cell>{ele.email}</Table.Cell>
                  <Table.Cell>{ele.query}</Table.Cell>
                  <Table.Cell>{ele.status}</Table.Cell>
                  {status === "Open" ? <Table.Cell><Button inverted color='green' onClick={() => statusChange(ele._id)}>Mark As Resolved</Button></Table.Cell> : <Table.Cell></Table.Cell>}
                </Table.Row>)}
              </Table.Body>
            </Table>


          </Container>
          <div className='pagination-container'>
          <label className='page-name'>Showing {(query.currentPage * query.data.length % 10 === 0 && query.currentPage * query.data.length % 100 !== 0? query.currentPage * query.data.length : (query.currentPage - 1) * 10 + query.data.length)} of  {query.count}</label>
            <Pagination
              size='small'
              defaultActivePage={query.currentPage}
              firstItem={null}
              lastItem={null}
              prevItem={{ content: <label className='next' onClick={() => pageClick(query.currentPage-1)}>PREV</label> }}
              nextItem={{ content: <label className='prev' onClick={() => pageClick(query.currentPage+1)}>NEXT</label> }}
              totalPages={query.totalPages}
              onClick={e => pageClick(parseInt(e.target.innerText))}
            />
          </div>
        </div>
      </div>
      
      <Updated open={pop} msg={msg} onClose={() => setPop(false)} />
    </main>
  )
}

export default ManageQuery;
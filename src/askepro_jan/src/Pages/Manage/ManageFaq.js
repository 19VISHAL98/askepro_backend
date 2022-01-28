import React from "react";
import {
  Container,
  Icon,
  Pagination,
  Table,
  Label,
  Sidebar,
  Grid,
  Form,
  Button,
  Input,
  TextArea,
  Loader,
  Dimmer,
} from "semantic-ui-react";

import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import StatusChip from "../../Component/StatusChip/StatusChip";
import SideBar from "../../Component/Nav/Sidebar";
import "./manage.scss";
import FAQ_modal from "../../Component/Main-Component/FAQ_modal";
import FAQ_modal_edit from "../../Component/Main-Component/FAQ_modal_Edit"
import FAQ_Modal_Edit from "../../Component/Main-Component/FAQ_modal_Edit";
import { useHistory } from "react-router";
import Updated from "../../Component/popup/updated";
import Accepted from "../../Component/popup/accepted";
import moment from "moment";

const ManageFaq = ({ title }) => {
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
  history.push("/login");
  const [faqs, setfaq] = React.useState(null);
  const [pop, setPop]= React.useState(false);
  const [msg, setMsg]= React.useState();
  const [delPopup, SetDelPopup] = React.useState(false);
  const [delId, setDelId] = React.useState(null);
  

  React.useEffect(() => {
    getfaqs();
  }, []);

  const getfaqs = async () => {
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
    const faq = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/faq`, { method: "GET" })
    ).json();

    setfaq(faq);
  };

  const pageClick = async (p) => {
    if(Number.isNaN(p) || p===0 || p < 0|| p===faqs.totalPages+1 || p>faqs.totalPages+1 || faqs.totalPages===1 )
    return;
    
    const f = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/faq?page=${p}`, {
        method: "GET",
      })
    ).json();
    setfaq(f);
  };

  
  const deleteFaq = async (id) => {
    const url = `${process.env.REACT_APP_BASE_URL}/admin/faq/${id}`;
    const result = await (
      await fetch(url, {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();

    if (result.status === 1) {
      setMsg(result.msg);
      setPop(true);
      getfaqs();
    }
  };
  if (!faqs) {
    return <> <Dimmer active>
    <Loader size='large'>Loading</Loader>
  </Dimmer></>;
  }

  return (
    <main className="manage-main">
      <SideBar value="faq" active="active" />
      <div className="table-container">
        <BreadCrumbs
          section={[
            { key: "dash", content: "Dashboard", link: true },
            { key: "history", content: "Manage Faq", active: true },
          ]}
        />
        <div className="manage-container">
            <div className="manage_heading">
            <Grid>
             
                <Grid.Column width={2}>
          <h2>{title}</h2>
          </Grid.Column>
          <Grid.Column floated='right' width={1}>
          <FAQ_modal/>
          </Grid.Column>
       
          </Grid>
          </div>
          <Container fluid>
            <Table striped stackable="tablet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Question</Table.HeaderCell>
                  <Table.HeaderCell>Answer</Table.HeaderCell>
                  <Table.HeaderCell >Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {faqs.data &&
                  faqs.data.map((ele) => (
                    <Table.Row>
                      <Table.Cell>
                        {moment(ele.createdAt).format('ll')}
                        
                      </Table.Cell>                 
                      <Table.Cell>{ele.title}</Table.Cell>
                      <Table.Cell>{ele.description}</Table.Cell>
                      <Table.Cell>
                        {" "}
                        <FAQ_Modal_Edit fid={(ele._id)} ques={(ele.title)} ans={(ele.description)}/>
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/trash.png"
                          }
                          style={{ marginLeft: "30px" }}
                          className="btn-upload"
                          onClick={() => {
                            SetDelPopup(true);
                            setDelId(ele._id);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Container>
          <div className="pagination-container">
          <label className='page-name'>Showing {(faqs.currentPage * faqs.data.length % 10 === 0 && faqs.currentPage * faqs.data.length % 100 !== 0? faqs.currentPage * faqs.data.length : (faqs.currentPage - 1) * 10 + faqs.data.length)} of  {faqs.count}</label>
            <Pagination
              size="small"
              defaultActivePage={faqs.currentPage}
              firstItem={null}
              lastItem={null}
              prevItem={{
                content: (
                  <label
                    className="next"
                    onClick={() => pageClick(faqs.currentPage-1)}
                  >
                    PREV
                  </label>
                ),
              }}
              nextItem={{
                content: (
                  <label
                    className="prev"
                    onClick={() => pageClick(faqs.currentPage+1)}
                  >
                    NEXT
                  </label>
                ),
              }}
              totalPages={faqs.totalPages}
              onClick={(e) => pageClick(parseInt(e.target.innerText))}
            />
          </div>
        </div>
      </div>
      <Accepted
        open={delPopup}
        check={true}
        msg={"Are you sure that you want to delete the faq?"}
        onClose={() => SetDelPopup(false)}
        onSubmit={() => {deleteFaq(delId); SetDelPopup(false);} }
      />
      <Updated open={pop} msg={msg} onClose={() => setPop(false)} />
    </main>
  );
};

export default ManageFaq;

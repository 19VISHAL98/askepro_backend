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
  Dimmer,
  Loader,
  Button,
  Input,
  TextArea,
} from "semantic-ui-react";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import StatusChip from "../../Component/StatusChip/StatusChip";
import SideBar from "../../Component/Nav/Sidebar";
import "./manage.scss";
import moment from "moment";

// import Offer_modal_edit from "../../Component/Main-Component/offer_modal_Edit"
// import Offer_Modal_Edit from "../../Component/Main-Component/offer_modal_Edit";
import { useHistory } from "react-router";
import Offer_modal from "../../Component/Main-Component/Offer_Modal";
import Offer_image_modal from "../../Component/Main-Component/Offer_image";
import Updated from "../../Component/popup/updated";
import Accepted from "../../Component/popup/accepted";


const ManageOffer = ({ title }) => {
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
  history.push("/login");
  const [offers, setOffer] = React.useState(null);  
  const [pop, setPop]= React.useState(false);
  const [msg, setMsg]= React.useState();
  const [delPopup, SetDelPopup] = React.useState(false);
  const [delId, setDelId] = React.useState(null);
 
  React.useEffect(() => {
    getoffers();
  }, []);

  const getoffers = async () => {
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
    const offer = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/offer`, { method: "GET" })
    ).json();

    setOffer(offer);
  };

  const pageClick = async (p) => {
    const offer = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/offer?page=${p}`, {
        method: "GET",
      })
    ).json();
    setOffer(offer);
  };

  
  const deleteoffer = async (id) => {
    const url = `${process.env.REACT_APP_BASE_URL}/admin/offer/${id}`;
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
      getoffers();

    }
  };
  const refresh=()=>{
    setMsg("Offer Added");
      setPop(true);
      getoffers();
  }
  if (!offers) {
    return <div> <Dimmer active>
    <Loader size='large'>Loading</Loader>
  </Dimmer></div>;
  }

  return (
    <main className="manage-main">
      <SideBar value="offer" active="active" />
      <div className="table-container">
        <BreadCrumbs
          section={[
            { key: "dash", content: "Dashboard", link: true },
            { key: "history", content: "Manage offer", active: true },
          ]}
        />
        <div className="manage-container">
            <div className="manage_heading">
            <Grid>
             
                <Grid.Column width={2}>
          <h2>{title}</h2>
          </Grid.Column>
          <Grid.Column floated='right' width={1}>
         <Offer_modal refresh={refresh}/>
          </Grid.Column>
       
          </Grid>
          </div>
          <Container fluid>
            <Table striped stackable="tablet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell >Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {offers.data &&
                  offers.data.map((ele) => (
                    <Table.Row>
                      <Table.Cell>
                        
                        {moment(ele.createdAt).format('ll')}

                      </Table.Cell>                 
                      <Table.Cell>{ele.name}</Table.Cell>
                      {/* <Table.Cell>{ele.data}</Table.Cell> */}
                      <Table.Cell>
                        {" "}
                        <Offer_image_modal img={ele.data}/>
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/trash.png"
                          }
                          style={{ marginLeft: "30px" ,cursor: "pointer"}}
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
          <label className='page-name'>Showing {(offers.currentPage * offers.data.length % 10 === 0 && offers.currentPage * offers.data.length % 100 !== 0? offers.currentPage * offers.data.length : (offers.currentPage - 1) * 10 + offers.data.length)} of  {offers.count}</label>
            <Pagination
              size="small"
              defaultActivePage={offers.currentPage}
              firstItem={null}
              lastItem={null}
              prevItem={{
                content: (
                  <label
                    className="next"
                    onClick={() => pageClick(offers.currentPage-1)}
                  >
                    PREV
                  </label>
                ),
              }}
              nextItem={{
                content: (
                  <label
                    className="prev"
                    onClick={() => pageClick(offers.currentPage+1)}
                  >
                    NEXT
                  </label>
                ),
              }}
              totalPages={offers.totalPages}
              onClick={(e) => pageClick(parseInt(e.target.innerText))}
            />
          </div>
        </div>
      </div>
      <Accepted
        open={delPopup}
        check={true}
        msg={"Are you sure that you want to delete the offer?"}
        onClose={() => SetDelPopup(false)}
        onSubmit={() => {deleteoffer(delId); SetDelPopup(false);} }
      />
      <Updated open={pop} msg={msg} onClose={() => setPop(false)} />
    </main>
  );
};

export default ManageOffer;

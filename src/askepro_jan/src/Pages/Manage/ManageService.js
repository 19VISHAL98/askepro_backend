import React from "react";
import {
  Container,
  Pagination,
  Table,
  Grid,
  Breadcrumb,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import StatusChip from "../../Component/StatusChip/StatusChip";
import SideBar from "../../Component/Nav/Sidebar";
import "./manage.scss";
import Service_modal from "../../Component/Main-Component/Add_service_modal";
import Edit_Modal from "../../Component/Main-Component/Edit_service_modal";
import { useHistory } from "react-router";
import Updated from "../../Component/popup/updated";
import Accepted from "../../Component/popup/accepted";
import moment from "moment";

const ManageService = ({ title }) => {
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
  const [pop, setPop] = React.useState(false);
  const [delPopup, SetDelPopup] = React.useState(false);
  const [msg, setMsg] = React.useState();
  const [delId, setDelId] = React.useState(null);
  const [service, setservice] = React.useState(null);
  React.useEffect(() => {
    getservice();
  }, []);

  const getservice = async () => {
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
      history.push("/");
    }
    const service = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/services`, {
        method: "GET",
      })
    ).json();

    setservice(service);
  };
  const deleteService = async (id) => {
    const url = `${process.env.REACT_APP_BASE_URL}/admin/services/${id}`;
    const result = await (
      await fetch(url, {
        method: "DELETE",
      })
    ).json();

    if (result.status === 1) {
      setMsg(result.msg);
      setPop(true);
      getservice();
    }
  };

  const refresh = (msg) => {
    setMsg(msg);
    setPop(true);
    getservice();
  };
  const pageClick = async (p) => {
    if (
      Number.isNaN(p) ||
      p === 0 ||
      p < 0 ||
      p === service.totalPages + 1 ||
      p > service.totalPages + 1 ||
      service.totalPages === 1
    )
      return;
    const services = await (
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/services?page=${p}`,
        { method: "GET" }
      )
    ).json();

    setservice(services);
  };

  if (!service) {
    return <div> <Dimmer active>
    <Loader size='large'>Loading</Loader>
  </Dimmer></div>;
  }
  const msg2 = "Are you sure you want to logout?";
  return (
    <main className="manage-main">
      <SideBar value="service" active="active" />
      <div className="table-container">
        <Breadcrumb>
          <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Manage Service</Breadcrumb.Section>
        </Breadcrumb>
        <div className="manage-container">
          <div className="manage_heading">
            <Grid>
              <Grid.Column width={2}>
                <h2>{title}</h2>
              </Grid.Column>
              <Grid.Column floated="right" width={1}>
                <Service_modal refresh={() => refresh("New Service Added")} />
              </Grid.Column>
            </Grid>
          </div>
          <Container fluid>
            <Table striped stackable="tablet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Service Id</Table.HeaderCell>
                  <Table.HeaderCell>Service name</Table.HeaderCell>
                  {/* <Table.HeaderCell>Total Fees</Table.HeaderCell>
                  <Table.HeaderCell>Processing Time</Table.HeaderCell>
                  <Table.HeaderCell>Stay Period</Table.HeaderCell>
                  <Table.HeaderCell >Validity</Table.HeaderCell> */}
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {service.data &&
                  service.data.map((ele) => (
                    <Table.Row>
                      <Table.Cell>
                        {moment(ele.createdAt).format('ll')}
                      </Table.Cell>
                      <Table.Cell>{ele.scode}</Table.Cell>
                      <Table.Cell>{ele.name}</Table.Cell>
                      {/* <Table.Cell>{ele.serviceDetail.price}</Table.Cell>
                  <Table.Cell>{ele.serviceDetail.processT} Days</Table.Cell>
                  <Table.Cell>{ele.serviceDetail.stayPeriod} Days</Table.Cell>
                  <Table.Cell>{ele.serviceDetail.validity} Days </Table.Cell> */}
                      <Table.Cell>
                        <Edit_Modal
                          id={ele._id}
                          refresh={() => refresh("Service Updated")}
                        />
                        <img
                          src={
                            process.env.PUBLIC_URL + "/Assets/images/trash.png"
                          }
                          style={{ marginLeft: "30px" }}
                          className="btn-upload"
                          onClick={() => {
                            SetDelPopup(true);
                            setDelId(ele._id);
                          }} /* deleteService(ele._id)} */
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Container>
          <div className="pagination-container">
            <label className="page-name">
              Showing{" "}
              {(service.currentPage * service.data.length) % 10 === 0 &&
              (service.currentPage * service.data.length) % 100 !== 0
                ? service.currentPage * service.data.length
                : (service.currentPage - 1) * 10 + service.data.length}{" "}
              of {service.count}
            </label>
            <Pagination
              size="small"
              defaultActivePage={service.currentPage}
              firstItem={null}
              lastItem={null}
              prevItem={{
                content: (
                  <label
                    className="next"
                    onClick={() => pageClick(service.currentPage - 1)}
                  >
                    PREV
                  </label>
                ),
              }}
              nextItem={{
                content: (
                  <label
                    className="prev"
                    onClick={() => pageClick(service.currentPage + 1)}
                  >
                    NEXT
                  </label>
                ),
              }}
              totalPages={service.totalPages}
              onClick={(e) => pageClick(parseInt(e.target.innerText))}
            />
          </div>
        </div>
      </div>
      <Accepted
        open={delPopup}
        check={true}
        msg={"Are you sure that you want to delete this service?"}
        onClose={() => SetDelPopup(false)}
        onSubmit={() => {deleteService(delId); SetDelPopup(false);} }
      />
      <Updated open={pop} msg={msg} onClose={() => setPop(false)} />
    </main>
  );
};

export default ManageService;

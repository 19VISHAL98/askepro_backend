import React from "react";
import { Container, Pagination, Table, Breadcrumb, Dimmer, Loader } from "semantic-ui-react";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import StatusChip from "../../Component/StatusChip/StatusChip";
import SideBar from "../../Component/Nav/Sidebar";
import "./manage.scss";
import { useHistory } from "react-router";
import moment from "moment";

const ManagePayments = ({ title }) => {
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
  const [payment, setpayment] = React.useState(null);
  React.useEffect(() => {
    getpayment();
  }, []);

  const getpayment = async () => {
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
    const payment = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/payment`, {
        method: "GET",
      })
    ).json();

    setpayment(payment);
  };
  const pageClick = async (p) => {
    if(Number.isNaN(p) || p===0 || p < 0|| p===payment.totalPages+1 || p>payment.totalPages+1 || payment.totalPages===1 )
    return;
    const pay = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/payment?page=${p}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();

    setpayment(pay);
  };
  if (!payment) {
    return <> <Dimmer active>
    <Loader size='large'>Loading</Loader>
  </Dimmer></>;
  }
  console.log(payment);
  return (
    <main className="manage-main">
      <SideBar value="payment" active="active" />
      <div className="table-container">
        <Breadcrumb>
          <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Manage Payment</Breadcrumb.Section>
        </Breadcrumb>
        <div className="manage-container">
          <h2>{title}</h2>
          <Container fluid>
            <Table striped stackable="tablet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Transaction Id</Table.HeaderCell>
                  <Table.HeaderCell>Service Id</Table.HeaderCell>
                  <Table.HeaderCell>Service name</Table.HeaderCell>
                  <Table.HeaderCell>Client Name</Table.HeaderCell>
                  <Table.HeaderCell>Mode of Payment</Table.HeaderCell>
                  <Table.HeaderCell>Amount(AED)</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {payment.data &&
                  payment.data.map((ele) => (
                    <Table.Row>
                      <Table.Cell>
                        
                        {moment(ele.createdAt).format('ll')}
                      </Table.Cell>
                      <Table.Cell>{ele.transaction._id}</Table.Cell>
                      <Table.Cell>{ele.serviceCategory._id}</Table.Cell>
                      <Table.Cell>{ele.serviceCategory.name}</Table.Cell>
                      <Table.Cell>{ele.name}</Table.Cell>
                      <Table.Cell>{ele.transaction.ptype}</Table.Cell>
                      <Table.Cell>{ele.transaction.amount}</Table.Cell>
                      <Table.Cell>
                        <StatusChip value={ele.transaction.status} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Container>
          <div className="pagination-container">
            <label className="page-name">
              Showing{" "}
              {(payment.currentPage * payment.data.length) % 10 === 0 &&
              (payment.currentPage * payment.data.length) % 100 !== 0
                ? payment.currentPage * payment.data.length
                : (payment.currentPage - 1) * 10 + payment.data.length}{" "}
              of {payment.count}
            </label>
            <Pagination
              size="small"
              defaultActivePage={payment.currentPage}
              firstItem={null}
              lastItem={null}
              prevItem={{ content: <label className='next' onClick={() => pageClick(payment.currentPage-1)}>PREV</label> }}
              nextItem={{ content: <label className='prev' onClick={() => pageClick(payment.currentPage+1)}>NEXT</label> }}
              totalPages={payment.totalPages}
              onClick={(e) => pageClick(parseInt(e.target.innerText))}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManagePayments;

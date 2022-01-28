import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Segment,
  Table,
  Menu,
  Dropdown,
  Icon,
  Button,
  Container,
  Input,
  Breadcrumb
} from "semantic-ui-react";
import StatusChip from "../../Component/Main-Component/StatusChip";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import { getData } from "../../services/api";
import "../../Sass/Sass-Main/_About.scss";
import Edit_user from "../../Component/Main-Component/Edit_user";
import { useRef } from "react";
import Updated from "../../Component/popup/updated";

const Account = () => {
  const history = useHistory();
  const fileref = useRef();
  const [user, setUser] = React.useState(null);
  const [appointment, setAppointment] = React.useState(null);
  const [application, setApplication] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [pop, setPop] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  React.useEffect(() => {
    getUser();
  }, []);
  let id = localStorage.getItem("id");
  const getUser = async () => {
    if (!localStorage.getItem("token") && !localStorage.getItem("id")) {
      history.push("/login");
    } else {
      let application = await (
        await fetch(
          `${process.env.REACT_APP_BASE_URL}/service/application/${id}?limit=5`,
          {
            method: "GET",
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
      ).json();

      let appointment = await (
        await fetch(
          `${process.env.REACT_APP_BASE_URL}/service/appointment/${id}?limit=5`,
          {
            method: "GET",
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
      ).json();

      let user = await (
        await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
      ).json();

      user = user.data;

      setUser(user || []);
      setApplication(application || []);
      setAppointment(appointment || []);
    }
  };
console.log(application);
  function dateFormat(d) {
    const date = new Date(d);
    return `${date.toLocaleString()}`;
  }
  const uploadWithFormData = async (event) => {
    const formData = new FormData();
    formData.append("upload", event.target.files[0]);

    const result = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/users/upload/${id}`, {
        method: "PUT",
        body: formData,
      })
    ).json();

    if (result.status === 1)
    {setMsg("Profile Photo Updated Successfully");
    setPop(true);
    getUser();}
  };
  if (!user || !appointment || !application) {
    return <div></div>;
  }
  return (
    <>

      <div className="account_breadcrumb">
      <Breadcrumb>
                <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
               My Account
                </Breadcrumb.Section>
              </Breadcrumb> 
      </div>
      <div className="account_wrapper">
        <Container fluid>
          <div className="account">
            <h4>Account Overview </h4>
          </div>

          <Grid doubling columns={2}>
            <Grid.Column width={11}>
              <Segment>
                <div className="my_user">
                  <div className="user_inner1">
                    <div className="round">
                      <Grid.Column floated="right" width={1}></Grid.Column>
                      <p>
                        <img
                          src={
                            user.profilePicture
                              ? "data:image/png;base64," + user.profilePicture
                              : process.env.PUBLIC_URL +
                                "Assets/images/team.png"
                          }
                        />
                        <br />

                        <div className="edit_profile">
                          <Dropdown item icon="pen square" simple>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => fileref.current.click()}
                              >
                                Upload Profile Picture
                              </Dropdown.Item>

                              <Dropdown.Item>
                                <Edit_user 
                                  id={user._id}
                                  name={user.name}
                                  phone={user.phone}
                                  addressLineOne={
                                    user.address && user.address.addressLineOne
                                  }
                                  addressLineTwo={
                                    user.address && user.address.addressLineTwo
                                  }
                                  city={user.address && user.address.city}
                                  state={user.address && user.address.state}
                                  pincode={user.address && user.address.pincode}
                                  country={user.address && user.address.country}
                                  doRefresh={()=>{setPop(true); 
                                    setMsg("Profile Updated");
                                  getUser()}}
                            
                                />
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <Menu.Menu position="right"></Menu.Menu>
                        <input
                          ref={fileref}
                          type="file"
                          hidden
                          onChange={(e) => uploadWithFormData(e)}
                        />
                      </p>
                    </div>
                  </div>{" "}
                  <div className="user_inner2">
                    <h6>Name</h6>
                    <p>{user.name}</p>
                    <br />
                    <h6>Phone Number</h6>
                    <p>{user.phone}</p>
                  </div>
                  <div className="user_inner3">
                    <h6>Email</h6>
                    <p>{user.email}</p>

                    <br />
                    <h6>Address</h6>
                    <p>
                      {user.address && user.address.addressLineOne} <br></br>
                      {user.address && user.address.addressLineTwo} <br></br>
                      {user.address && user.address.city}
                      <br></br>
                      {user.address && user.address.state}{" "}
                      {user.address && user.address.pincode} <br></br>
                      {user.address && user.address.country}
                    </p>
                  </div>
                </div>
              </Segment>
            </Grid.Column>

            <Grid.Column width={5}>
              <div className="account_carousel">
                <p className="carousel_p">
                  Total number of applications <br />
                  <span className="carousel_number">{application.count}</span>
                </p>
              </div>
            </Grid.Column>
          </Grid>

          <Grid doubling columns={2}>
            <Grid.Column width={11}>
              <div className="user_heading">
                <h4>Recent Applications </h4>
              </div>
              <div className="account_table">
                <Table striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Service id</Table.HeaderCell>
                      <Table.HeaderCell>Service Name</Table.HeaderCell>
                      <Table.HeaderCell>Transaction Id</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell>Mode</Table.HeaderCell>
                      <Table.HeaderCell textAlign="right">
                        Amount(AED)
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {application.data &&
                      application.data.map((ele) => (
                        <Table.Row>
                          <Table.Cell>
                            {new Date(ele.createdAt).toLocaleString()}
                          </Table.Cell>
                          <Table.Cell>{ele.serviceCategory.scode}</Table.Cell>
                          <Table.Cell>{ele.serviceCategory.name}</Table.Cell>
                          <Table.Cell>{ele.transaction&&ele.transaction._id }</Table.Cell>
                          <Table.Cell>
                            <StatusChip value={ele.status} />
                          </Table.Cell>
                          <Table.Cell>{ele.transaction&&ele.transaction.ptype}</Table.Cell>
                          <Table.Cell textAlign="right">{ele.transaction&&ele.transaction.amount}</Table.Cell>
                        </Table.Row>
                      ))}
                    {/*     <Table.Row>
                      <Table.Cell>22/01/2021</Table.Cell>
                      <Table.Cell>BJXCR34</Table.Cell>
                      <Table.Cell>Local Sponsorship Se…</Table.Cell>
                      <Table.Cell>XMBC3457XNT0</Table.Cell>
                      <Table.Cell><StatusChip value="Success" /></Table.Cell>
                      <Table.Cell>Debit Card</Table.Cell>
                      <Table.Cell textAlign='right'>4250.00</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>22/01/2021</Table.Cell>
                      <Table.Cell>BJXCR34</Table.Cell>
                      <Table.Cell>Office Arrangements</Table.Cell>
                      <Table.Cell>XMBC3457XNT0</Table.Cell>
                      <Table.Cell><StatusChip value="Success" /></Table.Cell>
                      <Table.Cell>Debit Card</Table.Cell>
                      <Table.Cell textAlign='right' >378.50</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>22/01/2021</Table.Cell>
                      <Table.Cell>BJXCR34</Table.Cell>
                      <Table.Cell>Tasheel Services</Table.Cell>
                      <Table.Cell>XMBC3457XNT0</Table.Cell>
                      <Table.Cell><StatusChip value="Success" /></Table.Cell>
                      <Table.Cell>Debit Card</Table.Cell>
                      <Table.Cell textAlign='right'> 269.00 </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>22/01/2021</Table.Cell>
                      <Table.Cell>BJXCR34</Table.Cell>
                      <Table.Cell>Company Stamp</Table.Cell>
                      <Table.Cell>XMBC3457XNT0</Table.Cell>
                      <Table.Cell><StatusChip value="Success" /></Table.Cell>
                      <Table.Cell>Debit Card</Table.Cell>
                      <Table.Cell textAlign='right'>350.00</Table.Cell>
                    </Table.Row>*/}
                  </Table.Body>
                </Table>
                <div className="accept_bottom">
                  <Link to="/history">
                    <button className="same-btn">VIEW ALL</button>
                  </Link>{" "}
                </div>
              </div>
              {/* <div className="history">
                <button type="button" className="account-btn">
                  <strong> VIEW ALL HISTORY </strong>
                </button>
              </div> */}
            </Grid.Column>
            <Grid.Column width={5}>
              <div className="user_heading">
                <h4>Appointments({appointment.count})</h4>
              </div>
              {/* <Segment className="appointment" style={{ marginTop: "0" }}> */}
                {appointment.data.map((ele) => (
                  <div className="appoint">
                    <div className="date">
                      <span className="number">{ele.appt_date}</span>
                      <span className="jan">
                        {ele.appt_month} {ele.appt_year}
                      </span>
                    </div>
                    <div className="upcoming">
                      <span className="done_info">{ele.status}</span>
                      <br />
                      <p>{ele.title}</p>
                      <span className="minute">{ele.time}</span>
                    </div>
                  </div>
                ))}
             {/*  </Segment> */}
              {/*  <Segment>
                <div className="appoint">
                  <div className="date">
                    <span className="number2">16</span>
                    <span className="nov">Nov 21</span>
                  </div>
                  <div className="upcoming">
                    <span className="first_info"> PAST Appointment</span>
                    <p>Appointment with AMER executive in Dubai Media City</p>
                    <span className="minute">11:00 - 12:00 </span>
                  </div>
                </div>
              </Segment>
              <Segment>
                <div className="appoint">
                  <div className="date">
                    <span className="number2">16</span>
                    <span className="nov">Nov 21</span>
                  </div>
                  <div className="upcoming">
                    <span className="first_info"> PAST Appointment</span>
                    <p>Appointment with AMER executive in Dubai Media City</p>
                    <span className="minute">11:00 - 12:00 </span>
                  </div>
                </div>
              </Segment> */
              /* <div className="circle_btn">
                
                <img src={process.env.PUBLIC_URL + 'Assets/images/arrow.png'} />
                <img src={process.env.PUBLIC_URL + 'Assets/images/arrowA.png'} />

           
              </div> */}
            </Grid.Column>
          </Grid>
        </Container>
        <Updated open={pop} msg={msg} onClose={() => setPop(false)} />
      </div>
    </>
  );
};

export default Account;

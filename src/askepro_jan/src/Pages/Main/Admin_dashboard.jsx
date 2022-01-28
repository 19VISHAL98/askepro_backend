import _ from "lodash";
import React from "react";
import Appointment_card from "../../Component/Main-Component/Appointment_card";
import Request_file from "../../Component/Main-Component/Request_file";
import "../../Sass/Sass-Main/_Admin_dashboard.scss";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import "../../Sass/Sass-Main/_Request_file.scss";
import SideBar from "../../Component/Nav/Sidebar";
import Reject from "../../Component/Main-Component/Reject";
import Accept from "../../Component/Main-Component/Accept";
import { Container, Grid, Icon, Dimmer, Loader } from "semantic-ui-react";
import Graph_div from '../../Component/Main-Component/Graph_div';
import "../../Sass/Sass-Main/_Appointment_card.scss";
import "../../Sass/Sass-Main/_Admin_dashboard.scss";
import Verification from "../../Component/Main-Component/Verification";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";

const Admin_dashboard = () => {
  const history = useHistory();
  if (!localStorage.getItem("token") && !localStorage.getItem("id"))
    history.push("/login");
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getData();
  }, []);
  let id = localStorage.getItem("id");
  const getData = async () => {
    let user = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();
    user = user.data;

    if (!user?.isAdmin) {
      history.push('/')
    }
    let result = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/dashboard`, {
        method: "GET",
      })
    ).json();
   
    setData(result);
  };
  if (!data) {
    return <div> <Dimmer active>
    <Loader size='large'>Loading</Loader>
  </Dimmer></div>;
  }
console.log(data);
  return (
    <main className="manage-main">
      <SideBar value="dashboard" active="active" />

      <div className="history-main">
        <BreadCrumbs
          section={[{ key: "dash", content: "Dashboard", link: true }]}
        />

        <div className="admin_wrapper2">  
          <Grid stackable columns={2}>
            <Grid.Column width={11}>
              <div className="overview5">
                <p>Overview</p>
              </div>
              <Grid doubling columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <div className="clients">
                      <h6>Total Clients</h6>
                      <h1>{data.clientCount}</h1>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="clients">
                      <h6>Total Applications</h6>
                      <h1>{data.applicationCount}</h1>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="clients">
                      <h6>Total Revenue(in AED)</h6>
                      <h1>{data.revenue}</h1>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid>  
                <Grid.Column>
                  <Graph_div data={data.graphData} />
            {/*   <div className="overview5">
                    <p>Revenue Overview</p>
                  </div> */}
                    {/*   <div className="revenue_data">
                      <Grid doubling columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <div className="Revenue">
                      <h6>Revenue Overview</h6>
              
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                  <div className="Revenue">
                      <h6>Revenue Overview</h6>
              
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                  <div className="Revenue">
                     <a href="https://google.com"> <h6>Revenue Overview</h6></a>
              
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

                      </div> */}
                  
                </Grid.Column>
              </Grid>
            </Grid.Column>

            <Grid.Column width={5}>
              <div className="appointment_heading2">
                <Grid columns>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <p>
                        {" "}
                        Appointments for approval({data.pendingAppointmentCount}
                        )
                      </p>
                    </Grid.Column>
                    <Grid.Column floated="right" width={4}>
                      <Link to="/admin/appointment">
                        <p className="para9"> VIEW ALL</p>
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
              <Grid columns>
                <Grid.Column>
                  <div className="appoint_wrapper">
                    {data.pendingAppointment &&
                      data.pendingAppointment.map((ele) => (
                        <div className="border_appointment">
                          <Grid columns>
                            <Grid.Column>
                              <div className="appoint_card">
                                <div className="appoint_card content">
                                  <div className="content6">
                                    <p>{ele.title}</p>
                                    <span className="date_time">
                                      {ele.appt_date} {ele.appt_month}{" "}
                                      {ele.appt_year}
                                    </span>
                                  </div>
                                </div>
                                <div className="action-icon">
                                  <Reject id={ele._id} />
                                  <Accept
                                    id={ele._id}
                                    name={ele.users.name}
                                    userId={ele.users._id}
                                  />
                                </div>
                              </div>
                            </Grid.Column>
                          </Grid>
                        </div>
                      ))}
                  </div>
                </Grid.Column>
              </Grid>
                          
              <Grid columns>
                <Grid.Column>
                  <div className="appointment_heading3">
                    <Grid columns>
                      <Grid.Row>
                        <Grid.Column width={12}>
                          <p>
                            Document Verification Request(
                            {data.pendingDcoumentCount})
                          </p>
                        </Grid.Column>
                        {/* <Grid.Column floated="right" width={4}>
                          <a href={URL}>
                            <p className="para9"> VIEW ALL</p>
                          </a>
                        </Grid.Column> */}
                      </Grid.Row>
                    </Grid>
                  </div>
                  {data.pendingDcoument &&
                    data.pendingDcoument.map((ele) => (
                 
                  
                      <div className="Request_bg">
                        <Grid columns>
                          {ele.appointment ? (
                            <Grid.Column>
                              <div className="request3">
                                <p>{ele && ele.appointment.title}</p>
                                <Grid column={2}>
                                  <Grid.Row>
                                    <Grid.Column width={8}>
                                      <span className="date_time">
                                        {ele && ele.appointment.appt_date}{" "}
                                        {ele && ele.appointment.appt_month}{" "}
                                        {ele && ele.appointment.appt_year}
                                      </span>
                                    </Grid.Column>
                                    <Grid.Column floated="right" width={4}>
                                      <Verification
                                        serviceCategory={
                                          ele && ele.serviceCategory.name
                                        }
                                        serviceDetail={
                                          ele && ele.serviceDetail
                                        }
                                        price={ele && ele.transaction.amount}
                                        id={ele && ele._id}
                                        username={ele && ele.users.name}
                                        email={ele && ele.email}
                                        phone={ele && ele.mobile}
                                        time={
                                          ele &&
                                          new Date(
                                            ele.createdAt
                                          ).toLocaleString()
                                        }
                                        docs={ele && ele.docs}
                                      />
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              </div>
                            </Grid.Column>
                          ) : (
                            <br />
                          )}
                        </Grid>
                      </div>
                    
                    ))}
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    </main>
  );
};

export default Admin_dashboard;

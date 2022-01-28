import React from "react";
import { useParams } from "react-router";
import { Container, Button, Icon, Step, Grid, Table, Breadcrumb } from "semantic-ui-react";
import StatusChip from "../../Component/Main-Component/StatusChip";
import "../../Sass/Sass-Main/_View_details.scss";
import { useHistory } from "react-router";
const View_details = () => {
  const history = useHistory();

  const [application, setApplication] = React.useState(null);

  React.useEffect(() => {
    getUser();
  }, []);
  let { requestId } = useParams();

  const getUser = async () => {
    if (!localStorage.getItem("token") && !localStorage.getItem("id")) {
      history.push("/login");
    } else {
      let application = await (
        await fetch(`${process.env.REACT_APP_BASE_URL}/service/${requestId}`, {
          method: "GET",
        })
      ).json();

      setApplication(application || []);
    }
  };

  const generateLink = async (key) => {
    const jsonPostData = {
      key: key,
    };
    const url = `${process.env.REACT_APP_BASE_URL}/download`;

    const resu = await (
      await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonPostData),
      })
    ).json();

    window.open(resu.data, "_blank");
  };

  if (!application) {
    return <div></div>;
  }
  console.log(application);
  function dateFormat(d) {
    const date = new Date(d);
    return `${date.toLocaleString()}`;
  }

  return (
    <><div className="account_breadcrumb">
    <Breadcrumb>
              <Breadcrumb.Section href="/">Home</Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section href="/history">Application History</Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section active>
             Application Details
              </Breadcrumb.Section>
            </Breadcrumb> 
    </div>
      <div className="view_detail_wrapper">
        <Container>
          <h2>Application Details</h2>

          <Table selectable>
            <Table.Row>
              <Table.Cell>
                <h6>Date</h6>
                <p>{dateFormat(application.createdAt)}</p>
              </Table.Cell>

              <Table.Cell>
                <h6>Service Id</h6>
                <p>{application.serviceCategory.scode}</p>
              </Table.Cell>

              <Table.Cell>
                <h6>Service Name</h6>
                <p>{application.serviceCategory.name}</p>
              </Table.Cell>

              <Table.Cell>
                <h6>Transaction Id</h6>
                <p>{application.transaction && application.transaction._id}</p>
              </Table.Cell>

              <Table.Cell>
                <h6>Mode</h6>
                <p>
                  {application.transaction && application.transaction.ptype}
                </p>
              </Table.Cell>

              <Table.Cell>
                <h6>Amount (AED)</h6>
                <p>
                  {application.transaction && application.transaction.amount}
                </p>
              </Table.Cell>

              <Table.Cell>
                <h6>Status</h6>
                <p>
                  <StatusChip value={application.status} />
                </p>
              </Table.Cell>
            </Table.Row>
          </Table>

          <div className="details_wrapper_inner">
            <Grid stackable columns>
              {/* 
              <Grid.Column width={4}>
                <Step.Group vertical>
                {application.transaction ? <Step completed>
                   
                   <Step.Content>
                     <Step.Description>Paymnent Details</Step.Description>

                   </Step.Content>
                 </Step> : <div />}

                  {application.name ? <Step completed>
                    
                    <Step.Content>

                      <Step.Description>Applicant Details</Step.Description>
                    </Step.Content>
                  </Step> : <div />}
                  {application.docs.length !== 0 ? <Step completed>
                    <Step.Content>

                    </Step.Content>
                    <Step.Content>
                    
                      <Step.Description style={{marginTop:'3.5  rem'}}>Documents Uploaded</Step.Description>
                    </Step.Content>
                  </Step> : <div />}
                  {application.appointment ? <Step completed>
                    
                    <Step.Content>

                    </Step.Content>

                  </Step> : <div />}

                  {application.appointment ? <Step completed>
                    
                    <Step.Content>

                      <Step.Description>  </Step.Description>

                    </Step.Content>

                  </Step> : <div />}

                </Step.Group>

              </Grid.Column> */}

              <Grid.Column width={14}>
                <Grid.Row>
                  <Grid.Column>
                    <div className="outer_view">
                      <div className="outerStep">Appointment Details</div>
                      <div className="view_segment3">
                        <div className="company_formation1">
                          <h5>{application.serviceCategory.name}</h5>
                        </div>
                        <div className="company_formation1">
                          <p>{application.serviceDetail}</p>
                        </div>
                        <div className="company_formation2">
                          <Table basic="very">
                            <Table.Row style={{ boxShadow: "none" }}>
                              <Table.Cell>
                                <h6>Date</h6>
                                <p>{dateFormat(application.createdAt)}</p>
                              </Table.Cell>

                              <Table.Cell>
                                <h6>Transaction Id</h6>
                                <p>
                                  {application.transaction &&
                                    application.transaction._id}
                                </p>
                              </Table.Cell>

                              <Table.Cell>
                                <h6>Mode</h6>
                                <p>
                                  {application.transaction &&
                                    application.transaction.ptype}
                                </p>
                              </Table.Cell>

                              <Table.Cell>
                                <h6>Amount (AED)</h6>
                                <p>
                                  {application.transaction &&
                                    application.transaction.amount}
                                </p>
                              </Table.Cell>

                              <Table.Cell>
                                <h6>Status</h6>
                                <p className="total_amoint_2">
                                  {application.transaction &&
                                    application.transaction.status}
                                </p>
                              </Table.Cell>
                            </Table.Row>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                  <br />
                  <br />
                  <br />
                  {application.name ? (
                    <Grid.Column>
                      <div className="outer_view">
                        <div className="outerStep">Applicant Details</div>
                        <div className="vertical_step4">
                          <div className="vertical_step4_inner1">
                            <div>
                              <h6>Name</h6>
                              <p>{application.name}</p>
                            </div>
                            <div>
                              <h6>Date of Birth</h6>
                              <p>{application.dob}</p>
                            </div>
                            <div>
                              <h6>Email</h6>
                              <p>{application.email}</p>
                            </div>
                            <div>
                              <h6>Mobile</h6>
                              <p>{application.mobile}</p>
                            </div>
                            <div>
                              <h6>Address</h6>
                              <p>
                                {application.otherAddress &&
                                  application.otherAddress.city}{" "}
                                {application.otherAddress &&
                                  application.otherAddress.state}{" "}
                                <br></br>
                                {application.otherAddress &&
                                  application.otherAddress.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid.Column>
                  ) : (
                    <div />
                  )}
                  {application.docs.length !== 0 ? (
                    <Grid.Column>
                      <div className="outer_view">
                        <div className="outerStep">Documents Uploaded</div>
                        <div className="details_3_outer">
                          {application.docs.map((ele) => (
                            <div className="details_3">
                              <p>
                                {ele.name}{" "}
                                <button
                                  className="same-btn"
                                  onClick={() => generateLink(ele.key)}
                                >
                                  DOWNLOAD
                                </button>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Grid.Column>
                  ) : (
                    <div />
                  )}

                  {application.transaction ? (
                    <Grid.Column>
                      <div className="outer_view">
                        <div className="outerStep">Payment Status</div>
                        <div className="vertical_step1">
                          <Icon
                            color="green"
                            size="huge"
                            link
                            name="check square"
                          />

                          <p>
                            Your payment was {application.transaction.status}{" "}
                            and we have also reserved the slot for your
                            appointment. You can keep track of your application
                            from your “History”.
                          </p>
                        </div>
                      </div>
                    </Grid.Column>
                  ) : (
                    <div />
                  )}
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default View_details;

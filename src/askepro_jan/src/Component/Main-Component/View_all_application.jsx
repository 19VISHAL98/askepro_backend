import React, { applicationeducer } from "react";
import { useParams } from "react-router";
import { Container, Button, Table, Breadcrumb } from "semantic-ui-react";
import BreadCrumbs from "../Breadcrumb/breadcrumb";
import SideBar from '../Nav/Sidebar'
import Verification from "../../Component/Main-Component/Verification";
import Reject from "../../Component/Main-Component/Reject";
import Accept from "../../Component/Main-Component/Accept";
import "../../Sass/Sass-Main/_Appointment_card.scss";
const View_all = () => {
  let { applicationId } = useParams();
  const [application, setapplication] = React.useState(null);
  React.useEffect(() => {
    getapplication();
  }, []);
  const getapplication = async () => {
    let application = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/application/${applicationId}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();
    application = application.data[0];
    setapplication(application || []);
  }
  function dateFormat(d) {
    const date = new Date(d);
    return `${date.toLocaleString()}`
  };
  const generateLink = async (key) => {

    const jsonPostData = {
      'key': key
    }
    const url = `${process.env.REACT_APP_BASE_URL}/download`

    const resu = await (await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonPostData)
    })).json();

    window.open(resu.data, "_blank");
  }
  if (!application)
    return (<div />);

  return (
    <>
      <main className='manage-main'>
        <SideBar value='client' active='active' />
        <div className='table-container'>
        <Breadcrumb>
              <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section href="/admin/application"> Manage applications</Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section active>
             Application Details
              </Breadcrumb.Section>
            </Breadcrumb> 


          <Container>
            <div className="details_wrapper">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Application Detail</h4>
                  <p>Service</p>
                  <p>Sub Category</p>
                  <p>Status</p>
                  <p>CreatedBy</p>
                </div>
                <div className="detail_inner2">
                  <h4>deactivate</h4>
                  <p>{application.serviceCategory.name}</p>
                  <p>{application.serviceDetail}</p>
                  <p>{application.status}</p>
                  <p>{application.users.name}<br /> {application.users.email}<br /> {application.users.phone}</p>
                </div>
              </div>
            </div>
            {application.name ? <div className="details_wrapper2">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Applicant Details</h4>
                  <p>Name</p>
                  <p>Date of Birth</p>
                  <p>Email</p>
                  <p>Mobile</p>
                  <p>P.O. Box</p>
                  <p>Address</p>
                </div>
                <div className="detail_inner2">
                  <h4>deactivate</h4>
                  <p>{application.name}</p>
                  <p>{application.dob}</p>
                  <p>{application.email}</p>
                  <p>{application.mobile}</p>
                  <p>{application.otherAddress && application.otherAddress.pincode}</p>
                  <p>
                    {application.otherAddress && application.otherAddress.city} {application.otherAddress && application.otherAddress.state} <br></br>
                    {application.otherAddress && application.otherAddress.country}
                  </p>
                </div>
              </div>
            </div> : <div />}
            {application.docs.length!==0 ? <div className="details_wrapper2">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Document Details</h4>
                  {application.isDocVerified===false?<Verification
                                        serviceCategory={
                                          application.serviceCategory.name
                                        }
                                        id={application._id}
                                        username={application.name}
                                        email={application.users.email}
                                        phone={application.users.phone}
                                        time={
                                          new Date(
                                            application.createdAt
                                          ).toLocaleString()
                                        }
                                        docs={application.docs}
                                      ></Verification>:<></>}
                </div>
                <div className="detail_inner2">
                  {application.docs.map((ele) =>
                    <p>{ele.name}
                      <br />
                      <Button onClick={() => generateLink(ele.key)} >
                        DOWNLOAD
                        </Button>
                    </p>)}
                </div>
             
              </div>
            </div> : <div />}
            {application.appointment ? <div className="details_wrapper2">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Appointment Details</h4>
                  {application.appointment.status==="Pending"?
                 <div className="action-icon">
                 <Reject id={application.appointment._id} />
                 <Accept
                   id={application.appointment._id}
                   name={application.name}
                   userId={application.users._id}
                 />
               </div>:<></>}
                </div>
                <div className="detail_inner2">

                  <div className="appoint2">
                    <div className="date">
                      <span className="number">{application.appointment && application.appointment.appt_date}</span>
                      <span className="jan">{application.appointment && application.appointment.appt_month} {application.appointment && application.appointment.appt_year}</span>
                    </div>
                    <div className="upcoming">
                      <span className="done_info">{application.appointment && application.appointment.status}</span>
                      <br />
                      <p>{application.appointment && application.appointment.title}</p>
                      <span className="minute">{application.appointment && application.appointment.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <div />}
            {application.transaction ? <div className="details_wrapper">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Transaction Details</h4>
                  <p>Transaction Id</p>
                  <p>Mode</p>
                  <p>Amount (AED)</p>
                  <p>Status</p>
                </div>
                <div className="detail_inner2">
                  <h4>deactivate</h4>
                  <p>{application.transaction._id}</p>
                  <p>{application.transaction.ptype}</p>
                  <p>{application.transaction.amount}</p>
                  <p>{application.transaction.status}</p>
                </div>
              </div>
            </div>
           : <div />}
          </Container>
        </div>

      </main>
    </>
  );
};

export default View_all;

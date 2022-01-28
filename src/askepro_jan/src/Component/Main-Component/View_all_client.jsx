import React, { useReducer } from "react";
import { useParams } from "react-router";
import { Container, Breadcrumb } from "semantic-ui-react";
import BreadCrumbs from "../Breadcrumb/breadcrumb";
import SideBar from '../Nav/Sidebar'
const View_all = () => {
  let { clientId } = useParams();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    let user = await (
      await fetch(`${process.env.REACT_APP_BASE_URL}/admin/client/${clientId}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
    ).json();
 
    user = user.data;

    setUser(user || []);
  }
  if (!user)
    return (<div />);

  return (
    <>
      <main className='manage-main'>
        <SideBar value='client' active='active' />
        <div className='table-container'>
        <Breadcrumb>
              <Breadcrumb.Section href="/admin">Dashboard</Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section href="/admin/clients"> Manage Clients</Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section active>
             Client Details
              </Breadcrumb.Section>
            </Breadcrumb> 


          <Container>
            <div className="details_wrapper">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Client Details</h4>
                  <p>Client Name</p>
                  <p>Client Mobile No.</p>
                  <p>Client Email Id</p>
                </div>
                <div className="detail_inner2">
                  <h4>deactivate</h4>
                  <p>{user.name}</p>
                  <p>{user.phone}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
           {user.address? <div className="details_wrapper2">
              <div className="my_details">
                <div className="detail_inner1">
                  <h4>Contact Details</h4>
                  <p>Address Line One</p>
                  <p>Address Line Two</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Pin Code</p>
                  <p>Country</p>
                </div>
                <div className="detail_inner2">
                  <h4>deactivate</h4>
                  <p>{user.address&&user.address.addressLineOne}</p>
                  <p>{user.address&&user.address.addressLineTwo}</p>
                  <p>{user.address&&user.address.city}</p>
                  <p>{user.address&&user.address.state}</p>
                  <p>{user.address&&user.address.pincode}</p>
                  <p>{user.address&&user.address.country}</p> 
                </div>
              </div>
            </div>:<div/>}
          </Container>
        </div>

      </main>
    </>
  );
};

export default View_all;

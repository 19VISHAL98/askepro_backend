import React from "react";
import {
  Button,
  Icon,
  Grid,
  Header,
  Image,
  Modal,
  Form,
} from "semantic-ui-react";

function exampleVerify(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const Verification = (request) => {
 
const generateLink=async (key)=>{
  
  const jsonPostData = {
    'key':  key
  }
  const url = `${process.env.REACT_APP_BASE_URL}/download`

  const resu =await( await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonPostData)
    })).json();

    window.open(resu.data, "_blank");
}

const[reject,setReject]= React.useState(null);

const handleReject= async (requestId,bool)=>{
  dispatch({ type: "close" });
  const jsonData = {
    'isRejected':  bool
  }

  const url = `${process.env.REACT_APP_BASE_URL}/admin/documents/${requestId}`
  const resu =await( await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })).json();


  if(resu.status===1){
    alert(resu.msg);
    window.location.reload(false);
  }
}


  const [state, dispatch] = React.useReducer(exampleVerify, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <div className="verify_btn">
      <button class="same-btn" onClick={() => dispatch({ type: "open", size: "small" })}>
        Verify  
      </button>
      </div>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>
        <div className="accept_heading">
          Document verification
        </div>
        </Modal.Header>
        <Modal.Content>
          <div className="verification_content">
          <Grid stackable columns={3}>
            <Grid.Column>
              <div className="verify">
                <h6>Service name</h6>
                <p>{request.serviceCategory}</p>
                <p>({request.serviceDetail})</p>
              </div>
            </Grid.Column>
            <Grid.Column> 
              <div className="verify">
                <h6>Submitted by</h6>
                <p>{request.username}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="verify">
                <h6>Submitted on</h6>
                <p> {request.time}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="verify">
                <h6>Phone number</h6>
                <p>{request.phone}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="verify">
                <h6>Email</h6>
                <p>{request.email}</p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="verify">
                <h6>Amount</h6>
                <p>{request.price}</p>
              </div>
            </Grid.Column>
          </Grid>
          </div>
        </Modal.Content>
        <Modal.Description>
          <div className="documents">
            <h6>Documents Submitted</h6>
            {request.docs.map((ele)=><div className="doc_inner">
              <img src={process.env.PUBLIC_URL + "/Assets/images/point.png"} />
              <p> {ele.name} </p>
             <Button basic color='black' onClick={()=>generateLink(ele.key)} style={{margin:'5px 0'}}>Download</Button>
            </div>
            )}
          </div>

          <div className="accept_bottom">
            <button
              color="black"
              className="same-btn"
              onClick={() =>{handleReject(request.id,true)}}
            >
              REJECT
            </button>
            <button
              color="black"
              className="same-btn"
              onClick={() =>{handleReject(request.id, false)}}
            >
            APPROVE
            </button>
          </div>
        </Modal.Description>
      </Modal>
    </>
  );
};
export default Verification;

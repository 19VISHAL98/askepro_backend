import React from "react";
import {
  Button,
  Icon,
  Grid,
  Header,
  Image,
  Modal,
  Form,
  Table,
  Input
} from "semantic-ui-react";
import Updated from "../popup/updated";

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

const Offer_modal = (props) => {
  const [name, setName] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const[img, setImg]=React.useState(null);
  const [pop, setPop] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [openPopErr, setOpenErr] = React.useState(false);
  const submitOffer= async () => {
    dispatch({ type: "close" });
    const url = `${process.env.REACT_APP_BASE_URL}/admin/offer`;
   
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("name", name);
    const result = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: formData,
      })
    ).json();
    if(name===null||file===null){
      setPop(true);
      return;
    }
    if (result.status === 1) {
   setImg(null);
      props.refresh();
    }
   
  
 
  };

  const [state, dispatch] = React.useReducer(exampleVerify, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
console.log(file)
return (
    <>

      <button className="same-btn" /* onClick={submitoffer} */ onClick={() => dispatch({ type: "open", size: "small" })}>
        + ADD NEW OFFER
          </button>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>
          <div className="accept_heading">Add New offer</div>
        </Modal.Header>
        <Modal.Content>
          <div className="faq_content">
            <Table.Row>
             
              <Table.Cell>
                <input placeholder="Enter Name here" onChange={(event) => setName(event.target.value)} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
             
              <Table.Cell>
              <Form.Field>
                  <Input
                    type="file"
                    name="file"
                    id="file-btn"
                    onChange={async (event) => {setFile(event.target.files[0]);  toBase64(event.target.files[0]).then(res=>setImg(res))}}
                    style={{ display: "none" }}
                  />
                  <div className="offerimg">
                  <p>
                
                    <label style={{cursor:'pointer',border:'dotted 1px black'}} for="file-btn">  Image(JPEG/PNG)  {!file?"Click to select image":file?.name + " Uploaded"} </label>
                  </p>
                  </div>
                  
                </Form.Field>
              </Table.Cell>
            </Table.Row>
          </div>

         { img&&<div className="offer_banner" >
          <img src={img} width="300" height="200" /></div>}
          <br/>
                  <br/>
                  <br/>
        </Modal.Content>
        <Modal.Description>
          <div className="accept_bottom">
            <button
              color="black"
              className="same-btn"
              onClick={() => dispatch({ type: "close" })}
            >
              CANCEL
            </button>
            <button
              color="black"
              className="same-btn"
              onClick={() => submitOffer()}
            >
              SAVE
            </button>
            <br />
            <br />  
          </div>
        </Modal.Description>
      </Modal>
      
      <Updated wrong={true} open={pop} msg="Please enter Offer Name and select Offer Image" onClose={() => setPop(false)} />
      <Updated
        open={openPopErr}
        wrong={openPopErr}
        msg="Please use different Offer Name"
        onClose={() => setOpenErr(false)}
      />
    </>
  );
};
export default Offer_modal;

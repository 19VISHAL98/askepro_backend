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

const Offer_image_modal = ( props) => {
  const [name, setName] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const[img, setImg]=React.useState(null);
 

  const [state, dispatch] = React.useReducer(exampleVerify, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  console.log(props)

  return (
    <>
 <Icon  style={{ marginLeft: "30px" ,cursor: "pointer"}} name="eye"onClick={() => dispatch({ type: "open", size: "small" })}/>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>
          <div className="accept_heading">View</div>
        </Modal.Header>
        <Modal.Content>
          

         { props.img&&<div className="offer_banner" >
          <img src={"data:image/png;base64," +props.img} width="300" height="200" /></div>}
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
            
            <br />
            <br />  
          </div>
        </Modal.Description>
      </Modal>
    </>
  );
};
export default Offer_image_modal;

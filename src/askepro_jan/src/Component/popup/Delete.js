import React, { useReducer } from "react";
import { Button, Icon, Header, Image, Modal } from "semantic-ui-react";
import "../../Sass/Sass-Main/_Modal.scss";

function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const Accepted = (props) => {

  const [state, dispatch] = useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const handleAccept = () => {

    dispatch({ type: "close" })

  
   
     window.location.reload(false);
   
  }
  console.log(props)
  return (
    <>
      {props.check?<></>:<Icon  
        name="check"
        onClick={() => dispatch({ type: "open", size: "large" })}
      ></Icon>}
      <Modal
        size={size}
        open={props.open}
        onClose={() =>props.onClose()}
      >
    
        <Modal.Content image>
         {props.check?<></>: <div className="modal_img">
            <Icon className="icon1" name="check" color="green" size="big" />
          </div>}
        </Modal.Content>
        <Modal.Description>
          <p className="modal_p">
          {props.msg}
          </p>

          <div className="accept_bottom">
            <button
              color="black"
              className="same-btn"
              onClick={() => props.onClose()}
            >
             { props.check?"Cancel":"REJECT"}
            </button>
            <button
              color="black"
              className="same-btn"
              onClick={() => props.delete()}
            >
              {props.check?"Okay":"ACCEPT"}
            </button>
          </div>
        </Modal.Description>
      </Modal>
    </>
  );
};
export default Accepted;

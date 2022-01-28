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

const Updated = (props) => {

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
      {/* <Icon
        name="check"
        onClick={() => dispatch({ type: "open", size: "large" })}
      ></Icon> */}
      <Modal
        size={size}
        open={props.open}
        onClose={() =>props.onClose()}
      >
    
        <Modal.Content image>
          <div className={props.wrong?"modal_img2":"modal_img"}>
            <Icon className="icon1" name={props.wrong?"close":"check"} color={props.wrong?"red":"green"}  size="big" />
          </div>
        </Modal.Content>
        <Modal.Description>
          <p className="modal_p">
          {props.msg}
          </p>

          {props.button?<></>:<div className="accept_bottom">
            <button
              color="black"
              className="same-btn"
              onClick={() => props.onClose()}
            >
              CLOSE
            </button>

          </div>}
        </Modal.Description>
      </Modal>
    </>
  );
};
export default Updated;

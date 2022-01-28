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
} from "semantic-ui-react";
import Reject from "./Reject";
import Accept from "./Accept";
import Verification from "./Verification";

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

const FAQ_Modal_Edit = (faq) => {


  const [faqTitle, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  const submitFaq = async (id) => {
    dispatch({ type: "close" });
    const url = `${process.env.REACT_APP_BASE_URL}/admin/faq/${id}`;
    let jsonData = {
      title: faqTitle?faqTitle:faq.ques,
      description: description?description: faq.ans,
    };
  
    const result = await (
      await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(jsonData),
      })
    ).json();

    if (result.status === 1) {
      window.location.reload(false);
    }
  };

  const [state, dispatch] = React.useReducer(exampleVerify, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>

      <img
        src={
          process.env.PUBLIC_URL + "/Assets/images/edit.png"
        } className="btn-upload" onClick={() => dispatch({ type: "open", size: "small" })}/>
  
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>
          <div className="accept_heading">Add New FAQ</div>
        </Modal.Header>
        <Modal.Content>
          <div className="faq_content">
            <Table.Row>
              <Table.Cell collapsing>
                <p>Question</p>
              </Table.Cell>
              <Table.Cell>
                <input defaultValue= {faq.ques}  onChange={(event) => setTitle(event.target.value)} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                <p>Answer</p>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input defaultValue={faq.ans} onChange={(event) => setDescription(event.target.value)} />
                </Form.Field>
              </Table.Cell>
            </Table.Row>
          </div>
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
              onClick={() => submitFaq(faq.fid)}
            >
              SAVE
            </button>
            <br />
            <br />
          </div>
        </Modal.Description>
      </Modal>

    </>
  );
};
export default FAQ_Modal_Edit;

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

const FAQ_modal = () => {
  const [faqTitle, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [pop, setPop] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);
  const submitFaq = async () => {
    if(faqTitle===null||description===null){
      setPop(true)
      return;
    }
    dispatch({ type: "close" });
    const url = `${process.env.REACT_APP_BASE_URL}/admin/faq`;
    let jsonData = {
      title: faqTitle,
      description: description,
    };

    const result = await (
      await fetch(url, {
        method: "POST",
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
      setCorrect(open);
    }
  };

  const [state, dispatch] = React.useReducer(exampleVerify, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>

      <button className="same-btn" /* onClick={submitFaq} */ onClick={() => dispatch({ type: "open", size: "small" })}>
        + ADD FAQ
          </button>
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
                <input placeholder="Enter question here" value={faqTitle} onChange={(event) => setTitle(event.target.value)} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                <p>Answer</p>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input placeholder="Enter answer here" value={description} onChange={(event) => setDescription(event.target.value)} />
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
              onClick={() => submitFaq()}
            >
              SAVE
            </button>
            <br />
            <br />  
          </div>
        </Modal.Description>
      </Modal>
      {!faqTitle && description ? <Updated wrong={true} open={pop} msg="Please enter Question" onClose={() => setPop(false)} />:<></>}
      {faqTitle && !description ? <Updated wrong={true} open={pop} msg="Please enter Answer" onClose={() => setPop(false)} />:<></>}
      {!faqTitle && !description ?<Updated wrong={true} open={pop} msg="Please enter Question and Answer" onClose={() => setPop(false)} />:<></>}
      <Updated wrong={false} button={true} open={correct} msg="Question and Answer saved" onClose={() => setCorrect(false)} />
    </>
  );
};
export default FAQ_modal;

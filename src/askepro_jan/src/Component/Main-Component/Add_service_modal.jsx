import React, { useRef } from "react";
import { Button, Icon, Modal, Form, Input, TextArea, Label, Checkbox } from "semantic-ui-react";
import "../../Sass/Sass-Main/_Admin_dashboard.scss";
// import AdminAccordion from "./Accordion/AdminAccordion";
import Updated from "../../Component/popup/updated";
function exampleService(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const Service_modal = (props) => {
  const [openPop, setOpen] = React.useState(false);
  const [openPopErr, setOpenErr] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [showCat, setShowCat] = React.useState(false);
  const [processT, setProcessT] = React.useState(null);
  const [stayPeriod, setStayPeriod] = React.useState(null);
  const [validity, setValidity] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [entry, setEntry] = React.useState(null);
  const [subject, setSubject] = React.useState(false);
  const [comp, setComp] = React.useState([]);
  const [serviceDetail, setServiceDetail] = React.useState([]);
  const [price, setPrice] = React.useState(null);
  const [discount, setDiscount] = React.useState(null);
  const [serviceHowToApply, setHta] = React.useState(null);
  const [reqDocs, setDocs] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [catArr, setcatArr] = React.useState([]);
  const [cat, setCat] = React.useState(null);
  const[appType, setAppType]= React.useState(null);
  const [state, dispatch] = React.useReducer(exampleService, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const inputRef = useRef();
  const uploadWithFormData = async (event) => {
    if (!name || !description || !file) {
      setMsg("Please Fill out all the details");
      setOpenErr(true);
      return;
    }
    dispatch({ type: "close" });

    const url = `${process.env.REACT_APP_BASE_URL}/admin/services`;
    event.preventDefault();
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", JSON.stringify(catArr.map(x => x.value)));
    formData.append("serviceDetail", JSON.stringify(serviceDetail));
    // formData.append("processT", processT);
    // formData.append("stayPeriod", stayPeriod);
    // formData.append("validity", validity);
    // formData.append("entry", entry);
    // formData.append("price",price );
    // formData.append("reqDocs", reqDocs);

    const result = await (
      await fetch(url, {
        method: "POST",
        body: formData,
      })
    ).json();

    if (result.status === 1) {
      setServiceDetail([]);
      props.refresh();
      window.location.reload(false);
      /* setName(null);
      setDescription(null);
      setFile(null);
      setShowCat(false);
      handleRemove(); 
      setCat(null);
      setType(null);
      setPrice(null);
      setDiscount(null);
      setDocs(null); */
    } else {
      setMsg("Please use different Service Name");
      setServiceDetail([]);
      setOpenErr(true);
      // window.location.reload(false);
    }
  };
  const handleAdd = async () => {
    if(cat===null)
    return;
 if(cat?.replace(/\s/g, '')?.length<1 )
 return;
    setcatArr([
      ...catArr,
      { key: cat, text: cat, value: cat }
    ]);
    setCat("");
  };  
  const handleRemove = async (ele) => {
    // console.log({ key: ele, text: ele, value: ele })
    let arr = catArr
    const findObj=(obj)=>obj.value===ele;
    
    const index = arr.findIndex(findObj);
    console.log(index);
    if (index > -1) {
      arr.splice(index, 1);
      setcatArr([...arr]);
    }
  };
  const handleSave = async (e) => {
    if (!type || !price || !reqDocs) {
      setMsg("Please Fill out all the details");
      setOpenErr(true);
      return;
    }

    // if (serviceDetail.find((o) => o.name === type)) {
    //   setMsg("Please Use a Different name");
    //   setOpenErr(true);
    //   return;
    // }
    setServiceDetail([
      ...serviceDetail,
      {
        name: type,
        price: price,
        discountPrice: discount,
        // processT: processT,
        // stayPeriod: stayPeriod,
        // validity: validity,
        type: appType,
        reqDocs: reqDocs.split(","),
      },
    ]);
    setMsg("Application Type has been added");
    setOpen(true);
  };
  const resetFields = async (e) => {
    e.preventDefault();
    setEntry("");
    setType("");
    setPrice("");
    setPrice("");
    setStayPeriod("");
    setValidity("");
    // setAppType("");
    setDocs("");
    setProcessT("");
    setDiscount("");
  };
  console.log(catArr);
  return (
    <>
      <button
        className="same-btn"
        /* onClick={submitFaq} */ onClick={() =>
          dispatch({ type: "open", size: "large" })
        }
      >
        + ADD SERVICE
      </button>
      <Modal
        size={size}
        open={open}
        onClose={() => {
          setServiceDetail([]);
          setcatArr([]);
          dispatch({ type: "close" });
        }}
      >
        <Modal.Header>
          <div className="accept_heading">Add New Service</div>
        </Modal.Header>
        <Modal.Content>
          <div className="services_form">
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="Service name"
                  value={name}
                  placeholder="Enter Service name"
                  onChange={(event) => setName(event.target.value)}
                />
                <Form.Field>
                  <label>Image(JPEG/PNG)</label>
                  <Input
                    type="file"
                    name="file"
                    id="file-btn"
                    onChange={(event) => setFile(event.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <p className="file">
                    <label style={{cursor:'pointer'}} for="file-btn">{!file?"Click to select file":file?.name + " Uploaded"}</label>
                  </p>
                </Form.Field>
                <Form.Field>
                <Checkbox label='Category'  onClick={(evt, data)=>setShowCat(data.checked)} />
                </Form.Field></Form.Group>
              <Form.Field
                control={TextArea}
                value={description}
                label="Description"
                placeholder="Write your text here"
                onChange={(event) => setDescription(event.target.value)}
              />
              
             {showCat?<> <div>
                <Form.Group>
                  <Form.Input
                    onChange={(e) => { setCat(e.target.value) }}
                    label='Add a category'
                    control={Input}
                    value={cat}
                  >

                  </Form.Input>
                  <Button icon='plus' onClick={(e) => { handleAdd() }} />

                </Form.Group>

              </div>
              <div className="category">
                <h4>Category:</h4>
                {catArr.map((d) => (
                  <div className="testimonial">
                    <Label>

                      {d.text}
                      <Icon name='delete' onClick={() => handleRemove(d.text)} />
                    </Label>
                   
                  </div>
                ))}
              </div></>:<></>}
              {/* <Form.Field
                control={TextArea}
                value={overview}
                label="Overview"
                placeholder="Write your text here"
                onChange={(event) => setOverview(event.target.value)}
              /> */}

              {/*         <div className="application_types">
                <div>
                  <Form.Field>
                <label>Add Application Type(s)</label>
                </Form.Field>
                </div>
                <div>
                <Button action={{ onClick: (e) => handleAdd(e), icon: 'plus square icon' }} id="var" onChange={(e) => setSubject(e.target.value)}>
                <label>+ ADD NEW</label>
                </Button>
                </div>
              </div> */}
              <div className="application_types">
                <div>
                  <Form.Field>
                    <label>Add Application Type(s)</label>
                  </Form.Field>
                </div>
                <div>
                  <Form.Field>
                    <Button
                      onClick={(e) => {
                        handleSave(e);
                        dispatch({ type: "close" });
                        resetFields(e);
                        dispatch({ type: "open" });
                      }}
                    >
                      <Icon name="save outline" />
                      <label style={{cursor: "pointer"}} > Save</label>
                    </Button>
                  </Form.Field>
                </div>
              </div>

              <div className="admin_accordion">
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Application Type"
                      value={type}
                      placeholder="Enter Application Type"
                      onChange={(event) => setType(event.target.value)}
                    />
                    <Form.Input
                      fluid
                      type = "number"
                      value={price}
                      label="Enter total fees"
                      placeholder="Enter total fees"
                      onChange={(event) => setPrice(event.target.value)}
                    />
                      <Form.Input
                      fluid
                      type = "number"
                      value={discount}
                      label="Enter Discount"
                      placeholder="Enter Discount"
                      onChange={(event) => setDiscount(event.target.value)}
                    />
                  </Form.Group>
                  {/* <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      value={processT}
                      type="number"
                      label="Processing Time(Days)"
                      placeholder="Enter Processing Time"
                      onChange={(event) => setProcessT(event.target.value)}
                    />
                    <Form.Input
                      fluid
                      value={stayPeriod}
                      type="number"
                      label="Stay Period(Days)"
                      placeholder="Enter duration"
                      onChange={(event) => setStayPeriod(event.target.value)}
                    />*/}
              
                    {/* <Form.Input
                      fluid
                      value={validity}
                      type="number"
                      label="Validity(Days)"
                      placeholder="Enter validity"
                      onChange={(event) => setValidity(event.target.value)}
                    /> */}
                  { showCat? <Form.Select
                      label='Type'
                      options={catArr}
                      placeholder='Type'
                      onChange={(event,{value}) => setAppType(value)}
                    />:<></>
                }
                  {/* <Form.Input fluid label="Entry"
                      placeholder="Enter Entry(single/Multi)"
                      value={entry}
                      onChange={(event) => setEntry(event.target.value)} />
                  </Form.Group> */}
                  <Form.Input
                    control={TextArea}
                    label="Required Documents(Doc1,Doc2,Doc3)"
                    value={reqDocs}
                    placeholder="Enter all the document required("
                    onChange={(event) => setDocs(event.target.value)}
                  />
                </Form>
              </div>
              <h4>Types of Application Added:</h4>

              {serviceDetail.map((d) => (
                <div className="testimonial">
                  <p>{d.name}</p>
                </div>
              ))}
            </Form>
          </div>
        </Modal.Content>
        <Modal.Description>
          <div className="accept_bottom">
            <button
              color="black"
              className="same-btn"
              onClick={() => {
                setServiceDetail([]);
                dispatch({ type: "close" });
              }}
            >
              CANCEL
            </button>
            <button
              color="black"
              className="same-btn"
              onClick={(event) => uploadWithFormData(event)}
            >
              SAVE
            </button>
            <br />
            <br />
          </div>
        </Modal.Description>
      </Modal>
      <Updated open={openPop} msg={msg} onClose={() => setOpen(false)} />
      <Updated
        open={openPopErr}
        wrong={openPopErr}
        msg={msg}
        onClose={() => setOpenErr(false)}
      />
    </>
  );
};
export default Service_modal;

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
  Accordion,
  Input,
  TextArea,
  Label,
  Checkbox
} from "semantic-ui-react";

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
  const [edit, setEdit] = React.useState(null);
  const [openPopErr, setOpenErr] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [services, setService] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [overview, setOverview] = React.useState(null);
  const [serviceDetail, setServiceDetail] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [addAction, setAdd] = React.useState(false);

  React.useEffect(() => {
    getservice();
  }, []);

  const getservice = async () => {
    const service = await (await fetch(`${process.env.REACT_APP_BASE_URL}/admin/services/${props.id}`, { method: "GET" })).json();
    setServiceDetail(service.data.serviceDetail)
    setService(service);
    setcatArr(service.data.category.map(x=>({ key: x, text: x, value: x })))
if(service.data.category.length>0){
  setShowCat(true)
}
  }

  // const [stayPeriod, setStayPeriod] = React.useState(false);
  const [showCat, setShowCat] = React.useState(false);
  const [entry, setEntry] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [discount, setDiscount] = React.useState(null);
  const [reqDocs, setDocs] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [catArr, setcatArr] = React.useState([]);
  const [cat, setCat] = React.useState(null);
  const[appType, setAppType]= React.useState(null);
  const uploadWithFormData = async (event, id) => {
    // dispatch({ type: "close" });
    const url = `${process.env.REACT_APP_BASE_URL}/admin/services/${id}`
    event.preventDefault();
    const formData = new FormData();
    formData.append("upload", file ? file : services.data.images);
    formData.append("name", name ? name : services.data.name);
    formData.append("description", description ? description : services.data.description);
    formData.append("category", JSON.stringify(catArr.map(x => x.value)));
    formData.append("serviceDetail", JSON.stringify(serviceDetail));
    // formData.append("serviceHowToApply", serviceHowToApply);

    const result = await (await fetch(url, {
      method: 'PUT',
      body: formData
    })).json();

    if (result.status === 1) {
      dispatch({ type: "close" });
      props.refresh();
    } else {
      setMsg("There has been an error")
      setOpenErr(true);
      getservice();
    }

  }
  const [state, dispatch] = React.useReducer(exampleService, {
    open: false,
    size: undefined,
  });
  const handleAdd = async () => {
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
  const handleDelete = async (event, id) => {
    let details = serviceDetail;
    let deletedDetails = details.find(ele => ele._id === id);
    const index = details.indexOf(deletedDetails);
    if (index > -1) {
      details.splice(index, 1);
    }
    setServiceDetail(details);
    setMsg("Application Type has been deleted")
    setOpen(true)
  }
  const handleSave = async (event, id) => {
    let details = serviceDetail;
    let EditedDetails = details.find(ele => ele._id === id);
    const index = details.indexOf(EditedDetails);
    if (index > -1) {
      details[index] = {
        name: type ? type : EditedDetails.name,
        price: price ? price : EditedDetails.price,
        discountPrice:discount? discount : EditedDetails.discount,
        // processT: processT ? processT : EditedDetails.processT,
        // stayPeriod: stayPeriod ? stayPeriod : EditedDetails.stayPeriod,
        // validity: validity ? validity : EditedDetails.validity,
        type: appType ? appType : EditedDetails.type,
        reqDocs: reqDocs ? reqDocs.split(",") : EditedDetails.reqDocs
      }
    }
    setServiceDetail(details);
    setMsg("Application Type has been updated")
    setOpen(true)
  }
  const handleNew = async (e) => {
    if (!type || !price || !reqDocs) {
      setMsg("Please Fill out all the details")
      setOpenErr(true);
      return;
    }

    if (serviceDetail.find(o => o.name === type)) {
      setMsg("Please Use a Different name")
      setOpenErr(true);
      return;
    }
    setServiceDetail([...serviceDetail, {
      name: type,
      price: price,
      discountPrice:discount,
      // processT: processT,
      // stayPeriod: stayPeriod,
      // validity: validity,
      type: appType,
      reqDocs: reqDocs.split(",")
    }]);
    setMsg("Application Type has been added")
    setOpen(true)
  }
  const { open, size } = state;
  if (!services) {
    return (<></>)
  }
  console.log(catArr);
  return (
    <>

      <img
        src={
          process.env.PUBLIC_URL + "/Assets/images/edit.png"
        } className="btn-upload" onClick={() => dispatch({ type: "open", size: "large" })} />
      <Modal
        size={size}
        open={open}
        onClose={() => { getservice(); dispatch({ type: "close" }) }}
      >

        <Modal.Header>
          <div className="accept_heading">Edit Service</div>
        </Modal.Header>
        <Modal.Content>
          <div className="services_form">
            <Form>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='Service name'
                  defaultValue={services.data.name}
                  placeholder='Enter Service name'
                  onChange={(event) => { setName(event.target.value) }}
                />
                <Form.Field>
                  <label>Image(JPEG/PNG)</label>
                  <Input type='file' name='file' id="file-btn" onChange={(event) => setFile(event.target.files[0])} style={{ display: "none" }} />
                  <p className='file'>
                    <label style={{cursor:'pointer'}}  for='file-btn'>{!file?"Click to select file":file?.name + " Uploaded"}</label>
                  </p>
                </Form.Field>
                <Form.Field>
                <Checkbox label='Category'  onClick={(evt, data)=>setShowCat(data.checked)} defaultChecked={services.data.category.length>0?true:false} />
                </Form.Field>
              </Form.Group>
              <Form.Field
                control={TextArea}
                defaultValue={services.data.description}
                label='Description'
                placeholder='Write your text here'
                onChange={(event) => setDescription(event.target.value)}
              />
              {/* <Form.Field
                control={TextArea}
                defaultValue={services.data.overview}
                label='Overview'
                placeholder='Write your text here'
                onChange={(event) => setOverview(event.target.value)}
              /> */}

{showCat?<><div>
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
                    <Label >

                      {d.text}
                      <Icon name='delete' onClick={() => handleRemove(d.text)} />
                    </Label>
                  </div>
                ))}
              </div></>:<></>}
              <h4>Types of Application :</h4>

              {
                serviceDetail.map((d) => (
                  <Accordion fluid styled>
                    <Accordion.Title>
                      <div className="application_types">

                        <div>

                          <label>{d.name}</label>

                        </div>
                        <div>
                          <Button onClick={(e) => handleDelete(e, d._id)} className="cancel_btn">
                            <Icon name="trash alternate outline" />
                            <label > Delete</label>
                          </Button>
                          <Button onClick={(e) => setEdit(d._id)}>
                            <Icon name="edit outline" />
                            <label> Edit</label>
                          </Button>

                        </div>

                      </div>
                    </Accordion.Title>

                    <Accordion.Content active={edit === d._id}>

                      <div className="admin_accordion">
                        <Form>
                          <Form.Group widths="equal">
                            <Form.Input
                              fluid
                              label="Application Type"
                              defaultValue={d.name}
                              placeholder="Enter Application Type"
                              onChange={(event) => setType(event.target.value)}
                            />
                            <Form.Input
                              fluid
                              type = "number"
                              defaultValue={d.price}
                              label="Enter total fees"
                              placeholder="Enter total fees"
                              onChange={(event) => setPrice(event.target.value)}
                            />

<Form.Input
                              fluid
                              type = "number"
                              defaultValue={d.discountPrice || 0}
                              label="Enter Discount"
                              placeholder="Enter Discount"
                              onChange={(event) => setDiscount(event.target.value)}
                            />
                          </Form.Group>
                          {/* <Form.Input
                      fluid
                      defaultValue={d.validity}
                      type="number"
                      label="Validity(Days)"
                      placeholder="Enter validity"
                      onChange={(event) => setValidity(event.target.value)}
                    /> */}
                    {showCat?<Form.Select
                      label='Type'
                      options={catArr}
                      placeholder='Type'
                      defaultValue={d.type}
                      onChange={(event,{value}) => setAppType(value)}
                    />:<></>}
                          {/* <Form.Group widths="equal">
                            <Form.Input
                              fluid
                              defaultValue={d.processT}
                              type="number"
                              label="Processing Time(Days)"
                              placeholder="Enter Processing Time"
                              onChange={(event) => setProcessT(event.target.value)}
                            />
                            <Form.Input
                              fluid
                              defaultValue={d.stayPeriod}
                              type="number"
                              label="Stay Period(Days)"
                              placeholder="Enter duration"
                              onChange={(event) => setStayPeriod(event.target.value)}
                            />
                            <Form.Input
                              fluid
                              defaultValue={d.validity}
                              type="number"
                              label="Validity(Days)"
                              placeholder="Enter validity"
                              onChange={(event) => setValidity(event.target.value)}
                            />
                            <Form.Input fluid label="Entry"
                              placeholder="Enter Entry(single/Multi)"
                              defaultValue={d.entry}
                              onChange={(event) => setEntry(event.target.value)}
                            />
                          </Form.Group> */}
                          <Form.Input
                            control={TextArea}
                            label="Required Documents(Doc1,Doc2,Doc3)"
                            onChange={(event) => setDocs(event.target.value)}
                            defaultValue={d.reqDocs.join()}
                            placeholder="Enter all the document required"
                          />
                        </Form>
                        <br />
                        <div>
                          <Button onClick={(e) => setEdit(null)} className="cancel_btn">
                            <Icon name="cross" />
                            <label style={{cursor: "pointer"}}> Cancel</label>
                          </Button>
                          <Button onClick={(e) => handleSave(e, d._id)}>
                            <Icon name="save outline" />
                            <label style={{cursor: "pointer"}}> Save</label>
                          </Button>

                        </div>
                      </div>


                    </Accordion.Content>
                  </Accordion>
                ))}

              <div className="application_types">
                <div>
                  <Form.Field>
                    <label>Add Application Type(s)</label>
                  </Form.Field>
                </div>
                <div>
                  <Form.Field>
                    <Button onClick={(e) => { setAdd(true); }}>
                      <Icon name="plus" />
                      <label style={{cursor: "pointer"}}> Add</label>
                    </Button>
                    <Button onClick={(e) => { handleNew(); }}>
                      <Icon name="save outline" />
                      <label style={{cursor: "pointer"}}> Save</label>
                    </Button>
                    <Button onClick={(e) => { setAdd(false); }}>
                      <Icon name="close" />
                      <label style={{cursor: "pointer"}}> Cancel</label>
                    </Button>
                  </Form.Field>
                </div>
              </div>
              {addAction?<div className="admin_accordion">
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
                              defaultValue={discount}
                              label="Enter Discount"
                              placeholder="Enter Discount"
                              onChange={(event) => setDiscount(event.target.value)}
                            />
                  </Form.Group>
                  {/* <Form.Input
                      fluid
                      value={validity}
                      type="number"
                      label="Validity(Days)"
                      placeholder="Enter validity"
                      onChange={(event) => setValidity(event.target.value)}
                    /> */}
                    {showCat?<Form.Select
                      label='Type'
                      options={catArr}
                      placeholder='Type'
                      onChange={(event,{value}) => setAppType(value)}
                    />:<></>}
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
                    />
                    <Form.Input
                      fluid
                      value={validity}
                      type="number"
                      label="Validity(Days)"
                      placeholder="Enter validity"
                      onChange={(event) => setValidity(event.target.value)}
                    />
                    <Form.Input fluid label="Entry"
                      placeholder="Enter Entry(single/Multi)"
                      value={entry}
                      onChange={(event) => setEntry(event.target.value)} />
                  </Form.Group> */}
                  <Form.Input
                    control={TextArea}
                    label="Required Documents(Doc1,Doc2,Doc3)"
                    value={reqDocs}
                    placeholder="Enter all the document required("
                    onChange={(event) => setDocs(event.target.value)} />
                </Form>
              </div>:<></>}
            </Form>
          </div>
        </Modal.Content>
        <Modal.Description>
          <div className="accept_bottom">
            <button
              color="black"
              className="same-btn"
              onClick={() => { getservice(); dispatch({ type: "close" }) }}
            >
              CANCEL
            </button>
            <button
              color="black"
              className="same-btn"
              onClick={(event) => uploadWithFormData(event, props.id)}
            >
              SAVE
            </button>
            <br />
            <br />
          </div>
        </Modal.Description>
        <Updated open={openPop} msg={msg} onClose={() => setOpen(false)} />
        <Updated open={openPopErr} wrong={openPopErr} msg={msg} onClose={() => setOpenErr(false)} />
      </Modal>

    </>
  );
};
export default Service_modal;

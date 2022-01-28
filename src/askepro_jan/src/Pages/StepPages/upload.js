import React from "react";
import {
  Container,
  Header,
  Grid,
  Label,
  Divider,
  Form,
  Button,
  Input,
  List,
  Select,
} from "semantic-ui-react";
import Stepper from "../../Component/Stepper/stepper";
import DataCard from "../../Component/Card/card";
import BreadCrumbs from "../../Component/Breadcrumb/breadcrumb";
import Heading from "../../Component/Heading/heading";
import ButtonBar from "../../Component/ButtonBar/buttonbar";
import "../StepPages/stepPage.scss";
import { useHistory } from "react-router";
import { useRef } from "react";
import Updated from "../../Component/popup/updated";

const UploadDocuments = () => {
  const history = useHistory();
  const fileref = useRef();
  const [fileName, setfilename] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [docsArray, updateMyArray] = React.useState([]);
  const [services, setService] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const slug = localStorage.getItem("serviceSlug");
  const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory/${slug}`;
  const requestId = localStorage.getItem("applicationId");
  const url = `${process.env.REACT_APP_BASE_URL}/service/upload/${requestId}`;
 const [message, setmessage] = React.useState(null)
  React.useEffect(() => {
    getServices();
  }, []);
  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener('popstate', function (event) {
  window.history.pushState(null, document.title, window.location.href);
  });
  const getServices = async () => {
    const service = await (await fetch(service_url, { method: "GET" })).json();
    let application = await (
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/service/${requestId}`,
        {
          method: "GET"
        })).json();

    let subCatdata=service.data.serviceDetail.find(e=>e.name===application.serviceDetail?application.serviceDetail:localStorage.getItem('subCatId'));
    const serviceData = {
      reqDocs: subCatdata.reqDocs
    };
    setService(serviceData);
    localStorage.setItem("subCatId",subCatdata._id);
  };
  if (!services) {
    return <div />;
  }
  const uploadWithFormData = async (event) => {
    event.preventDefault();
    if (!fileName) {
       setMsg("Select a file first");
       return;
    }
    console.log( event.target.files[0], fileName);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("name", fileName);
    
    const result = await (
      await fetch(url, {
        method: "PUT",
        headers: { "x-access-token": localStorage.getItem("token") },
        body: formData,
      })
    ).json();
    if (result.status === 1) {
      setOpen(true);
      setMsg(fileName + " saved ");
      updateMyArray((oldArray) => [...oldArray, fileName]);
    }
  };
  const handleSubmitForm = (event) => {
    if (docsArray.length === services.reqDocs.length) history.push("/payment")||setmessage(false);
    else {
      setmessage("Please upload all the documents");
    }
  };
  console.log(services);
  return (
    <main>
      <div className="apply-section">
        <BreadCrumbs
          section={[
            { key: "home", content: "Home", link: true },
            { key: "apply", content: "Apply Now", active: true },
          ]}
        />
        <Heading />
        <Grid className="data" columns="2" stackable="tablet">
          <Grid.Column width={11}>
            <Container className="stepper-container">
              <Stepper />
              <Divider />
              <div className="upload-form">
                <Grid column="3" stackable="tablet" centered>
                  <Grid.Row className="upload-container">
                    <Grid.Column width={6}>
                      <Form.Field>
                        <label for="docs">Choose a documnet</label>
                        <Select
                          placeholder="Chose a document"
                          onChange={(e, { value }) => setfilename(value)}
                          required
                          options={services.reqDocs.filter(e=>!docsArray.includes(e)).map((ele, index) => ({
                            key: index,
                            value: ele,
                            text: ele,
                          }))}
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <Form.Field>
                        <label>Scan and upload documents</label>
                        <input
                          ref={fileref}
                          type="file"
                          hidden
                          onChange={(e) => uploadWithFormData(e)}
                        />
                        <div className="file">
                          <label style={{cursor:'pointer'}} onClick={() => fileref.current.click()} for="file-btn">
                            Upload file from your computer
                          </label>
                        </div>
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={3}>
                         {/* <Button className='btn-upload' onClick={uploadWithFormData}>UPLOAD</Button> */}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div className="document-list">
                  <label>Documents Required</label>
                  <List>
                    {services.reqDocs.map((ele) => (
                      <List.Item>
                        <List.Icon name="square" />
                       { !docsArray.includes(ele)?
                       <List.Content>{ele}
                       </List.Content>:<List.Content><mark className="mark">{ele}
                       </mark></List.Content>}
                      </List.Item>
                    ))}
                  </List>
                </div>
                <div className="document-list">
                  <label>Documents Submitted</label>
                  <List>
                    {docsArray.map((ele) => (
                      <List.Item>
                        <List.Icon name="square" />
                        <List.Content>{ele}</List.Content>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </div>
              
              {message && (
                 <Label as="a" className="Rejected">
                 {message}
               </Label>
              )}
              <div className="upload_save" style={{ textAlign: "center" }}>
                <button
                  className="same-btn"
                  onClick={handleSubmitForm}
                  value="submit"
                >
                  Save
                </button>
              </div>
            </Container>
          </Grid.Column>
          <Grid.Column width={5}>
            <DataCard />
          </Grid.Column>
        </Grid>
      </div>
      {/* <ButtonBar /> */}
      <Updated open={open} msg={msg} onClose={() => setOpen(false)} />

    </main>
  );
};
export default UploadDocuments;

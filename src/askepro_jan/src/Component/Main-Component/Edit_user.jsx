import React from "react";
import {
    Grid,
    Form,
    Input,
    Modal,
    Label
} from "semantic-ui-react";
import '../../Pages/StepPages/stepPage.scss';

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

const User_Modal_Edit = (user) => {
    const [name, setName] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [lineOne, setLineOne] = React.useState(null);
    const [lineTwo, setLineTwo] = React.useState(null);
    const [addstate, setState] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [pincode, setPincode] = React.useState(null);
    const[msg, setMsg]=React.useState(null);
    const submitUser = async (id) => {
        if(!(phone ? phone : user.phone).toString().match(/^[0-9]{8,10}$/)){
            setMsg("Invalid Phone");
            return;
        }
        const url = `${process.env.REACT_APP_BASE_URL}/users/${id}`;
        const jsonPostData = {
            "name": name ? name : user.name,
            "phone": phone ? phone : user.phone,
            "address":
            {
                "addressLineOne": lineOne ? lineOne : user.addressLineOne,
                "addressLineTwo": lineTwo ? lineTwo : user.addressLineTwo,
                "state": addstate ? addstate : user.state,
                "city": city ? city : user.city,
                "pincode": pincode ? pincode : user.pincode,
                "country": country ? country : user.country
            }
        }
        const result = await (
            await fetch(url, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token")
                },
                body: JSON.stringify(jsonPostData),
            })
        ).json();


        /* alert(result.msg); */
        if (result.status === 1){
            user.doRefresh()
            dispatch({ type: "close" });
            setMsg(null);
        }
        else{
            setMsg(result.msg)
        }
    };

    const [state, dispatch] = React.useReducer(exampleVerify, {
        open: false,
        size: undefined,
    });
    const { open, size } = state;

    return (
        <>  
             <p onClick={() => dispatch({ type: "open", size: "small" })}>Edit Profile</p>

            <Modal
                size={size}
                open={open}
                onClose={() => {dispatch({ type: "close" }); setMsg(null)}}
            >
                <Modal.Header>
                    <div className="accept_heading">Edit Profile</div>
                </Modal.Header>
                <Modal.Content>
                    <div className="faq_content">
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='Name'
                                    onChange={(event) => setName(event.target.value)} name='name'
                                    defaultValue={user.name}

                                />
                                <Form.Field
                                    control={Input}
                                    label='Number'
                                    onChange={(event) => setPhone(event.target.value)} name='phone'
                                    defaultValue={user.phone}

                                />
                            </Form.Group>
                            <Grid columns="2" stackable='tablet'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Form.Field>
                                            <label>Address Line 1*</label>
                                            <Input onChange={(event) => setLineOne(event.target.value)} name='lineOne' defaultValue={user.addressLineOne} placeholder='Enter address line 1' />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <label>Address Line 2*</label>
                                            <Input onChange={(event) => setLineTwo(event.target.value)} name='lineTwo' defaultValue={user.addressLineTwo} placeholder='Enter address line 2' />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <label>City*</label>
                                            <Input onChange={(event) => setCity(event.target.value)} name='city' defaultValue={user.city} placeholder='Select city' />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <label>State*</label>
                                            <Input onChange={(event) => setState(event.target.value)} name='state' defaultValue={user.state} placeholder='Select state' />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <label>PIN Code</label>
                                            <Input onChange={(event) => setPincode(event.target.value)} name='pincode' defaultValue={user.pincode} placeholder='Enter PIN code' />
                                        </Form.Field>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Form.Field>
                                            <label>Country</label>
                                            <Input onChange={(event) => setCountry(event.target.value)} name='country' defaultValue={user.country} placeholder='Select country' />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </div>
                </Modal.Content>
                <Modal.Description>
                    <div className="accept_bottom">
                        <button
                            color="black"
                            className="same-btn"
                            onClick={() =>{ dispatch({ type: "close" });setMsg(null)}}
                        >
                            CANCEL
            </button>
                        <button
                            color="black"
                            className="same-btn"
                            onClick={() => submitUser(user.id)}
                        >
                            SAVE
            </button>
                        <br />
                        <br />
                    </div>
                    {msg ? (
                <Label as="a" className="Rejected">
                  {msg}
                </Label>
              ) : (
                <div></div>
              )}
                </Modal.Description>
            </Modal>

        </>
    );
};
export default User_Modal_Edit;

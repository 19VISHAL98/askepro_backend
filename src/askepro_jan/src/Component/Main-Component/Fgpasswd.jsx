import React from 'react';
import { Form } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import Updated from '../popup/updated';
const Login3 = () => {
  const history = useHistory();
  const url = `${process.env.REACT_APP_BASE_URL}/check`;

  const [val, setValue] = React.useState(null);
  const [pop, setPop] = React.useState(false);
  const [msg, setMsg] = React.useState(false);

  const checkUser = async (event) => {
    try {
      event.preventDefault();
      let jsonPostData;
      let email;
      let phone
      const phnumberInt = parseInt(val);
      const ph_pattern = /[0-9]{10}/;
      if (!ph_pattern.test(phnumberInt)) {
        jsonPostData = {
          'email': val,
        }
        email = val;
      }
      else {
        jsonPostData = {
          'phone': phnumberInt,
        }
        phone = phnumberInt;
      }


      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonPostData)
      });
      const data = await result.json()

      if (data.status == 1) {
        
        if (phone)
          localStorage.setItem('phone', data.phone);
        if (email)
          localStorage.setItem('email', data.email);
        history.push('/reset')
      } else {
        setPop(true); 
        setMsg("User with the specific email/phone does not exist");
      }

    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div
        className="loginx"
        style={{
          background: "url(/Assets/images/login.png)",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <Form className="loginx_form3" onSubmit={checkUser}>
          <h3>Forgot Password</h3>
          <Form.Field>
            <label>Email/Phone</label>
            <input onChange={(event) => setValue(event.target.value)} placeholder="Enter your registered email/mobile" />
          </Form.Field>

          <button className="form-btn" type="submit">Submit</button>
          <span class="fgt2">
            <a href="javascript:void(0);" onClick={() => history.push('/register')} href="#">New to Epro? Sign Up here  </a>
          </span>
        </Form>
      </div>

      <Updated wrong={true} open={pop} msg={msg} onClose={() => setPop(false)} />

    </>
  );
}
export default Login3;

import React from "react";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useFormik} from "formik";
import * as Yup from 'yup';



const initialValues = {
    email:"",
    password:"",
    checkbox:""
  };
  
const Username = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/login`;
    const history = useHistory();
  const formik = useFormik({
    initialValues,
    validationSchema:Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
      .min(4, "Passwords must be at least 8 characters in length")
      .required('Required'),
      checkbox: Yup.string()
        .required('Required')
    }),


    onSubmit: async values => {
        alert(JSON.stringify(values, null, 2));

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    const data = await res.json();
    if (data.status == 1 && res.status == 200) {
        history.push('/login');

    }else{
        alert(data.msg);
    }
 },
});


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

        <Form className="loginx_form" onSubmit={formik.handleSubmit}>
          <h3>Login into your account</h3>
          <Form.Field>
            <label>Email</label>
            <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter your Email Address" />
              {formik.touched.email && formik.errors.email ? (
                     <div className="error">
                     <p>Invalid email</p>
                 </div>
              ) : null}
              
          </Form.Field>
          <Form.Field>
            <label> Password</label>
            <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter Password" />
              {formik.touched.password && formik.errors.password ? ( 
                     <div className="error">
                     <p>Invalid password</p>
                 </div>
              ) : null}
          </Form.Field>
          <Form.Field>
            <Checkbox label="I’m not a Robot" id='checkbox' name='checkbox' value={formik.values.checkbox} onClick={formik.handleChange} />
             {formik.touched.checkbox && formik.errors.checkbox? (
                 <div className="error">
                     <p>Please check this box if you want to proceed</p>
                 </div>
             ) :null}
          </Form.Field>
          <span class="fgt1">
            <a href="javascript:void(0);" onClick={() => history.push('/fgpasswd')}>Forgot password?</a>
          </span>

          <button className="form-btn" type="submit">Submit</button>
          <span class="fgt2">
            <a href="javascript:void(0);" onClick={() => history.push('/register')}>New to Epro? Sign Up here</a>
          </span>
        </Form>
      </div>
    </>
  );
};

export default Username;
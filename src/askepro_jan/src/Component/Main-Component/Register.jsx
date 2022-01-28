import _ from "lodash";
import React from "react";
import { Button, Grid, Checkbox, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

const Login2 = () => {
  const url = `${process.env.REACT_APP_BASE_URL}/register`;

  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      phone: Yup.string().trim().matches(/^[0-9]{8,10}$/,"Please Provide a valid phone number").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be greater than 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      values.phone = parseInt(values.phone);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.status == 1 && res.status == 200) {
        history.push("/login");
      } else {
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
        <Form className="loginx_form2" onSubmit={formik.handleSubmit}>
          <h3>Create an Account</h3>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter your name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">
                <p>Please enter name</p>
              </div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Mobile Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="Enter your mobile number"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">
                <p>Please enter valid phone number</p>
              </div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your Email Address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">
                <p>Please enter valid Email</p>
              </div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">
                <p>Please enter Password</p>
              </div>
            ) : null}
          </Form.Field>
          {/*
          <Form.Field>
            <label>Enter OTP</label>
          <div className="otp">
          
            <input style={{width:'70px'}}/>
            <input style={{width:'70px'}}/>
            <input style={{width:'70px'}}/>
            <input style={{width:'70px'}}/>
            <input style={{width:'70px'}}/>
          
          </div>
          
          </Form.Field>
          <span class="fgt1">
             <a href="#">Resend in 01:45</a>
          </span>
          */}
          <button className="form-btn" type="submit">
            Submit
          </button>
          <span class="fgt2">
            <a
              href="javascript:void(0);"
              onClick={() => history.push("/login")}
            >
              Already an existing customer? Login here
            </a>
          </span>
        </Form>
      </div>
    </>
  );
};

export default Login2;

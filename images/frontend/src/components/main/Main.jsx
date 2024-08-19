import React, { useState } from "react";
import "./main.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Main() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formBody = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    console.log(formBody);

    axios
      .post("http://localhost:81/user", formBody)
      .then((response) => {
        // do something with the response data
        console.log(response);
        navigate(`/login`);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="main">
      <h1 className="introtitle">
        Make your own
        <br></br>
        <span style={{ color: "#3772FF" }}>games</span> library in a flash.
      </h1>


      <div className="form">
        <h2 className="formtitle">Create an account now</h2>
        <form onSubmit={handleSubmit}>
          <div className="topform">
            <div className="firstnamediv">
              <label className="label">First name</label>
              <input
                type="text"
                name="firstname"
                className="firstnameinput"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="lastnamediv">
              <label className="label">Last name</label>
              <input
                type="text"
                name="lastname"
                className="lastnameinput"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="bottomform">
            <div className="emaildiv">
              <label className="label">Email</label>
              <input
                type="text"
                name="email"
                className="emailinput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="passworddiv">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="passwordinput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submitregisterdiv">
            <button type="submit" className="registerbtn">
              Register
            </button>
            <p className="signinredirect">
              Already have an account ?
              <a>
                &nbsp;
                <Link
                  to="/login"
                  className="loginbtna"
                  style={{ textDecoration: "none" }}
                >
                  <b className="loginbtn">Click here</b>
                </Link>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

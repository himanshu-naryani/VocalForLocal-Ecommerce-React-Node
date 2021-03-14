import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import swal from 'sweetalert'
import axios from 'axios'
import FAQ from './Faq'
const Help = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState('');
  const changeHandler = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "subject") setSubject(e.target.value);
    else if (e.target.name === "desc") setDesc(e.target.value);
  };

  const submitHandler = () => {
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      setError("Invalid Email format");
      return;
    }
    if (!email) {
      setError("Email cannot be empty");
      return;
    }
    if (!subject) {
      setError("Subject cannot be empty");
      return;
    }
    if (!email && !subject) {
      setError("Email, subject cannot be empty");
      return;
    }
    axios
    .post('/help/contactus',{name:name ,email:email , subject:subject , description:desc})
    .then((res)=>{
      swal("Submitted", "We received your message", "success");
    })
    .catch((err)=>{
      swal("Oops!", "Something went wrong!", "error");
    })
    makeAllEmpty()
  };
  const makeAllEmpty=()=>{
    setError('')
    setName('')
    setEmail('')
    setDesc('')
    setSubject('')
  }
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <form>
            <p className="h2 text-center mb-4" style={{ marginTop: "10%" }}>
              Contact us
            </p>
            <label>Name</label>
            <input
              type="text"
              style={{ borderColor: "black" }}
              name="name"
              value={name}
              onChange={(event) => {
                changeHandler(event);
              }}
              placeholder="Your Name"
              className="form-control"
            />
            <br />
            <label>
              Email<span style={{ fontSize: "15pt" }}>*</span>
            </label>
            <input
              type="email"
              style={{ borderColor: "black" }}
              name="email"
              value={email}
              onChange={(event) => {
                changeHandler(event);
              }}
              placeholder="Your Email"
              className="form-control"
            />
            <br />
            <label className="grey-text">
              Subject<span style={{ fontSize: "15pt" }}>*</span>
            </label>
            <input
              type="text"
              style={{ borderColor: "black" }}
              name="subject"
              value={subject}
              onChange={(event) => {
                changeHandler(event);
              }}
              placeholder="what is your issue?"
              className="form-control"
            />
            <br />
            <label>Description</label>
            <textarea
              style={{ borderColor: "black" }}
              name="desc"
              value={desc}
              onChange={(event) => {
                changeHandler(event);
              }}
              placeholder="Describe your Issue/fedback here"
              type="text"
              className="form-control"
              rows="4"
            />
            <div className="text-center mt-4">
              <MDBBtn
                color="primary"
                outline
                onClick={submitHandler}
                style={{ color: "white", marginBottom:"8%" }}
              >
                Send
                <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
              {error.length>0  && <p style={{color:"red" ,textAlign:"center"}}>{error}</p>}
            </div>
          </form>
        </MDBCol>
      </MDBRow>
      <FAQ/>
    </MDBContainer>
  );
};

export default Help;

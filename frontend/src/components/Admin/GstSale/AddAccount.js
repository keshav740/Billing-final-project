import React, { useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Form, Link, useNavigate, } from 'react-router-dom'
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillSetting } from 'react-icons/ai';
import { IoIosCreate } from 'react-icons/io';
import axios from 'axios'
import { toast } from 'react-toastify';


const AddAccount = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstnumber] = useState("");
  const navigate = useNavigate();


  const submitform = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/account/new", {
        "name": name,
        "phoneNumber": phoneNumber,
        "email": email,
        "address": address,
        "gstNumber": gstNumber,
      });
      toast.success("Account Added Successfully");
      navigate("/addaccount-list");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Layout />
      <Container style={{ width: '90%', marginTop: '20px' }}>
        <Table striped bordered hover className="main-table">
          <thead>
            <tr>
              <th>
                <h5>
                  <AiFillDashboard /> &nbsp;Dasboard / Add-Account
                </h5>
              </th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="table-div">
                   

<Button className="table-btn" variant="success" onClick={()=> navigate("/addaccount-list")} >
                      <IoIosCreate />&nbsp;
                      Account List
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>

        </Row>
      </Container>


      <div className="form-div">
        <Container>
          <Row>
            <form className="row g-4 p-3 registration-form">
              <div class="col-md-4 position-relative">
                <label className="label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Phone No</label>
                <input
                  type="text"
                  class="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Email ID</label>
                <input
                  type="text"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div class="col-md-4 position-relative">
                <label className="label">GST No</label>
                <input
                  type="text"
                  class="form-control"
                  value={gstNumber}
                  onChange={(e) => setGstnumber(e.target.value)}
                  required
                />
              </div>

              <center>
                <Button
                  className="stu_btn"
                  variant="success"
                  type="submit"
                  onClick={(event) => submitform(event)}
                >
                  Submit
                </Button>
              </center>
            </form>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AddAccount

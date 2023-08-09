
import React, { useEffect, useState } from 'react'
import Layout from '../../Header/Layout'
import { Button, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { IoIosCreate } from "react-icons/io";
import axios from 'axios'
import './purchase.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const SaleOrderHistory = "http://localhost:4000/api/v1/gstsalehistories"

const Gstsalehistory = ({ items }) => {
    const [getpurchase, setGetpurchase] = useState(null);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
const navigate= useNavigate();

    useEffect(() => {
        axios.get(SaleOrderHistory).then((response) => {
            setGetpurchase(response.data)
            console.log(response)
        })
    }, [])

    const handleSearch = (id) => {
        // console.log(id)
        axios.get(`http://localhost:4000/api/v1/gstsalehistory/${startDate}/${endDate}`).then(response => {
            setGetpurchase(response.data)

            // alert("Item has been deleted successfully")
            toast.success("Order Fetched Succesfully")
        })
            .catch(error => {
                console.log(error)
            })

    }
    const groupItemsByCustomer = () => {
        const groupedItems = {};
        if (getpurchase && getpurchase.gstsalehistory_orders) {
            getpurchase.gstsalehistory_orders.forEach((saleHistoryItem) => {
                const { name, createdDate, phoneNumber ,gstNumber} = saleHistoryItem;
                if (!groupedItems[name]) {
                    groupedItems[name] = {
                        createdDate,
                        phoneNumber,
                        name,
                        gstNumber,
                        items: [],
                    };
                }
                groupedItems[name].items.push(...saleHistoryItem.Items);
            });
        }
        return groupedItems;
    };

    const groupedItems = groupItemsByCustomer();


    // if (!getpurchase) return null;
    return (
        <>
            <Layout />
            <Container className='main-col' >
                <Table striped bordered hover className='main-table'>
                    <thead>
                        <tr>
                            <th><h5><AiFillDashboard /> &nbsp; Dashboard/ GST Sale History</h5></th>
                        </tr>
                    </thead>
                </Table>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <div className='table-div' >
                                    <Button className="table-btn" variant="success" onClick={()=> navigate("/gstsale")} >
                      <IoIosCreate />&nbsp;
                       New Sale
                    </Button>
                                        {/* <Button className='table-btn' variant="light" >
                                            <IoIosCreate />&nbsp;<Link to="/gstsale">Create</Link>
                                        </Button> */}
                                        <span className='date-button'>
                                            Start Date :-
                                            <input
                                                type='date'
                                                value={startDate}
                                                className='date-input'
                                                onChange={(event) => { setStartDate(event.target.value) }}

                                            />
                                        </span>


                                        <span className='date-button'>
                                            End Date :-
                                            <input
                                                type='date'
                                                value={endDate}
                                                className='date-input'
                                                onChange={(event) => { setEndDate(event.target.value) }}
                                            />
                                        </span>

                                        <Button className='table-btn' variant="success" onClick={handleSearch} >
                                            Filter
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </Table>

                </Row>
            </Container>


            <div className='form-div' >
                <h5 className="w3-center w3-flat-midnight-blue w3-padding-48 w3-border-blue-grey w3-grey text text-center mb-5 mt-3">GST Sale Details</h5>
                
                <Container>
                    <Row>
                    <span className='note'>Note:<h6 className='note-text'>By default you have current month history</h6></span >

                        <Table responsive>
                            <table className="table table-bordered border-secondary">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Customer Name</th>
                                        <th>Phone Number</th>
                                        <th>GST Number</th>
                                        <th>Item Name</th>
                                        <th>Price Per Item</th>
                                        <th>Quantity</th>
                                        <th>Price Without GST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(groupedItems).map((groupedItem, index) => (
                                        <tr key={index}>
                                            <td>{groupedItem.createdDate}</td>
                                            <td>{groupedItem.name}</td>
                                            <td>{groupedItem.phoneNumber}</td>
                                            <td>{groupedItem.gstNumber}</td>
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.itemName}
                                                    </div>
                                                ))}
                                            </td>
                                           
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.pricePerItem}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.quantity}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.amountWithoutGST}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.cgstapplied}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.sgstapplied}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {groupedItem.items.map((item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        {item.totalPrice}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Table>
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default Gstsalehistory;

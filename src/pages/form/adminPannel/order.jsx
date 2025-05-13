import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './order.css'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer, toast } from "react-toastify";
// import PhoneInput from 'react-phone-input-2'



const OrderForm  = () => {
    const [formData, setFormData] = useState({
        NameOfOrder: '',
        quantity: '',
        amount: '',
        totalAmount: '',
        nameOfPerson: '',
        address: '',
        pinCode: '' 
    })

    const [message, setMessage] = useState('');
    const tokenData = localStorage.getItem('userInfo');
    const authentication = JSON.parse(tokenData);
    const navigate = useNavigate();
    
      useEffect(() => {
        if (authentication == null) {
          navigate('/login');
        }
      }, [authentication, navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = authentication?.token;
            console.log(formData);//Debug: check form data before submitting

            const response = await axios.post(' https://foodbackend-hfrx.onrender.com/addOrder', formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            })
            console.log(response)

            setMessage('Order Successful!')
            setFormData({
                NameOfOrder:'foodName',
                quantity:'',
                amount:'',
                totalAmount:'',
                nameOfPerson:'',
                address:'',
                pinCode:''
            });
            navigate('/login')

        }catch(error){
            setMessage('Error during order:'+(error.response?.data?.message||error.message))
        }
    }
    return(
        <div className='orderContainer'>
            <div className='orderbox1'>
                <form className='orderbox2' onSubmit={handleSubmit}>
                    <p>{message}</p>
                    <h1>Place Order</h1>
                        {/* <label className='orderLabel' htmlFor="first">FoodName: </label> */}
                        <input className='orderInput' type="text" id='first' name='NameOfOrder' placeholder='Food Name' value={formData.NameOfOrder} onChange={handleChange} />
                    {/* <label className='orderLabel' htmlFor="quantity">Quantity: </label> */}
                    <input className='orderInput' type="text" id='quantity' name='quantity'placeholder='Quantity' value={formData.quantity} onChange={handleChange} />
                    {/* <label className='orderLabel' htmlFor="amount">Amount: </label> */}
                    <input className='orderInput' type="amount" id='amount' name='amount'placeholder='Price' value={formData.amount} onChange={handleChange}/>
                    {/* <label className='orderLabel' htmlFor="totalamount">Total Amount: </label> */}
                    <input className='orderInput' type="totalamount" id='totalamount' name='totalAmount'placeholder='Total Amount' value={formData.totalAmount} onChange={handleChange}/>
                    {/* <label className='orderLabel' htmlFor="personName">Person Name: </label> */}
                    <input className='orderInput' type='text' id='text' name='nameOfPerson'placeholder='Person Name' value={formData.nameOfPerson} onChange={handleChange}/>
                    {/* <label className='orderLabel' htmlFor="address">Address: </label> */}
                    <input className='orderInput' type='text' id='text' name='address'placeholder='Address' value={formData.address} onChange={handleChange}/>
                    {/* <label className='orderLabel' htmlFor="pinCode">Pin Code: </label> */}
                    <input className='orderInput' type='text' id='text' name='pinCode' placeholder='Pin Code' value={formData.pinCode} onChange={handleChange}/>
                    <button className='subButton'>submit</button>
                    

                    {/* <Link to={'/login '}>click here for login</Link> */}

                    
                </form>
            
            </div>
            <ToastContainer />
        </div>
    )
}

export default OrderForm;
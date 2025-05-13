import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import './form.css'



const Form  = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile_number: '',
        authType: 'Owner' //ensure there's a default value
    })

    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            console.log(formData);//Debug: check form data before submitting

            const response = await axios.post('https://foodbackend-hfrx.onrender.com/register', formData,
            {
                headers:{'Content-Type':'application/json'},
            })
            console.log(response)

            setMessage('Registration Successful!')
            setFormData({
                name:'',
                email:'',
                password:'',
                mobile_number:'',
                authType:'Owner'
            });
            navigate('/login')

        }catch(error){
            setMessage('Error during registration:'+(error.response?.data?.message||error.message))
        }
    }
    return(
        <div className='formbox' >
            <div className='box12' >
                <form className='formbox1' onSubmit={handleSubmit}>
                    <p>{message}</p>
                    <h1 className='signuph1'>Sign Up</h1>
                    <input className='formInput' type="text" id='first' placeholder='Enter your name' name='name' value={formData.name} onChange={handleChange} /><br /><br />
                    <input className='formInput' type="email" id='email' name='email' placeholder='Enter email' value={formData.email} onChange={handleChange} /><br></br><br />
                    <input className='formInput' type="password" id='password' name='password' placeholder='Enter password' value={formData.password} onChange={handleChange}/><br /><br />
                    <div className="phnno"><PhoneInput 
                    country={"us"}
                    value={formData.mobile_number}
                    onChange={(value) => setFormData({...formData, mobile_number:value})}
                    containerStyle={{width:"400px",background:"red",borderRadius:"20px"}}
                    inputStyle={{width:"400px",borderRadius:"20px"}}
                    placeholder='Enter mobile number'
                    inputProps={{
                        name:"mobile_number",
                        required:true,
                        autoFocus:true
                    }}/></div>
                    <div className="user-type"> <select name='authType' value={formData.authType} onChange={handleChange}>
                            <option value="">Owner</option>
                            <option type="user">Customer</option>
                        </select>
                    </div><br />
                    <button className='signupbtn'>submit</button>

                    <Link to={'/login '}>click here for login</Link>

                    
                </form>
            
            </div>
        </div>
    )
}

export default Form;
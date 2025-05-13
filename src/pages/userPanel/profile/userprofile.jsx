import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './userprofile.css';
import profileContext from '../../../context/profileContext';
import { Link } from 'react-router-dom';


function Profile () {
    // const [detail, setDetail] = useState({});
    // const userDetail = localStorage.getItem("userInfo");
    // const authentication = JSON.parse(userDetail);
    const [name, setName] = useState('');
    

    const {profile} = useContext(profileContext)

    // useEffect(() => {
    //     async function fetchProfile() {
    //         const response = await axios.get("https://foodbackend-hfrx.onrender.com/getLog", {
    //             headers: {
    //                 Authorization: `Bearer ${authentication.token}`
    //             }
    //         });
    //         console.log(response);
    //         setDetail(response.data);
            
    //     }
    //     fetchProfile();
    // }, []);

    useEffect(() => {
        if(profile?.name){
            function getInitials(name){
                return name.split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase();
            }
            setName(getInitials(profile?.name));
        }
    }, [profile]);



    return(
        <div className='profilecontainer'>
        <div className="profilebox1">
            
            {/* <div className="profilebox2"> */}
                {/* <img src="/public/images/profile.png" alt="" /> */}
                <h1 className="profilebox2">{name}</h1>
            {/* </div> */}
            <h2>{profile?.name}</h2>
            <h4>Email: {profile?.email}</h4>
            {/* <h4>Password</h4> */}
            <h4>Mobile number: {profile?.mobile_number}</h4>
            <Link to={`/updateuser/${profile?._id}`} style={
                {
                    width:"100%",
                    textAlign:"center"
                }
            }><button className='usercardbtn'>Edit</button></Link>
            
        

        </div>
        </div>
    )
}
export default Profile
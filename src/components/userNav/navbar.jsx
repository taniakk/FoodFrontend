import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { CgProfile } from "react-icons/cg";
import { useContext } from 'react';
import AuthContext from '../../context/authContext.jsx';
import profileContext from '../../context/profileContext.jsx';
import cartContext from '../../context/cartContext.jsx';
// import { FiShoppingCart } from "react-icons/fi";

function UserNav() {
    const {auth, logout} = useContext(AuthContext);
    const {profile} = useContext(profileContext)
    const {count} = useContext(cartContext)
    console.log(count)
    const useNAme = profile?.name?.split(" ")[0]
    console.log(useNAme)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login")
    };

    return (
        <>
            <div className="usernav">

                <div className="userlogobox">
                    <img src={"/image/foodlogo2.png"} alt="" srcset="" height={"50px"} width={"200px"}  />
                </div>

                {/* Navbar part */}
                <div className="usernavbox">
                    <nav className="navbar navbar-expand-lg userinsidenav shadow-none">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav w-100 d-flex justify-content-center">
                                    <li className="nav-item">
                                                    <Link to={"/"} className="nav-link" aria-current="page" href="#">Home</Link>
                                                  </li>
                                                  {/* <li className="nav-item">
                                                    <Link to={"/food"} className="nav-link" aria-current="page" href="#">Food</Link>
                                                  </li> */}
                                                  {/* <li className="nav-item">
                                                    <Link to={"/category"} className="nav-link" aria-current="page" href="#">Categories</Link>
                                                  </li> */}
                                                  <li className="nav-item">
                                                    <Link to={"/foods"} className="nav-link" aria-current="page" href="#">Foods</Link>
                                                  </li>
                                                  <li className="nav-item">
                                                    <Link to={"/orderfood"} className="nav-link" aria-current="page" href="#">Order</Link>
                                                  </li>
                                                  
                                                  {/* { auth !== null &&      <li className="nav-item">
                                                    <Link to={"/profile"} className="nav-link" aria-current="page" href="#">Profile</Link>
                                                  </li>} */}
                                                  
                                                  
                                                  
                                               { auth !== null && <Link to={"/profile"} style={{textDecoration:"none"}}>   <li style={{ display:"flex",flexDirection:"row"}}>
                                                 <span> <CgProfile color='blue' fontSize={"2vw"} style={{marginBottom:"-12px"}} /></span>
                                                 <span>  
                                                     <a className="nav-link" aria-current="page" href="#">{useNAme}</a>
                                                 </span>
                                                 </li> </Link>
                                                 }
                                              { auth !== null &&   <li className='nav-item' style={{ display:"flex",flexDirection:"row",width:"auto"}}>
                                                 <span style={{color:"blue",textAlign:"center",height:"30px",width:"30px",marginTop:".2vw",border:"2px solid blue"}}>{count || 0}</span>
                                                    <span> <Link to={"/cartpage"}className="nav-link" aria-current="page" href="#">Cart</Link>
                                                    </span>
                                                 
                                                  </li>
                                                 
                                                  }
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* Navbar part end */}

                <div className="userbtnbox">
                    {/* If the user is logged in, show "Logout", otherwise show "Sign Up" and "Sign In" */}
                    {auth ? (
                        <button className='userNavbtn' onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <button className='userNavbtn'>
                                <Link to={'/register'} style={{ textDecoration: 'none', color: '#fff' }}>Sign Up</Link>
                            </button>
                            <button className='userNavbtn'>
                                <Link to={'/login'} style={{ textDecoration: 'none', color: '#fff' }}>Sign In</Link>
                            </button>
                            
                        </>
                    )}
                </div>
                {/* auth ? "true": "false" */}

            </div>
        </>
    )
}

export default UserNav;

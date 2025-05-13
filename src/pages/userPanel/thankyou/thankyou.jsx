import { Link } from 'react-router-dom';
import './thankyou.css'
import { TiTick } from "react-icons/ti";
function Thankyou () {
    return(
        <>
      <div className="container-fluid border border-black  main-container mt-5" >
        <div className="container border  sml-container border-primary p-3">
            <div className="row">
                <div className="col-12 d-flex flex-column justify-content-center align-items-center" id="thxx">
            <img src="" alt="" srcset='/images/hero-img.png' className='thankyou'/>
           <div className="big-txt">THANK YOU</div>
           <h6 className='order'>for ordering!</h6>
           <TiTick className='tick' />
           <Link to={'/'}><button className="thx-btn">Home</button></Link>
           <p>Thankyou for your order! we appreciate and we are greatful for your support. your support means everything.thankyou for being  our valued customer! 😊😊</p>
            </div>
            </div>
        </div>
      </div>
        </>
    )
    
}
export default Thankyou;
import Cards from "../../../components/card/card";
import './popularFood.css';
function PopularFood() {
    return(
        <>
        <div className="newPopularFoodContainer">
        <div className="newPopularFoodbox1">
            <h2 className="pop-h">Popular Food Right Now</h2>
        </div>
        <div className="newPopularFoodbox2 " >
        <Cards img={'public/images/11.jpg'} heding={'First'} 
         he={"400px"}
        wi={"300px"}
        />


        <Cards img={'public/images/12.jpg'} heding={'Second'} 
         he={"400px"}
         wi={"300px"}
        />




        <Cards img={'public/images/chikenburger.jpg'} heding={'Third'} 
      he={"400px"}
      wi={"300px"}
        />


        <Cards img={'public/images/rajmachawal.jpg'} heding={'Fourth'} 
   he={"400px"}
   wi={"300px"}
        />

        {/* <Cards img={'public/images/13.jpg'} heding={'Fifth'} para={'Lorem jxhncrtiuvwh5mnb5c y46ebu65evue56uvr6cyer yer yer yc e y ver y vewr y eb  beruvtr ubr u vru vtru v rev sywery vewyvewtyver rey v ery vtryuvvtrubrtburtburt  vtr u vt uvtr ub retubv trubrtuburtbuytk rtvyhsubukrdvryveyj'}/> */}


        </div>


        

      </div>

        
        </>
    )
}
export default PopularFood
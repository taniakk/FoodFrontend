// import './App.css'
import Form from "./pages/form/form.jsx";
import{Routes,Route} from 'react-router-dom'
import Login from "./pages/form/login.jsx";
// import Nav from "./components/adminNav/navbar.jsx";
import Hero from "./pages/form/adminPannel/hero.jsx";
import Category from "./pages/form/category.jsx";
import Subcategory from "./pages/form/subcategory.jsx";
// import Card from "./components/card.jsx";
import Foodtable from "./pages/form/tableDetail/FoodTable.jsx";
import UserHero from "./pages/userPanel/userHero/userHero.jsx";
import Food from "./pages/form/adminPannel/food.jsx";
// import UserNav from "./pages/userPanel/userNAv/navbar.jsx";
import AuthContext, { AuthProvider } from "./context/authContext.jsx";
import UserNav from "./components/userNav/navbar.jsx";
import Nav from "./components/adminNav/navbar.jsx";
import Ordertable from "./pages/form/tableDetail/orderTable.jsx";
import Paymenttable from "./pages/form/tableDetail/paymentTable.jsx";
import OrderForm from "./pages/form/adminPannel/order.jsx";
import Subcategorytable from "./pages/form/tableDetail/subcategoryTable.jsx";
import CategoryTable from "./pages/form/tableDetail/categoryTable.jsx";
import SubCategoryPage from "./pages/userPanel/subCat/subCat.jsx";
import Cards from "./components/card/card.jsx";
import FoodPage from "./pages/form/showfood/showfood.jsx";
import Profile from "./pages/userPanel/profile/userprofile.jsx";
import { useContext } from "react";
import Foods from "./pages/userPanel/foodItems/foods.jsx";
import FoodListing from "./pages/userPanel/singlefood.jsx";
// import TopOffers from "./pages/userPanel/offerslider.jsx";
import Cart from "./pages/userPanel/cart/cart.jsx";
import Payment from "./pages/userPanel/payment/payment.jsx";
import OrderFood from "./pages/userPanel/order/ORDER.jsx";
import Update from "./pages/userPanel/update/update.jsx";
import Assistant from "./ai/assistent.jsx";
import UserTable from "./pages/form/adminPannel/userDetail/userTable.jsx";
import Thankyou from "./pages/userPanel/thankyou/thankyou.jsx";
import MediaCard from "./pages/userPanel/OurTeam/ourteam.jsx";
// import UpdateFood from "./pages/form/updateFood.jsx";
// import Navbar from "./pages/userPanel/userNAv/navbar.jsx";

function App() {
  const {auth} = useContext(AuthContext)
  

  console.log(auth)
//   const [auth, setAuth] = useState('User')

//   useEffect(() => {
//     const userDetail = localStorage.getItem("userInfo")
//     if(userDetail) {
//       const authentication = JSON.parse(userDetail)
//       setAuth(authentication.authType)
//     }
//   }, [])

  return (
    <>
    {
      auth === "Owner" ? <Nav /> : <UserNav />
    }
   
      {/* <First/> */}
      <Routes>
        <Route path='/register' element={<Form />}></Route>
        <Route path='/login' element={<Login />}></Route>
        {/* {<Route path="/navbar" element={<Nav />}></Route>} */}
        {<Route path="/hero" element={<Hero />}></Route>}
        {<Route path="/showFood" element={<Foodtable/>}></Route>}
        {<Route path="/category" element={<Category />}></Route>}
        {<Route path="/subcat" element={<Subcategory />}></Route>}
        {<Route path="/card" element={<Cards />}></Route>}
        {<Route path="/" element={<UserHero />}></Route>}
        {<Route path="/food" element={<Food />}></Route>}
        {/* {<Route path="/UpdateFood" element={<UpdateFood />}></Route>} */}
        {<Route path="/order" element={<Ordertable />}></Route>}
        {<Route path="/payment" element={<Paymenttable />}></Route>}
        {<Route path="/addorder" element={<OrderForm />}></Route>}
        {<Route path="showsubcategory" element={<Subcategorytable />}></Route>}
        {<Route path="showcategory" element={<CategoryTable />}></Route>}
        <Route path="/subcategory/:id" element={<SubCategoryPage />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/foods" element={<Foods />} />
        {/* <Route path="/foods" element={<Foods />} /> */}
        <Route path="/single/:id" element={<FoodListing />} />
        {/* <Route path="/topoffer" element={<TopOffers />} /> */}
        <Route path="/cartpage" element={<Cart />} />
        <Route path="/pay/:id" element={<Payment />} />
                {/* {<Route path="/userNav" element={<UserNav />}></Route>} */}
        <Route path="/orderfood" element={<OrderFood />} />
        <Route path="/updateuser/:id" element={<Update />} />
        <Route path="/assistent" element={<Assistant />} />
        <Route path="/usertable" element={<UserTable/>} />
        <Route path="/thanks" element={<Thankyou />} />
        <Route path="/OurTeam" element={<MediaCard />} />
        </Routes>
    </>
  )
}

export default App;

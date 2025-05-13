import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Modal, Box, Button, TextField } from "@mui/material";
import { ImCross } from "react-icons/im";
import { PiNotePencilBold } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";

function Foodtable() {
  const navigate = useNavigate();

  const userDetail = localStorage.getItem('userInfo');
  const authentication = JSON.parse(userDetail);

  useEffect(() => {
    if (authentication == null) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  const [foodName, setFoodName] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [updatedFood, setUpdatedFood] = useState({ foodName: '', foodIngredients: '', price: '' });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get('https://foodbackend-hfrx.onrender.com/read');
        setFoodName(response.data);
      } catch (error) {
        console.error('Error during fetching Food', error);
      }
    };
    fetchFood();
  }, []);

  const deleteStatus = async (id) => {
    try {
      const response = await axios.delete(`https://foodbackend-hfrx.onrender.com/deleteFood/${id}`);
      toast.success("Delete Successfully");
      setFoodName((prevState) => prevState.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting food item', error);
    }
  };

  const handleOpenModal = (food) => {
    setSelectedFood(food);
    setUpdatedFood({
      foodName: food.foodName,
      foodIngredients: food.foodIngredients,
      price: food.price
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFood(null);
  };

  const handleUpdateFood = async () => {
    try {
      const response = await axios.put(`https://foodbackend-hfrx.onrender.com/updateFood/${selectedFood._id}`, updatedFood);
      toast.success("Food updated successfully");
      setFoodName((prevState) =>
        prevState.map((food) =>
          food._id === selectedFood._id ? { ...food, ...updatedFood } : food
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating food item', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 240 },
    { field: 'foodName', headerName: 'Food Name', width: 200 },
    { field: 'foodIngredients', headerName: 'Food Ingredients', width: 180 },
    { field: 'price', headerName: 'Price', width: 100 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <div style={{ margin: '10px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            src={params.value}
            alt="property"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        </div>
      ),
    },
    {
      field: 'action', headerName: 'Action', width: 140, sortable: false,
      renderCell: (params) => (
        <div>
          <PiNotePencilBold
            onClick={() => handleOpenModal(params.row)}
            fontSize={"1.5em"}
            style={{
              margin: "10px",
              cursor: "pointer",
              transition: "transform 0.2s", // Smooth transition
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <ImCross
            onClick={() => deleteStatus(params.row._id)}
            fontSize={"1.5em"}
            style={{
              margin: "10px",
              cursor: "pointer",
              transition: "transform 0.2s", // Smooth transition
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="subContainer" style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Paper sx={{ height: 400, width: '95%', padding: 2 }}>
          <DataGrid
            rows={foodName}
            columns={columns}
            getRowId={(food) => food._id}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>

        {/* Modal for Editing Food */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', bgcolor: 'white', padding: 4, borderRadius: 2,
            boxShadow: 24, width: 400
          }}>
            <h2 id="modal-title">Update Food</h2>
            <TextField
              label="Food Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedFood.foodName}
              onChange={(e) => setUpdatedFood({ ...updatedFood, foodName: e.target.value })}
            />
            <TextField
              label="Food Ingredients"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedFood.foodIngredients}
              onChange={(e) => setUpdatedFood({ ...updatedFood, foodIngredients: e.target.value })}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedFood.price}
              onChange={(e) => setUpdatedFood({ ...updatedFood, price: e.target.value })}
            />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleUpdateFood}>
                Update
              </Button>
            </div>
          </Box>
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
}

export default Foodtable;

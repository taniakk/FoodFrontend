import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { ImCross } from "react-icons/im";

function Subcategorytable() {

    const navigate = useNavigate();

    const userDetail = localStorage.getItem('userInfo')
    const authentication = JSON.parse(userDetail)

    useEffect(() => {
        if(!authentication){
            navigate('/login')
        }
    }, [navigate]);

    const [subcategoryName, setsubcategoryName] = useState([])

    useEffect(() => {
        const fetchsubCategories = async () => {
            try {
                const response = await axios.get('https://foodbackend-hfrx.onrender.com/subRead', {
                    headers: {
                        Authorization: `Bearer ${authentication?.token}`
                    }
                });

                // Log the response to inspect the structure
                console.log(response, "response");

                // Transform the data if necessary
                const transformedData = response.data.map(item => ({
                    _id: item._id,
                    Subcategory_name: item.Subcategory_name,
                    Category: item.categoryId.Category
                }));

                // Set the transformed data to the state
                setsubcategoryName(transformedData);

            } catch (error) {
                console.error('Error during fetching sub-categories', error);
            }
        };

        fetchsubCategories();
    }, [authentication]);

    const updateStatus = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://foodbackend-hfrx.onrender.com/subcategorieDelete/${id}`);
                    setsubcategoryName(prevCategory => prevCategory.filter(item => item._id !== id));
                    Swal.fire('Deleted!', 'The course has been deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete the course. Please try again.', 'error');
                    console.error('Error:', error);
                }
            }
        });
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 340 },
        { field: 'Subcategory_name', headerName: 'SubCategory Name', width: 340 },
        { field: 'Category', headerName: 'Category Name', width: 340 },
        {
            field: 'action', headerName: 'Action', width: 140, sortable: false,
            renderCell: (params) => (
                <div>
                    <ImCross
                        onClick={() => updateStatus(params.row._id)}
                        fontSize={"1.5em"}
                        style={{
                            margin: "10px",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="subContainer" style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Paper sx={{ height: 400, width: '80%', padding: 2 }}>
                <DataGrid
                    rows={subcategoryName}
                    columns={columns}
                    getRowId={(subcategory) => subcategory._id}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default Subcategorytable;

import { useEffect, useState } from "react";
import axios from "axios";
import {DataGrid} from '@mui/x-data-grid';
import { Paper } from "@mui/material";

const columns = [
    { field: '_id', headerName: 'ID', width: 340},
    { field: 'name', headerName: 'User Name', width: 140},
    { field: 'email', headerName: 'Email', width: 140},
    // { field: 'password', headerName: 'Password', width: 140},
    { field: 'mobile_number', headerName: 'Mobile Number', width: 140},
    { field: 'authType', headerName: 'Auth Type', width: 140}
]
function UserTable() {
    const [row, setRow] = useState([])

    const userDetail = localStorage.getItem("userInfo");

    const authentication = JSON.parse(userDetail);
    console.log(authentication)

    useEffect(() => {
        async function fetchUserTable() {
            try {
                const response = await axios.get('https://foodbackend-hfrx.onrender.com/getdata', {
                  headers: {
                    Authorization: `bearer ${authentication.token}`
                  }
                });
                console.log(response.data)
                setRow(response.data); 
                
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchUserTable();

    }, [])

    const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row} // Updated prop 'rows' instead of 'row'
        columns={columns}
        getRowId={(row) => row._id} // Use '_id' as the unique identifier
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default UserTable;


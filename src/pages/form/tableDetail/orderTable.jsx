import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Select,
  MenuItem,
  IconButton,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Ordertable() {
  const navigate = useNavigate();
  const userDetail = localStorage.getItem("userInfo");
  const authentication = JSON.parse(userDetail);
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    if (!authentication) {
      navigate("/login");
    }
  }, [authentication, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = authentication?.token;
        const response = await axios.get("https://foodbackend-hfrx.onrender.com/getOrders");

        const flatRows = [];
        let serial = 1;
        response.data.orders.forEach((order) => {
          order.items.forEach((item, itemIndex) => {
            flatRows.push({
              id: `${order._id}-${itemIndex}`,
              orderId: order._id,
              srNo: serial++,
              foodName: item.foodId?.foodName,
              quantity: item.quantity,
              price: item.price,
              totalAmount: order.totalAmount,
              personName: order.userId?.name,
              address: order.address,
              pinCode: order.pinCode,
              status: order.status,
              date: new Date(order.createdAt).toLocaleDateString(),
            });
          });
        });

        setRows(flatRows);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus)
    try {
      const token = authentication?.token;
      await axios.put(
        `https://foodbackend-hfrx.onrender.com/updateOrder/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRows((prevRows) =>
        prevRows.map((row) =>
          row.orderId === orderId ? { ...row, status: newStatus } : row
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    { field: "srNo", headerName: "Sr No.", width: 80 },
    { field: "foodName", headerName: "Food Name", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "totalAmount", headerName: "Total Amount", width: 130 },
    { field: "personName", headerName: "Person Name", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "pinCode", headerName: "Pin Code", width: 100 },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const isEditing = editingId === params.row.orderId;
        return isEditing ? (
          <Select
            value={updatedStatus}
            onChange={(e) =>
              handleStatusChange(params.row.orderId, e.target.value)
            }
            size="small"
          >
            
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        ) : (
          params.row.status
        );
      },
    },
    {
      field: "actions",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => (
        <Tooltip title="Edit Status">
          <IconButton
            onClick={() => {
              setEditingId(params.row.orderId);
              setUpdatedStatus(params.row.status);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "90%", margin: "20px auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
      />
    </Box>
  );
}

export default Ordertable;

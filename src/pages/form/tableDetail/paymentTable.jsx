import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

function PaymentTable() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  const userDetail = localStorage.getItem('userInfo');
  const authentication = JSON.parse(userDetail);

  useEffect(() => {
    if (!authentication) {
      navigate("/login");
    }
  }, [authentication, navigate]);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const token = authentication.token;
        const response = await axios.get("https://foodbackend-hfrx.onrender.com/readPayment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const normalizedPayments = response.data.payments.map((item, index) => ({
          id: item._id,
          paymentType: item.paymentType || item.payment_type,
          amount: item.amount,
          cartType: item.paymentType || "-",
          cvcCode: item.cvc_code || "-",
          paymentStatus: item.paymentStatus,
          orderId: item.orderId?._id || "-",
          createdAt: new Date(item.createdAt).toLocaleString(),
        }));

        setPayments(normalizedPayments);
      } catch (error) {
        console.error("Error during fetching payment", error);
      }
    };

    fetchPayment();
  }, [authentication]);

  const columns = [
    { field: "id", headerName: "Payment ID", flex: 1 },
    { field: "paymentType", headerName: "Payment Type", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "cartType", headerName: "Cart Type", flex: 1 },
    { field: "cvcCode", headerName: "CVC Code", flex: 1 },
    { field: "paymentStatus", headerName: "Status", flex: 1 },
    { field: "orderId", headerName: "Order ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1.5 },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', padding: 2 }}>
      <Paper elevation={3} sx={{ height: '100%', padding: 2 }}>
        <DataGrid
          rows={payments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
        />
      </Paper>
    </Box>
  );
}

export default PaymentTable;

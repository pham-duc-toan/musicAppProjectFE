import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { GetAccessTokenFromCookie } from "@/app/utils/checkRole";
import { apiBasicServer } from "@/app/utils/request";
import { decodeToken } from "@/app/helper/jwt";
import { redirect } from "next/navigation";
import RefreshIcon from "./components/RefreshIcon";

// Định nghĩa giao diện cho order
interface Order {
  _id: string;
  orderId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const HistoryTable = async () => {
  let orders = [];
  const accessToken = GetAccessTokenFromCookie();
  const info = decodeToken(accessToken.value || undefined);
  try {
    const res = await apiBasicServer(
      "GET",
      `/orders/${info?._id}`,
      undefined,
      undefined,
      undefined,
      ["revalidate-tag-orders"]
    );

    orders = res?.data || [];
  } catch (error) {
    redirect("/");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "40px" }}>Lịch sử giao dịch</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Đơn hàng</TableCell>
              <TableCell>Trạng thái đơn hàng</TableCell>
              <TableCell>Trạng thái ca sĩ</TableCell>
              <TableCell>Thời gian tạo</TableCell>
              <TableCell>Thời gian cập nhật</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order: Order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.message}</TableCell>
                  <TableCell>
                    {order.status === "init" ? "Chưa tạo" : "Đã tạo"}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {new Date(order.createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(order.updatedAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {new Date(order.updatedAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <RefreshIcon orderId={order?.orderId || ""} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" fontStyle="italic">
                    Không có đơn hàng nào
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryTable;

package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import model.bean.CartDTO;
import model.bean.OrderDTO;
import model.bean.ShoppingCart;

public class OrderDAO {

    public List<OrderDTO> read() {
        List<OrderDTO> pedidos = new ArrayList<>();
        String sql = "SELECT * FROM orders";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                OrderDTO objOrder = new OrderDTO();
                objOrder.setIdOrder(rs.getInt("id_order"));
                objOrder.setUserId(rs.getInt("user_id"));
                objOrder.setStatusPayment(rs.getString("status"));
                objOrder.setMethodPayment(rs.getString("method_payment"));
                objOrder.setTotalValue(rs.getFloat("total_value"));
                objOrder.setDateTime(rs.getString("date_time"));
                objOrder.setAddressId(rs.getInt("adress_id"));
                pedidos.add(objOrder);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro leirura de pedidos: " + e);
        }
        return pedidos;
    }

    public void insertOrder(OrderDTO objOrder, List<CartDTO> cartItens) {
        String sql = "INSERT INTO orders (user_id, adress_id, method_payment, total_value, date_time) VALUES (?, ?, ?, ?, NOW())";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, objOrder.getUserId());
            stmt.setInt(2, objOrder.getAddressId());
            stmt.setString(3, objOrder.getMethodPayment());
            stmt.setDouble(4, objOrder.getTotalValue());

            stmt.executeUpdate();
            ResultSet generatedKeys = stmt.getGeneratedKeys();
            int idPedido = -1;
            if (generatedKeys.next()) {
                idPedido = generatedKeys.getInt(1);
            } else {
                throw new SQLException("Falha ao recuperar o ID do pedido gerado automaticamente.");
            }
            insertItensOrder(cartItens, idPedido);

            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Insere Pedido: " + e);
        }
    }

    private void insertItensOrder(List<CartDTO> cartItens, int idOrder) {
        String sql = "INSERT INTO order_product (order_id, product_id, quantity, unitary_value) VALUES (?, ?, ?, ?)";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = connection.prepareStatement(sql);

            for (CartDTO item : cartItens) {
                stmt.setInt(1, idOrder);
                stmt.setInt(2, item.getIdProduct());
                stmt.setInt(3, item.getQuantity());
                stmt.setDouble(4, item.getPriceUnitary());
                stmt.executeUpdate();
            }

            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Inserir Itens do Pedido: " + e);
        }
    }
}

package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import model.bean.CartDTO;
import model.bean.OrderDTO;
import model.bean.ProductDTO;

public class OrderDAO {

    public List<OrderDTO> read(int id) {
        List<OrderDTO> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders WHERE user_id = ?";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id);
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
                orders.add(objOrder);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro leirura de pedidos: " + e);
        }
        return orders;
    }

    public List<ProductDTO> readOrderProduct() {
        List<ProductDTO> products = new ArrayList<>();
        String sql = "SELECT iop.quantity, iop.unitary_value, iop.order_id, iop.product_id, p.name AS product_name, img.image AS product_image FROM order_product iop JOIN products p ON iop.product_id = p.id_product LEFT JOIN images img ON p.id_product = img.product_id;";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                ProductDTO objProduct = new ProductDTO();
                objProduct.setQuantity(rs.getInt("quantity"));
                objProduct.setPrice(rs.getDouble("unitary_value"));
                objProduct.setOrderId(rs.getInt("order_id"));
                objProduct.setIdProduct(rs.getInt("product_id"));
                objProduct.setName(rs.getString("product_name"));
                objProduct.setImage(rs.getBytes("product_image"));
                products.add(objProduct);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro leirura de produtos: " + e);
        }
        return products;
    }

    public int insertOrder(OrderDTO objOrder, List<CartDTO> cartItens) {
        String sql = "INSERT INTO orders (user_id, adress_id, method_payment, total_value, date_time) VALUES (?, ?, ?, ?, NOW())";
        int idPedido = -1;

        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, objOrder.getUserId());
            stmt.setInt(2, objOrder.getAddressId());
            stmt.setString(3, objOrder.getMethodPayment());
            stmt.setDouble(4, objOrder.getTotalValue());

            stmt.executeUpdate();
            ResultSet generatedKeys = stmt.getGeneratedKeys();

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

        return idPedido;
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

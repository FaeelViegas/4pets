package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.bean.SellerDTO;

public class SellerDAO {

    public List<SellerDTO> read() {
        List<SellerDTO> sellers = new ArrayList<>();
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement("SELECT * FROM sellers");
            rs = stmt.executeQuery();
            while (rs.next()) {
                SellerDTO objSeller = new SellerDTO();
                objSeller.setIdSeller(rs.getInt("id_seller"));
                objSeller.setSellerName(rs.getString("seller_name"));
                objSeller.setBusinessName(rs.getString("business_name"));
                objSeller.setTypeidentification(rs.getString("type_identification"));
                objSeller.setNumberIndentification(rs.getString("number_identification"));
                objSeller.setStoreName(rs.getString("store_name"));
                objSeller.setStoreEmail(rs.getString("store_email"));
                objSeller.setStoreNumber(rs.getString("store_phone"));
                objSeller.setPassword(rs.getString("password"));
                sellers.add(objSeller);
            }
            rs.close();
            stmt.close();
            connection.close();

        } catch (SQLException e) {
            System.out.println("Erro na leitura de vendedores: " + e);
        }
        return sellers;
    }

    public void insertSeller(SellerDTO objSeller) {
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            stmt = connection.prepareStatement("INSERT INTO sellers(seller_name, business_name, type_identification, number_identification, store_name, store_email, store_phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, objSeller.getSellerName());
            stmt.setString(2, objSeller.getBusinessName());
            stmt.setString(3, objSeller.getTypeidentification());
            stmt.setString(4, objSeller.getNumberIndentification());
            stmt.setString(5, objSeller.getStoreName());
            stmt.setString(6, objSeller.getStoreEmail());
            stmt.setString(7, objSeller.getStoreNumber());
            stmt.setString(8, objSeller.getPassword());
            stmt.executeUpdate();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro no insert de vendedor: " + e);
        }
    }

}

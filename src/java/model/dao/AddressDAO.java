package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.bean.AddressDTO;

public class AddressDAO {

    public List<AddressDTO> read(int id) {
        List<AddressDTO> address = new ArrayList<>();
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement("SELECT * FROM adresses WHERE user_id = ?");
            stmt.setInt(1, id);
            rs = stmt.executeQuery();
            while (rs.next()) {
                AddressDTO objAddress = new AddressDTO();
                objAddress.setIdAddress(rs.getInt("id_adress"));
                objAddress.setStreet(rs.getString("street"));
                objAddress.setNumber(rs.getString("number"));
                objAddress.setCep(rs.getString("cep"));
                objAddress.setCity(rs.getString("city"));
                objAddress.setNeighborhood(rs.getString("neighborhood"));
                objAddress.setState(rs.getString("state"));
                objAddress.setComplement(rs.getString("complement"));
                objAddress.setUserId(rs.getInt("user_id"));
                address.add(objAddress);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro na leitura de endereços: " + e);
        }
        return address;
    }

    public void insertAddress(AddressDTO objAddress) {
        String sql = "INSERT INTO adresses (street,number,cep,city,neighborhood,state,complement,user_id) VALUES (?,?,?,?,?,?,?,?)";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;

            stmt = connection.prepareStatement(sql);
            stmt.setString(1, objAddress.getStreet());
            stmt.setString(2, objAddress.getNumber());
            stmt.setString(3, objAddress.getCep());
            stmt.setString(4, objAddress.getCity());
            stmt.setString(5, objAddress.getNeighborhood());
            stmt.setString(6, objAddress.getState());
            stmt.setString(7, objAddress.getComplement());
            stmt.setInt(8, objAddress.getUserId());

            stmt.executeUpdate();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro no insert de endereço: " + e);
        }
    }
}

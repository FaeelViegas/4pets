package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.bean.UserDTO;

public class UserDAO {

    public List<UserDTO> read() {
        List<UserDTO> users = new ArrayList<>();
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement("SELECT * FROM users");
            rs = stmt.executeQuery();
            while (rs.next()) {
                UserDTO objUser = new UserDTO();
                objUser.setIdUser(rs.getInt("id_user"));
                objUser.setName(rs.getString("name"));
                objUser.setPassword(rs.getString("password"));
                objUser.setUserName(rs.getString("user_name"));
                objUser.setPhone(rs.getString("phone"));
                objUser.setBirthDate(rs.getString("birth_date"));
                objUser.setCpf(rs.getString("cpf"));
                users.add(objUser);
            }
            rs.close();
            stmt.close();
            connection.close();

        } catch (SQLException e) {
            System.out.println("Erro na leitura de usuarios: " + e);
        }
        return users;
    }

    public void insertUser(UserDTO objUser) {
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            stmt = connection.prepareStatement("INSERT INTO users(name, password, user_name, phone, birth_date, cpf) VALUES (?, ?, ?, ?, ?, ?)");
            stmt.setString(1, objUser.getName());
            stmt.setString(2, objUser.getPassword());
            stmt.setString(3, objUser.getUserName());
            stmt.setString(4, objUser.getPhone());
            stmt.setString(5, objUser.getBirthDate());
            stmt.setString(6, objUser.getCpf());
            stmt.executeUpdate();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro no insert de usuario: " + e);
        }
    }
}

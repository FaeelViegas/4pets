package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.bean.CategoryDTO;

public class CategoryDAO {

    public List<CategoryDTO> read() {
        List<CategoryDTO> categorys = new ArrayList<>();
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement("SELECT * FROM categorys");
            rs = stmt.executeQuery();
            while (rs.next()) {
                CategoryDTO objCategory = new CategoryDTO();
                objCategory.setIdCategory(rs.getInt("id_category"));
                objCategory.setName(rs.getString("name"));
                categorys.add(objCategory);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro na leitura de categorias: " + e);
        }
        return categorys;
    }
}

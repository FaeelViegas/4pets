package model.dao;

import connection.ConnectionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import model.bean.ImageDTO;
import model.bean.ProductDTO;

public class ProductDAO {
    
    ImageDTO objImage = new ImageDTO();
    
    public List<ProductDTO> read() {
        List<ProductDTO> products = new ArrayList<>();
        String sql = "SELECT * FROM products";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                ProductDTO objProduct = new ProductDTO();
                objProduct.setIdProduct(rs.getInt("id_product"));
                objProduct.setName(rs.getString("name"));
                objProduct.setPrice(rs.getFloat("value"));
                objProduct.setDescription(rs.getString("description"));
                objProduct.setCategoryId(rs.getInt("category_id"));
                objProduct.setSellerId(rs.getInt("seller_id"));
                products.add(objProduct);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Leitura de produtos: " + e);
        }
        return products;
    }
    
    public List<ProductDTO> searchProduct(String search) {
        List<ProductDTO> products = new ArrayList<>();
        String sql = "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement(sql);
            stmt.setString(1, search);
            stmt.setString(2, search);
            rs = stmt.executeQuery();
            while (rs.next()) {
                ProductDTO objProduct = new ProductDTO();
                objProduct.setIdProduct(rs.getInt("id_product"));
                objProduct.setName(rs.getString("name"));
                objProduct.setPrice(rs.getFloat("value"));
                objProduct.setDescription(rs.getString("description"));
                objProduct.setCategoryId(rs.getInt("category_id"));
                objProduct.setSellerId(rs.getInt("seller_id"));
                products.add(objProduct);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Leitura de produtos por nome/descricao: " + e);
        }
        return products;
    }
    
    public List<ProductDTO> searchCategory(int category) {
        List<ProductDTO> products = new ArrayList<>();
        String sql = "SELECT * FROM products WHERE category_id = ?";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            ResultSet rs = null;
            stmt = connection.prepareStatement(sql);
            stmt.setInt(1, category);
            rs = stmt.executeQuery();
            while (rs.next()) {
                ProductDTO objProduct = new ProductDTO();
                objProduct.setIdProduct(rs.getInt("id_product"));
                objProduct.setName(rs.getString("name"));
                objProduct.setPrice(rs.getFloat("value"));
                objProduct.setDescription(rs.getString("description"));
                objProduct.setCategoryId(rs.getInt("category_id"));
                objProduct.setSellerId(rs.getInt("seller_id"));
                products.add(objProduct);
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Leitura de produtos por categoria: " + e);
        }
        return products;
    }
    
    public void insertProduct(ProductDTO objProduct) {
        String sql = "INSERT INTO products (name,description,value,seller_id,category_id) VALUES (?, ?, ?, ?, ?)";
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            
            stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, objProduct.getName());
            stmt.setString(2, objProduct.getDescription());
            stmt.setDouble(3, objProduct.getPrice());
            stmt.setInt(4, objProduct.getSellerId());
            stmt.setInt(5, objProduct.getCategoryId());
            
            stmt.executeUpdate();
            ResultSet generatedKeys = stmt.getGeneratedKeys();
            int idProduto = -1;
            if (generatedKeys.next()) {
                idProduto = generatedKeys.getInt(1);
            } else {
                throw new SQLException("Falha ao recuperar o ID do produto gerado automaticamente.");
            }
            objImage.setProductId(idProduto);
            objImage.setImage(objProduct.getImage());
            insertImageProduct(objImage);
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro no insert de produto: " + e);
        }
    }
    
    public void insertImageProduct(ImageDTO objImage) {
        try {
            Connection connection = ConnectionDB.connect();
            PreparedStatement stmt = null;
            stmt = connection.prepareStatement("INSERT INTO images (image,product_id) VALUES (?, ?)");
            stmt.setBytes(1, objImage.getImage());
            stmt.setInt(2, objImage.getProductId());
            
            stmt.executeUpdate();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Erro no insert de imagem: " + e);
        }
    }
}

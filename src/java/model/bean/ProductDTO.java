package model.bean;

public class ProductDTO {

    private int idProduct;
    private int categoryId;
    private int sellerId;
    private String name;
    private double price;
    private String description;
    private byte[] image;

    public ProductDTO() {
    }

    public ProductDTO(int idProduct, int categoryId, int sellerId, String name, double price, String description, byte[] image) {
        this.idProduct = idProduct;
        this.categoryId = categoryId;
        this.sellerId = sellerId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    public int getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(int idProduct) {
        this.idProduct = idProduct;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getSellerId() {
        return sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

}

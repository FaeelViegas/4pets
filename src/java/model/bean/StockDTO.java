package model.bean;

public class StockDTO {

    private int idStock;
    private int quantity;
    private int productId;

    public StockDTO() {
    }

    public StockDTO(int idStock, int quantity, int productId) {
        this.idStock = idStock;
        this.quantity = quantity;
        this.productId = productId;
    }

    public int getIdStock() {
        return idStock;
    }

    public void setIdStock(int idStock) {
        this.idStock = idStock;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

}

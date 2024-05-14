package model.bean;

public class ImageDTO {

    private int idImage;
    private byte[] image;
    private int productId;

    public ImageDTO() {
    }

    public ImageDTO(int idImage, byte[] image, int productId) {
        this.idImage = idImage;
        this.image = image;
        this.productId = productId;
    }

    public int getIdImage() {
        return idImage;
    }

    public void setIdImage(int idImage) {
        this.idImage = idImage;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

}

package model.bean;

public class SellerDTO {

    private int idSeller;
    private String sellerName;
    private String businessName;
    private String typeidentification;
    private String numberIndentification;
    private String storeName;
    private String storeEmail;
    private String storeNumber;
    private String password;

    public SellerDTO() {
    }

    public SellerDTO(int idSeller, String sellerName, String businessName, String typeidentification, String numberIndentification, String storeName, String storeEmail, String storeNumber, String password) {
        this.idSeller = idSeller;
        this.sellerName = sellerName;
        this.businessName = businessName;
        this.typeidentification = typeidentification;
        this.numberIndentification = numberIndentification;
        this.storeName = storeName;
        this.storeEmail = storeEmail;
        this.storeNumber = storeNumber;
        this.password = password;
    }

    public int getIdSeller() {
        return idSeller;
    }

    public void setIdSeller(int idSeller) {
        this.idSeller = idSeller;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getTypeidentification() {
        return typeidentification;
    }

    public void setTypeidentification(String typeidentification) {
        this.typeidentification = typeidentification;
    }

    public String getNumberIndentification() {
        return numberIndentification;
    }

    public void setNumberIndentification(String numberIndentification) {
        this.numberIndentification = numberIndentification;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStoreEmail() {
        return storeEmail;
    }

    public void setStoreEmail(String storeEmail) {
        this.storeEmail = storeEmail;
    }

    public String getStoreNumber() {
        return storeNumber;
    }

    public void setStoreNumber(String storeNumber) {
        this.storeNumber = storeNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}

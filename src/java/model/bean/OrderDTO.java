package model.bean;

import java.io.Serializable;

public class OrderDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String street;
    private String number;
    private String cep;
    private String city;
    private String neighborhood;
    private String state;
    private String complement;
    private String methodPayment;
    private double productValue;
    private double shippingValue;
    private double totalValue;
    private int userId;
    private int addressId;
    private int idOrder;
    private String statusPayment;
    private String dateTime;

    public OrderDTO() {
    }

    public OrderDTO(String street, String number, String cep, String city, String neighborhood, String state, String complement, String methodPayment, double productValue, double shippingValue, double totalValue, int userId, int addressId, int idOrder, String statusPayment, String dateTime) {
        this.street = street;
        this.number = number;
        this.cep = cep;
        this.city = city;
        this.neighborhood = neighborhood;
        this.state = state;
        this.complement = complement;
        this.methodPayment = methodPayment;
        this.productValue = productValue;
        this.shippingValue = shippingValue;
        this.totalValue = totalValue;
        this.userId = userId;
        this.addressId = addressId;
        this.idOrder = idOrder;
        this.statusPayment = statusPayment;
        this.dateTime = dateTime;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getMethodPayment() {
        return methodPayment;
    }

    public void setMethodPayment(String methodPayment) {
        this.methodPayment = methodPayment;
    }

    public double getProductValue() {
        return productValue;
    }

    public void setProductValue(double productValue) {
        this.productValue = productValue;
    }

    public double getShippingValue() {
        return shippingValue;
    }

    public void setShippingValue(double shippingValue) {
        this.shippingValue = shippingValue;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public int getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(int idOrder) {
        this.idOrder = idOrder;
    }

    public String getStatusPayment() {
        return statusPayment;
    }

    public void setStatusPayment(String statusPayment) {
        this.statusPayment = statusPayment;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

}

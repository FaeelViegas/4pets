package model.bean;

public class UserDTO {

    private int idUser;
    private String name;
    private String userName;
    private String password;
    private String cpf;
    private String phone;
    private String birthDate;

    public UserDTO() {
    }

    public UserDTO(int idUser, String name, String userName, String password, String cpf, String phone, String birthDate) {
        this.idUser = idUser;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.cpf = cpf;
        this.phone = phone;
        this.birthDate = birthDate;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

}

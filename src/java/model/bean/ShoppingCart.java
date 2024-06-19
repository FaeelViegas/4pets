package model.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ShoppingCart implements Serializable {

    private static final long serialVersionUID = 1L; // Adiciona um serialVersionUID

    private final List<CartDTO> cartItens;

    public ShoppingCart() {
        cartItens = new ArrayList<>();
    }

    public List<CartDTO> getCarrinhoItens() {
        return cartItens;
    }

    public void addItem(CartDTO item) {
        cartItens.add(item);
    }

    public void clear() {
        cartItens.clear();
    }
}

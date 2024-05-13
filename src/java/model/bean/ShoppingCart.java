package model.bean;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {

    private static ShoppingCart instance;
    private final List<CartDTO> cartItens;

    private ShoppingCart() {
        cartItens = new ArrayList<>();
    }

    public static ShoppingCart getInstance() {
        if (instance == null) {
            instance = new ShoppingCart();
        }
        return instance;
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

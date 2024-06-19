package model.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class OrderManager implements Serializable {

    private static final long serialVersionUID = 1L;

    private final List<OrderDTO> orders;

    public OrderManager() {
        orders = new ArrayList<>();
    }

    public List<OrderDTO> getOrders() {
        return orders;
    }

    //adiciona ao pedido
    public void addOrder(OrderDTO order) {
        orders.add(order);
    }

    public void removeOrder(OrderDTO order) {
        orders.remove(order);
    }

    //limpa lista
    public void clearOrders() {
        orders.clear();
    }

    // metodo para obter o pedido para um usuário específico
    public OrderDTO getOrderForUser(int userId) {
        for (OrderDTO order : orders) {
            if (order.getUserId() == userId) {
                return order;
            }
        }
        return null;
    }

    // metodo para verificar se já existe um pedido para o usuário
    public boolean hasOrderForUser(int userId) {
        for (OrderDTO order : orders) {
            if (order.getUserId() == userId) {
                return true;
            }
        }
        return false;
    }

    // metodo para atualizar um pedido existente
    public void updateOrder(OrderDTO updatedOrder) {
        for (int i = 0; i < orders.size(); i++) {
            if (orders.get(i).getUserId() == updatedOrder.getUserId()) {
                orders.set(i, updatedOrder);
                return;
            }
        }
    }
}

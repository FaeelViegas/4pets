package controller;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.List;
import javax.json.Json;
import javax.json.JsonString;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.bean.CartDTO;
import model.bean.OrderDTO;
import model.bean.OrderManager;
import model.bean.ProductDTO;
import model.bean.ShoppingCart;
import model.bean.UserDTO;
import model.dao.OrderDAO;
import model.dao.UserDAO;

@WebServlet(name = "CartController", urlPatterns = {"/add-product-cart", "/cart-itens", "/update-quantity", "/delete-item-cart", "/finalize-order", "/payment-page", "/add-order", "/get-orders", "/confirmation-page", "/update-order", "/close-order", "/get-orders-user", "/get-products-orders"})
public class CartController extends HttpServlet {

    OrderDTO objOrder = new OrderDTO();
    OrderDAO objOrderDao = new OrderDAO();
    UserDAO objUserDao = new UserDAO();
    UserDTO objUser = new UserDTO();
    Gson gson = new Gson();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url = request.getServletPath();
        switch (url) {
            case "/finalize-order": {
                String path = "/WEB-INF/jsp/checkout-page.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            case "/payment-page": {
                String path = "/WEB-INF/jsp/checkout-payment.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            case "/confirmation-page": {
                String path = "/WEB-INF/jsp/checkout-confirmation.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            case "/close-order": {
                HttpSession session = request.getSession();
                ShoppingCart cart = (ShoppingCart) session.getAttribute("shoppingCart");
                OrderManager orderManager = (OrderManager) session.getAttribute("orderManager");

                if (cart != null && orderManager != null) {
                    List<CartDTO> cartItems = cart.getCarrinhoItens();
                    List<OrderDTO> orders = orderManager.getOrders();

                    if (orders != null && !orders.isEmpty()) {
                        OrderDTO order = orders.get(0); // Obtém o pedido da lista

                        int addressId = order.getAddressId();
                        int userId = order.getUserId();
                        String methodPayment = order.getMethodPayment();
                        double totalValue = order.getTotalValue();

                        objOrder.setAddressId(addressId);
                        objOrder.setUserId(userId);
                        objOrder.setMethodPayment(methodPayment);
                        objOrder.setTotalValue(totalValue);

                        // Insere o pedido e os itens do carrinho no banco de dados
                        int orderId = objOrderDao.insertOrder(objOrder, cartItems);

                        // Adiciona o ID do pedido à requisição
                        request.setAttribute("orderId", orderId);
                    } else {
                        System.out.println("Nenhum pedido encontrado na lista.");
                    }
                } else {
                    System.out.println("Carrinho ou OrderManager não encontrado na sessão.");
                }

                String path = "/WEB-INF/jsp/checkout-conclusion.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            default:
                break;
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String path = request.getServletPath();
        if (path.equals("/cart-itens")) {
            // Obtem a sessão do carrinho de compras
            HttpSession session = request.getSession();
            ShoppingCart cart = (ShoppingCart) session.getAttribute("shoppingCart");

            if (cart == null) {
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("[]"); // Retorna um array vazio em JSON
                return;
            }

            List<CartDTO> cartItems = cart.getCarrinhoItens();
            String json = gson.toJson(cartItems);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else if (path.equals("/get-orders")) {
            try {
                // Obtém a sessão do usuário e o gerenciador de pedidos
                HttpSession session = request.getSession();
                OrderManager orderManager = (OrderManager) session.getAttribute("orderManager");

                if (orderManager == null) {
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write("[]"); // Retorna um array vazio em JSON
                    return;
                }
                // Obtém a lista de pedidos
                List<OrderDTO> orders = orderManager.getOrders();
                String json = gson.toJson(orders);

                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Erro interno ao processar a solicitação.");
            }
        } else if (path.equals("/get-orders-user")) {
            HttpSession session = request.getSession(false);
            String user = (String) session.getAttribute("user");
            objUser.setUserName(user);
            int id = objUserDao.returnUserId(objUser);
            List<OrderDTO> orders = objOrderDao.read(id);
            String json = gson.toJson(orders);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else if (path.equals("/get-products-orders")) {
            List<ProductDTO> products = objOrderDao.readOrderProduct();
            String json = gson.toJson(products);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String path = request.getServletPath();
        if (path.equals("/add-product-cart")) {
            try {
                BufferedReader reader = request.getReader();
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                String json = sb.toString();

                javax.json.JsonObject jsonObject = Json.createReader(new StringReader(json)).readObject();
                int productId = jsonObject.getInt("productId");
                String productName = jsonObject.getString("productName");
                productName = new String(productName.getBytes("ISO-8859-1"), "UTF-8");
                double productPrice = jsonObject.getJsonNumber("productPrice").doubleValue();
                int productQtd = jsonObject.getInt("productQtd");
                String stock = jsonObject.getString("stock");
                JsonString productImage = jsonObject.getJsonString("productImage");
                CartDTO objCart = new CartDTO();

                // Obtém a sessão do usuário e o carrinho de compras
                HttpSession session = request.getSession();
                ShoppingCart cart = (ShoppingCart) session.getAttribute("shoppingCart");

                // Se o carrinho não existir na sessão, cria um novo e armazena na sessão
                if (cart == null) {
                    cart = new ShoppingCart();
                    session.setAttribute("shoppingCart", cart);
                }

                List<CartDTO> cartItens = cart.getCarrinhoItens();

                boolean found = false;
                for (CartDTO item : cartItens) {
                    if (item.getIdProduct() == productId) {
                        item.setQuantity(item.getQuantity() + productQtd);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    objCart.setIdProduct(productId);
                    objCart.setName(productName);
                    objCart.setPriceUnitary(productPrice);
                    objCart.setQuantity(productQtd);
                    objCart.setStock(Integer.parseInt(stock));
                    objCart.setImage(productImage);
                    cart.addItem(objCart);
                }

                javax.json.JsonObject responseJson = Json.createObjectBuilder()
                        .add("message", "Produto adicionado ao carrinho com sucesso!")
                        .build();
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(responseJson.toString());
            } catch (IOException | NumberFormatException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Erro interno ao processar a solicitação.");
            }
        } else if (path.equals("/add-order")) {
            try {
                // Lê os dados do pedido da requisição
                BufferedReader reader = request.getReader();
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                String json = sb.toString();

                // Pega os dados do JSON para criar um novo pedido
                javax.json.JsonObject jsonObject = Json.createReader(new StringReader(json)).readObject();
                String street = jsonObject.getString("street");
                street = new String(street.getBytes("ISO-8859-1"), "UTF-8");
                String number = jsonObject.getString("number");
                String cep = jsonObject.getString("cep");
                String city = jsonObject.getString("city");
                city = new String(city.getBytes("ISO-8859-1"), "UTF-8");
                String neighborhood = jsonObject.getString("neighborhood");
                neighborhood = new String(neighborhood.getBytes("ISO-8859-1"), "UTF-8");
                String state = jsonObject.getString("state");
                String complement = jsonObject.getString("complement");
                complement = new String(complement.getBytes("ISO-8859-1"), "UTF-8");
                double productValue = jsonObject.getJsonNumber("productValue").doubleValue();
                double shippingValue = jsonObject.getJsonNumber("shippingValue").doubleValue();
                double totalValue = jsonObject.getJsonNumber("totalValue").doubleValue();
                double idAddress = jsonObject.getJsonNumber("idAddress").doubleValue();

                // Cria um novo objeto OrderDTO
                OrderDTO order = new OrderDTO();

                // Obtém a sessão do usuário e o gerenciador de pedidos
                HttpSession session = request.getSession();
                OrderManager orderManager = (OrderManager) session.getAttribute("orderManager");
                String user = (String) session.getAttribute("user");
                objUser.setUserName(user);
                int id = objUserDao.returnUserId(objUser);

                // Se o gerenciador de pedidos não existir na sessão, cria um novo e armazena na sessão
                if (orderManager == null) {
                    orderManager = new OrderManager();
                    session.setAttribute("orderManager", orderManager);
                }

                // Define os campos do pedido
                order.setAddressId((int) idAddress);
                order.setCep(cep);
                order.setCity(city);
                order.setComplement(complement);
                order.setNeighborhood(neighborhood);
                order.setNumber(number);
                order.setProductValue(productValue);
                order.setShippingValue(shippingValue);
                order.setState(state);
                order.setStreet(street);
                order.setTotalValue(totalValue);
                order.setUserId(id);

                // Verifica se já existe um pedido para o usuário e atualiza ou adiciona
                if (orderManager.hasOrderForUser(id)) {
                    orderManager.updateOrder(order);
                } else {
                    orderManager.addOrder(order);
                }

                // Cria a resposta JSON
                javax.json.JsonObject responseJson = Json.createObjectBuilder()
                        .add("message", "Pedido criado/atualizado com sucesso!")
                        .build();
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(responseJson.toString());
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Erro interno ao processar a solicitação.");
            }
        } else if (path.equals("/update-order")) {
            try {
                // Lê os dados do pedido da requisição
                BufferedReader reader = request.getReader();
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                String json = sb.toString();

                // pega os dados do JSON para criar um novo pedido
                javax.json.JsonObject jsonObject = Json.createReader(new StringReader(json)).readObject();
                String methodPayment = jsonObject.getString("methodPayment");

                // Obtém a sessão do usuário e o gerenciador de pedidos
                HttpSession session = request.getSession();
                OrderManager orderManager = (OrderManager) session.getAttribute("orderManager");
                String user = (String) session.getAttribute("user");

                // Valida se o gerenciador de pedidos existe na sessão
                if (orderManager == null) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("Gerenciador de pedidos não encontrado.");
                    return;
                }

                // Obtém o ID do usuário
                objUser.setUserName(user);
                int userId = objUserDao.returnUserId(objUser);

                // Localiza o pedido existente para o usuário
                OrderDTO existingOrder = orderManager.getOrderForUser(userId);

                if (existingOrder == null) {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    response.getWriter().write("Pedido não encontrado para o usuário.");
                    return;
                }

                // Atualiza o pedido existente com os novos campos
                existingOrder.setMethodPayment(methodPayment);

                // Salva o pedido atualizado no gerenciador de pedidos
                orderManager.updateOrder(existingOrder);

                // Resposta de sucesso
                javax.json.JsonObject responseJson = Json.createObjectBuilder()
                        .add("message", "Pedido atualizado com sucesso!")
                        .build();
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(responseJson.toString());
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Erro interno ao processar a solicitação.");
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getServletPath();
        if (path.equals("/delete-item-cart")) {
            String productId = request.getParameter("productId");
            // obtem a sessão do usuário e o carrinho de compras
            HttpSession session = request.getSession();
            ShoppingCart cart = (ShoppingCart) session.getAttribute("shoppingCart");

            List<CartDTO> cartItems = cart.getCarrinhoItens();

            CartDTO itemToRemove = null;
            for (CartDTO item : cartItems) {
                if (item.getIdProduct() == Integer.parseInt(productId)) {
                    itemToRemove = item;
                    break;
                }
            }
            if (itemToRemove != null) {
                cartItems.remove(itemToRemove);
            }

            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getServletPath();
        if (path.equals("/update-quantity")) {
            try {
                BufferedReader reader = request.getReader();
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                String json = sb.toString();

                javax.json.JsonObject jsonObject = Json.createReader(new StringReader(json)).readObject();
                int productId = jsonObject.getInt("productId");
                int productQtd = Integer.parseInt(jsonObject.getString("productQtd"));

                // Obtém a sessão do usuário e o carrinho de compras
                HttpSession session = request.getSession();
                ShoppingCart cart = (ShoppingCart) session.getAttribute("shoppingCart");

                List<CartDTO> cartItens = cart.getCarrinhoItens();
                for (CartDTO item : cartItens) {
                    if (item.getIdProduct() == productId) {
                        item.setQuantity(productQtd);
                        break;
                    }
                }

                javax.json.JsonObject responseJson = Json.createObjectBuilder()
                        .add("message", "Quantidade atualizada com sucesso!")
                        .build();
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(responseJson.toString());
            } catch (IOException | NumberFormatException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Erro interno ao processar a solicitação.");
            }
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}

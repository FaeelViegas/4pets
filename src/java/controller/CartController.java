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
import model.bean.CartDTO;
import model.bean.ShoppingCart;

@WebServlet(name = "CartController", urlPatterns = {"/add-product-cart", "/cart-itens", "/update-quantity", "/delete-item-cart", "/finalize-order", "/payment-page"})
public class CartController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url = request.getServletPath();
        if (url.equals("/finalize-order")) {
            String path = "/WEB-INF/jsp/checkout-page.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        } else if (url.equals("/payment-page")) {
            String path = "/WEB-INF/jsp/checkout-payment.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String path = request.getServletPath();
        if (path.equals("/cart-itens")) {
            List<CartDTO> cartItens = ShoppingCart.getInstance().getCarrinhoItens();
            Gson gson = new Gson();
            String json = gson.toJson(cartItens);
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
                List<CartDTO> cartItens = ShoppingCart.getInstance().getCarrinhoItens();

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
                    ShoppingCart.getInstance().addItem(objCart);
                }

                javax.json.JsonObject responseJson = Json.createObjectBuilder()
                        .add("message", "Produto adicionado ao carrinho com sucesso!")
                        .build();
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(responseJson.toString());
            } catch (Exception e) {
                e.printStackTrace();
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
            List<CartDTO> cartItems = ShoppingCart.getInstance().getCarrinhoItens();

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

                CartDTO objCart = new CartDTO();
                List<CartDTO> cartItens = ShoppingCart.getInstance().getCarrinhoItens();
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
            } catch (Exception e) {
                e.printStackTrace();
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

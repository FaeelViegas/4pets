package controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.bean.AddressDTO;
import model.bean.MelhorEnvioAPI;
import model.bean.UserDTO;
import model.dao.AddressDAO;
import model.dao.UserDAO;

@WebServlet(name = "AddressController", urlPatterns = {"/insert-address", "/addresses", "/calculate-shipping", "/insert-address-checkout"})
public class AddressController extends HttpServlet {

    MelhorEnvioAPI melhorEnvioAPI = new MelhorEnvioAPI();
    Gson gson = new Gson();
    AddressDTO objAddress = new AddressDTO();
    AddressDAO objAddressDao = new AddressDAO();
    UserDAO objUserDao = new UserDAO();
    UserDTO objUser = new UserDTO();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String url = request.getServletPath();
        if (url.equals("/addresses")) {
            HttpSession session = request.getSession(false);
            String user = (String) session.getAttribute("user");
            objUser.setUserName(user);
            int id = objUserDao.returnUserId(objUser);
            List<AddressDTO> address = objAddressDao.read(id);
            String json = gson.toJson(address);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String url = request.getServletPath();
        if (url.equals("/insert-address")) {
            HttpSession session = request.getSession(false);
            String user = (String) session.getAttribute("user");
            objUser.setUserName(user);
            int id = objUserDao.returnUserId(objUser);
            objAddress.setCep(request.getParameter("cepAddress"));
            String city = request.getParameter("cityAddress");
            city = new String(city.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setCity(city);
            String complement = request.getParameter("complementAddress");
            complement = new String(complement.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setComplement(complement);
            String neighborhood = request.getParameter("neighborhood");
            neighborhood = new String(neighborhood.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setNeighborhood(neighborhood);
            objAddress.setNumber(request.getParameter("numberAddress"));
            objAddress.setState(request.getParameter("state"));
            String street = request.getParameter("streetAddress");
            street = new String(street.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setStreet(street);
            objAddress.setUserId(id);
            objAddressDao.insertAddress(objAddress);

            String path = "/WEB-INF/jsp/profile-page-details.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        } else if (url.equals("/insert-address-checkout")) {
            HttpSession session = request.getSession(false);
            String user = (String) session.getAttribute("user");
            objUser.setUserName(user);
            int id = objUserDao.returnUserId(objUser);
            objAddress.setCep(request.getParameter("cepAddress"));
            String city = request.getParameter("cityAddress");
            city = new String(city.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setCity(city);
            String complement = request.getParameter("complementAddress");
            complement = new String(complement.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setComplement(complement);
            String neighborhood = request.getParameter("neighborhood");
            neighborhood = new String(neighborhood.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setNeighborhood(neighborhood);
            objAddress.setNumber(request.getParameter("numberAddress"));
            objAddress.setState(request.getParameter("state"));
            String street = request.getParameter("streetAddress");
            street = new String(street.getBytes("ISO-8859-1"), "UTF-8");
            objAddress.setStreet(street);
            objAddress.setUserId(id);
            objAddressDao.insertAddress(objAddress);

            String path = "/WEB-INF/jsp/checkout-page.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        } else if (url.equals("/calculate-shipping")) {
            // Chamar a API de frete
            String toPostalCode = request.getParameter("toPostalCode");
            try {
                String shippingResponse = melhorEnvioAPI.calcularFrete(toPostalCode);

                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(shippingResponse);
            } catch (IOException e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao calcular frete");
            }
        }
    }
}

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
import model.bean.SellerDTO;
import model.dao.SellerDAO;

@WebServlet(name = "SellerController", urlPatterns = {"/dashboard", "/products", "/register-seller", "/insert-seller", "/sellers-data", "/login-seller-page"})
public class SellerController extends HttpServlet {

    SellerDTO objSeller = new SellerDTO();
    SellerDAO objSellerDao = new SellerDAO();
    Gson gson = new Gson();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url = request.getServletPath();
        switch (url) {
            case "/dashboard": {
                String seller = request.getParameter("email");
                HttpSession session = request.getSession();
                session.setAttribute("seller", seller);
                String path = "/WEB-INF/jsp/dashboard-seller.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            case "/register-seller": {
                String path = "/WEB-INF/jsp/register-seller.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            case "/login-seller-page": {
                String path = "/WEB-INF/jsp/login-seller.jsp";
                RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
                dispatcher.forward(request, response);
                break;
            }
            case "/products":
                break;
            default:
                break;
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String url = request.getServletPath();
        if (url.equals("/sellers-data")) {
            List<SellerDTO> sellers = objSellerDao.read();
            String json = gson.toJson(sellers);

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
        if (url.equals("/insert-seller")) {
            try {
                String sellerName = request.getParameter("sellerName");
                String businessName = request.getParameter("businessName");
                String typeIdentification = request.getParameter("typeIdentification");
                String numberIdentification = request.getParameter("numberIdentification");
                String storeName = request.getParameter("storeName");
                String storeEmail = request.getParameter("storeEmail");
                String storeNumber = request.getParameter("storePhone");
                String password = request.getParameter("password");

                sellerName = new String(sellerName.getBytes("ISO-8859-1"), "UTF-8");
                businessName = new String(businessName.getBytes("ISO-8859-1"), "UTF-8");
                storeName = new String(storeName.getBytes("ISO-8859-1"), "UTF-8");
                storeEmail = new String(storeEmail.getBytes("ISO-8859-1"), "UTF-8");
                password = new String(password.getBytes("ISO-8859-1"), "UTF-8");

                objSeller.setSellerName(sellerName);
                objSeller.setBusinessName(businessName);
                objSeller.setTypeidentification(typeIdentification);
                objSeller.setNumberIndentification(numberIdentification);
                objSeller.setStoreName(storeName);
                objSeller.setStoreEmail(storeEmail);
                objSeller.setStoreNumber(storeNumber);
                objSeller.setPassword(password);

                objSellerDao.insertSeller(objSeller);
                response.sendRedirect("./login-seller-page");
            } catch (IOException e) {
                System.out.println("Erro ao inserir vendedor: " + e);
            }
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}

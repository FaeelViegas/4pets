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
import model.bean.ProductDTO;
import model.dao.ProductDAO;

@WebServlet(name = "ProductController", urlPatterns = {"/search-product", "/search"})
public class ProductController extends HttpServlet {

    ProductDTO objProduct = new ProductDTO();
    ProductDAO objProductDao = new ProductDAO();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url = request.getServletPath();
        if (url.equals("/search-product")) {
            String path = "/WEB-INF/jsp/search-page-product.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String url = request.getServletPath();
        if (url.equals("/search")) {
            String search = "%"+request.getParameter("search")+"%";
            List<ProductDTO> products = objProductDao.searchProduct(search);
            Gson gson = new Gson();
            String json = gson.toJson(products);
            response.setContentType("aplication/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}

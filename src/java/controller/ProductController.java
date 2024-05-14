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
import model.bean.CategoryDTO;
import model.bean.ProductDTO;
import model.dao.CategoryDAO;
import model.dao.ProductDAO;

@WebServlet(name = "ProductController", urlPatterns = {"/search-product", "/search", "/list-categorys", "/list-products"})
public class ProductController extends HttpServlet {

    Gson gson = new Gson();
    ProductDTO objProduct = new ProductDTO();
    CategoryDAO objCategoryDao = new CategoryDAO();
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
            String search = request.getParameter("search") != null ? request.getParameter("search") : "";
            if (search.equals("")) {
                List<ProductDTO> products = objProductDao.searchCategory(Integer.parseInt(request.getParameter("category")));
                String json = gson.toJson(products);
                response.setContentType("aplication/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
            } else {
                search = "%" + search + "%";
                List<ProductDTO> products = objProductDao.searchProduct(search);
                String json = gson.toJson(products);
                response.setContentType("aplication/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
            }
        } else if (url.equals("/list-categorys")) {
            List<CategoryDTO> categorys = objCategoryDao.read();
            String json = gson.toJson(categorys);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
        if (url.equals("/list-products")) {
            List<ProductDTO> products = objProductDao.read();
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
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}

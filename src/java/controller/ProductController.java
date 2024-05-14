package controller;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.bean.CategoryDTO;
import model.bean.ImageDTO;
import model.bean.ProductDTO;
import model.dao.CategoryDAO;
import model.dao.ProductDAO;

@MultipartConfig
@WebServlet(name = "ProductController", urlPatterns = {"/search-product", "/search", "/list-categorys", "/list-products", "/insert-product"})
public class ProductController extends HttpServlet {

    Gson gson = new Gson();
    ProductDTO objProduct = new ProductDTO();
    CategoryDAO objCategoryDao = new CategoryDAO();
    ProductDAO objProductDao = new ProductDAO();
    ImageDTO objImage = new ImageDTO();

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
        String url = request.getServletPath();
        if (url.equals("/insert-product")) {
            Part filePart = request.getPart("image");
            InputStream inputStream = filePart.getInputStream();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead = -1;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            byte[] imageBytes = outputStream.toByteArray();

            String name = request.getParameter("name");
            String description = request.getParameter("description");
            double price = Double.parseDouble(request.getParameter("price"));
            int category = Integer.parseInt(request.getParameter("category"));
            int seller = Integer.parseInt(request.getParameter("seller"));
            objProduct.setName(name);
            objProduct.setDescription(description);
            objProduct.setPrice(price);
            objProduct.setCategoryId(category);
            objProduct.setSellerId(seller);
            objProduct.setImage(imageBytes);
            objProductDao.insertProduct(objProduct);

        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

}

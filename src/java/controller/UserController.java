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
import model.bean.UserDTO;
import model.dao.UserDAO;

@WebServlet(name = "UserController", urlPatterns = {"/login-page", "/register-page", "/users-data", "/insert-user","/login-user"})
public class UserController extends HttpServlet {

    UserDAO objUserDao = new UserDAO();
    UserDTO objUser = new UserDTO();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url = request.getServletPath();
        if (url.equals("/login-page")) {
            String path = "/WEB-INF/jsp/login-user.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        } else if (url.equals("/register-page")) {
            String path = "/WEB-INF/jsp/register-user.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        }else if(url.equals("/login-user")){
            String path = "/WEB-INF/jsp/index.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String url = request.getServletPath();
        if (url.equals("/users-data")) {
            List<UserDTO> users = objUserDao.read();

            Gson gson = new Gson();
            String json = gson.toJson(users);

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
        if (url.equals("/insert-user")) {
            objUser.setName(request.getParameter("name"));
            objUser.setCpf(request.getParameter("cpf"));
            objUser.setPhone(request.getParameter("phone"));
            objUser.setBirthDate(request.getParameter("date"));
            objUser.setUserName(request.getParameter("user"));
            objUser.setPassword(request.getParameter("password"));
            objUserDao.insertUser(objUser);
            response.sendRedirect("./login-page");
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}

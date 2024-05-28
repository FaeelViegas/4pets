package controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.sql.ResultSet;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.bean.UserDTO;
import model.dao.UserDAO;

@WebServlet(name = "UserController", urlPatterns = {"/login-page", "/register-page", "/users-data", "/insert-user", "/login-user", "/home"})
public class UserController extends HttpServlet {

    Gson gson = new Gson();
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
        } else if (url.equals("/login-user")) {
            String user = request.getParameter("user");
            HttpSession session = request.getSession();
            session.setAttribute("user", user);

            String path = "/WEB-INF/jsp/index.jsp";
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(path);
            dispatcher.forward(request, response);
        } else if (url.equals("/home")) {
            HttpSession session = request.getSession(false);
            String user = (String) session.getAttribute("user");
            objUser.setUserName(user);
            int id = objUserDao.returnUserId(objUser);
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
            String name = request.getParameter("name");
            String user = request.getParameter("user");
            String password = request.getParameter("password");
            name = new String(name.getBytes("ISO-8859-1"), "UTF-8");
            user = new String(user.getBytes("ISO-8859-1"), "UTF-8");
            password = new String(password.getBytes("ISO-8859-1"), "UTF-8");
            objUser.setName(name);
            objUser.setCpf(request.getParameter("cpf"));
            objUser.setPhone(request.getParameter("phone"));
            objUser.setBirthDate(request.getParameter("date"));
            objUser.setUserName(user);
            objUser.setPassword(password);
            objUserDao.insertUser(objUser);
            response.sendRedirect("./login-page");
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}

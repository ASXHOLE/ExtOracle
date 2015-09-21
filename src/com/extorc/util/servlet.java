package com.extorc.util;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class servlet
 */
public class servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public servlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//DBCon dbc=new DBCon();
		//dbc.getConnection();
		String method=(String) request.getSession().getAttribute("method");
		if(method.equals("add")){
			System.out.println("test!!");
		}else if(method.equals("text")){
			System.out.println("text!!");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("test!!post");
		/*String method=request.getParameter("method");
		if(method.equals("add")){
			System.out.println("test!!");
		}else if(method.equals("text")){
			System.out.println("text!!");
		}*/
	}

}

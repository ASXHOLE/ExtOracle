package com.extorc.util;

import java.io.IOException;  
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.extorc.dao.studentDao;

import net.sf.json.JSONArray; 

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
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();

		//DBCon dbc=new DBCon();
		//dbc.getConnection();
		//System.out.println("test!!out");
		String method=request.getParameter("method");
		if(method.equals("add")){
			System.out.println("get addt!!");
		}else if(method.equals("query")){
			JSONArray al=new JSONArray();
			studentDao sd=new studentDao();
			al=sd.query("select * from student");
			//System.out.println(al.size());
			System.out.println("{\"results\":"+al.size()+",\"rows\":"+al+"}");
			out.print("{\"results\":"+al.size()+",\"rows\":"+al+"}");
			out.flush();
			out.close();

		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//System.out.println("test!!post");
		String method=request.getParameter("method");
		if(method.equals("add")){
			System.out.println("post add!!");
		}else if(method.equals("text")){
			System.out.println(" post text!!");
		}
		
		JSONArray al=new JSONArray();
		studentDao sd=new studentDao();
		al=sd.query("select * from student");
		System.out.println(al);
	}

}

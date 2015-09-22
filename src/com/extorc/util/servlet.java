package com.extorc.util;

import java.io.IOException;  
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.extorc.dao.studentDao;
import com.extorc.service.studentService;

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
			studentService ss=new studentService();
			String jsondata;
			jsondata=ss.query("select * from student order by id");
			System.out.println("doGet query---"+jsondata);
			out.print(jsondata);
			out.flush();
			out.close();

		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String method=request.getParameter("method");
		
		if(method.equals("add")){
			System.out.println("post add!!");
		}else if(method.equals("queryall")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			studentService ss=new studentService();
			String jsondata;
			jsondata=ss.query("SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM student order by id ) A WHERE ROWNUM <= "+(limit+start)+" ) WHERE RN >"+start);
			System.out.println("doPost queryall---");
			out.print(jsondata);
			out.flush();
			out.close();
		}else if(method.equals("querySQLServer")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			String number=request.getParameter("number");
			String name=request.getParameter("name");
			String age=request.getParameter("age");
			String collegeCombo=request.getParameter("collegeCombo");
			String classCombo=request.getParameter("classCombo");
			studentService ss=new studentService();
			String jsondata;
			//jsondata=ss.query("SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM student order by id ) A WHERE ROWNUM <= "+(limit+start)+" ) WHERE RN >"+start);
			//System.out.println("doPost query---");
			String sql="";
			if(age!=null&&age.equals("")){
				sql="SELECT * FROM (SELECT *,ROW_NUMBER() OVER (ORDER BY id) AS RowNumber FROM student) student"+
						" WHERE RowNumber > "+start+" AND RowNumber <="+(limit+start)+
						" AND S_number like '%"+number+"%' AND S_name like '%"+name+"%'"+
						" AND S_college like '%"+collegeCombo+"%' AND S_class like '%"+classCombo+"%'"+
						" ORDER BY id";
			}else{
				sql="SELECT * FROM (SELECT *,ROW_NUMBER() OVER (ORDER BY id) AS RowNumber FROM student) student"+
						" WHERE RowNumber > "+start+" AND RowNumber <="+(limit+start)+
						" AND S_number like '%"+number+"%' AND S_name like '%"+name+"%' AND S_age ="+age+
						" AND S_college like '%"+collegeCombo+"%' AND S_class like '%"+classCombo+"%'"+
						" ORDER BY id";
			}
			System.out.println(sql);
			jsondata=ss.query(sql);
			out.print(jsondata);
			out.flush();
			out.close();
		}
		
		JSONArray al=new JSONArray();
		studentDao sd=new studentDao();
		//al=sd.query("select * from student");
		System.out.println(al);
	}

}

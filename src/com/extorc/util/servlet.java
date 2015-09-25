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
		doPost(request,response);
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
			String number=request.getParameter("number");
			String name=request.getParameter("name");
			String age=request.getParameter("age");
			String gender=request.getParameter("gender");
			String college=request.getParameter("college");
			String classes=request.getParameter("classes");
			String post=request.getParameter("post");
			String jsondata="";
			String addsql="";
			System.out.println(number+" "+name+" "+age+" "+gender+" "+college+" "+classes+" "+post);
			studentService ss=new studentService();
			
			jsondata=ss.query("select * from student where S_NUMBER='"+number+"'", "select count(*) from student where S_NUMBER='"+number+"'");//---------------验证学号重复
			JSONArray resultArray = new JSONArray();
			resultArray.add(jsondata);
			int repeat=Integer.parseInt(resultArray.optJSONObject(0).get("results").toString());
			if(repeat>0){
				out.print("{success:false,msg:'学号重复，请重新输入！！'}");
			}else{
				jsondata=ss.countid("select id from (select * from student order by id desc) where ROWNUM=1");//-----计算ID值
				resultArray.add(jsondata);
				int id=Integer.parseInt(resultArray.optJSONObject(1).get("results").toString())+1;
				addsql="insert into STUDENT (id, s_number, s_name, s_age, s_gender, s_college, s_class, s_post) values ("+id+", '"+number+"','"+name+"','" +age+"','"+gender+"','"+college+"','"+classes+"','"+post+"')";
				
				if(ss.add(addsql)){
					out.print("{success:true,msg:'插入成功！！'}");
				}else{
					out.print("{success:false,msg:'插入失败！！'}");
				}
			}
		}else if(method.equals("query")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			String number="";
			number=request.getParameter("number");
			String name="";
			name=request.getParameter("name");
			String age="";
			age=request.getParameter("age");
			String collegeCombo="";
			collegeCombo=request.getParameter("collegeCombo");
			String classCombo="";
			classCombo=request.getParameter("classCombo");
			studentService ss=new studentService();
			String jsondata;
			String sql1="";
			String sql2="";
			if(age!=null&&age.equals("")){
				sql1="SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM student WHERE "+
							" S_number like '%"+number+"%' AND S_name like '%"+name+"%'"+
							" AND S_college like '%"+collegeCombo+"%' AND S_class like '%"+classCombo+"%'"+
							" order by id DESC) A WHERE ROWNUM <= "+(limit+start)+" ) WHERE RN >"+start;
				sql2="select count(*) from (select * from student where"+
							" S_number like '%"+number+"%' AND S_name like '%"+name+"%'"+
							" AND S_college like '%"+collegeCombo+"%' AND S_class like '%"+classCombo+"%'"+")";
			}else{
				sql1="SELECT * FROM ( SELECT A.*, ROWNUM RN FROM (SELECT * FROM student WHERE "+
						" S_number like '%"+number+"%' AND S_name like '%"+name+"%' AND S_age ="+age+
						" AND S_college like '%"+collegeCombo+"%' AND S_class like '%"+classCombo+"%'"+
						" order by id DESC) A WHERE ROWNUM <= "+(limit+start)+" ) WHERE RN >"+start;
				sql2="select count(*) from (select * from student where"+
						" S_number like '%"+number+"%' AND S_name like '%"+name+"%' AND S_age ="+age+
						" AND S_college like '%"+collegeCombo+"%' AND S_class like '%"+classCombo+"%'"+")";
			}
			//System.out.println(sql1);
			//System.out.println(sql2);
			jsondata=ss.query(sql1,sql2);
			//System.out.println("doPost query---"+jsondata);
			out.print(jsondata);
			out.flush();
			out.close();
		}else if(method.equals("delete")){
			String id=request.getParameter("id");
			studentService ss=new studentService();
			String sql="delete from student where id='"+id+"'";
			if(ss.delete(sql)){
				out.print("{success:true,msg:'删除成功！！'}");
			}else{
				out.print("{success:false,msg:'删除失败！！'}");
			}
			
		}else if(method.equals("modiquery")){
			String id=request.getParameter("id");
			studentService ss=new studentService();
			String jsondata=ss.query("select * from student where id='"+id+"'", "select count(*) from student where id='"+id+"'");
			out.print(jsondata);
			System.out.println(jsondata);
			out.flush();
			out.close();
			
			
		}else if(method.equals("modi")){
			String number=request.getParameter("number");
			String name=request.getParameter("name");
			String age=request.getParameter("age");
			String gender=request.getParameter("gender");
			String college=request.getParameter("college");
			String classes=request.getParameter("classes");
			String post=request.getParameter("post");
			String id=request.getParameter("id");
			studentService ss=new studentService();
			String sql="update student set S_NUMBER='"+number+"',S_NAME='"+name+"',S_AGE='"+age+"',S_GENDER='"+gender+"',S_COLLEGE='"+college+"',S_CLASS='"+classes+"',S_POST='"+post+"' where id="+id;
			
			if(ss.modi(sql)){
				out.print("{success:true,msg:'修改成功！！'}");
			}else{
				out.print("{success:true,msg:'修改失败！！'}");
			}
			
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
			//jsondata=ss.query(sql);
			//out.print(jsondata);
			out.flush();
			out.close();
		}
		
		/*JSONArray al=new JSONArray();
		studentDao sd=new studentDao();
		//al=sd.query("select * from student");
		System.out.println(al);*/
	}

}

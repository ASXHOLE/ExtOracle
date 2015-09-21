package com.extorc.util;

import java.sql.*;
import java.util.ArrayList;

import com.extorc.model.Student;

public class DBCon {

	static ResultSet rs = null;
	static Statement stmt = null;
	static Connection conn=null;
	
	/* 获取数据库连接的函数*/
	public static  Connection  getConnection(){
		Connection conn=null;
        try {
            //初始化驱动包     
            /*Class.forName("oracle.jdbc.driver.OracleDriver");    
            //根据数据库连接字符，名称，密码给conn赋值     
            conn = DriverManager.getConnection(
					"jdbc:oracle:thin:@localhost:1521:orcl", "scott", "tiger");*/
        	
        	//初始化驱动包
        	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");    
            //根据数据库连接字符，名称，密码给conn赋值     
            conn = DriverManager.getConnection(
					"jdbc:sqlserver://localhost:1433;DatabaseName=student", "sa", "123");
                
        } catch (Exception e) {    
            // TODO: handle exception     
            e.printStackTrace();    
        }    
        return conn;
    }    
	
	/* 查询数据库，输出符合要求的记录的情况*/
	public ResultSet query(String sql){
		conn=getConnection();
		ArrayList result =new ArrayList();
		try{
			stmt=(Statement) conn.createStatement();
			rs=stmt.executeQuery(sql);
		}catch(SQLException e){
			System.out.println("查询数据失败");
			e.printStackTrace();  
			return null;
		}
		return rs;
		
	}
	
}

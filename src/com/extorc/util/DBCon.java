package com.extorc.util;

import java.sql.*;

public class DBCon {

	static ResultSet rs = null;
	static Statement stmt = null;
	static Connection conn=null;
	
	public static Connection getConn() {
		return conn;
	}

	/* 获取数据库连接的函数*/
	public static  Connection  getConnection(){
		Connection conn=null;
        try {
            //初始化驱动包     
            Class.forName("oracle.jdbc.driver.OracleDriver");    
            //根据数据库连接字符，名称，密码给conn赋值     
            conn = DriverManager.getConnection(
					"jdbc:oracle:thin:@localhost:1521:orcl", "scott", "tiger");
        	
        	//初始化驱动包
        	/*Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");    
            //根据数据库连接字符，名称，密码给conn赋值     
            conn = DriverManager.getConnection(
					"jdbc:sqlserver://localhost:1433;DatabaseName=student", "sa", "123");*/
                
        } catch (Exception e) {    
            // TODO: handle exception     
            e.printStackTrace();    
        }    
        return conn;
    }    
	
	
	
}

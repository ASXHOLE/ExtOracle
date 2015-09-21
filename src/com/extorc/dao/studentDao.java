package com.extorc.dao;

import java.sql.*;

import com.extorc.util.DBCon;

public class studentDao {
	static Connection conn;
	
	/* 查询数据库，输出符合要求的记录的情况*/
	public ResultSet query(String sql){
		ResultSet rs = null;
		Statement stmt =null;
		//Connection conn =null;
		conn=DBCon.getConnection();
		try{
			stmt=(Statement) conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			rs=stmt.executeQuery(sql);
			//conn.close();
		}catch(SQLException e){
			System.out.println("查询数据失败");
			e.printStackTrace();  
			return null;
		}
		return rs;
	}
	public static Connection getConn() {
		return conn;
	}

}

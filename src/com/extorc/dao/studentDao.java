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
	
	public boolean add(String sql){
		ResultSet rs = null;
		Statement stmt =null;
		conn=DBCon.getConnection();
		try{
			stmt=(Statement) conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			rs=stmt.executeQuery(sql);
			return true;
		}catch(SQLException e){
			System.out.println("插入数据失败");
			e.printStackTrace();  
			return false;
		}
	}
	
	public boolean delete(String sql){
		ResultSet rs = null;
		Statement stmt =null;
		conn=DBCon.getConnection();
		try{
			stmt=(Statement) conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			rs=stmt.executeQuery(sql);
			return true;
		}catch(SQLException e){
			System.out.println("删除数据失败");
			e.printStackTrace();  
			return false;
		}
	}
	
	public boolean modi(String sql){
		ResultSet rs = null;
		Statement stmt =null;
		conn=DBCon.getConnection();
		try{
			stmt=(Statement) conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			rs=stmt.executeQuery(sql);
			return true;
		}catch(SQLException e){
			System.out.println("修改数据失败");
			e.printStackTrace();  
			return false;
		}
	}
	
	public static Connection getConn() {
		return conn;
	}

}

package com.extorc.dao;

import java.util.ArrayList;
import java.sql.*;
import java.util.ArrayList;

import com.extorc.model.Student;
import com.extorc.util.DBCon;


public class studentDao {
	
	public ArrayList query(String sql){//查询方法
		ResultSet rs = null;
		DBCon db=new DBCon();
		ArrayList result =new ArrayList();
		try{
			while(rs.next()){
				Student student=new Student();
				student.setId(rs.getInt("ID"));
				student.setS_age(rs.getInt("S_AGE"));
				student.setS_number(rs.getString("S_NUMBER"));
				student.setS_name(rs.getString("S_NAME"));
				student.setS_gender(rs.getString("S_GENDER"));
				student.setS_college(rs.getString("S_COLLEGE"));
				student.setS_class(rs.getString("S_CLASS"));
				student.setS_post(rs.getString("S_POST"));
				result.add(student);
			}
		}catch(SQLException e){
			System.out.println("查询数据失败");
			e.printStackTrace();  
			return null;
		}
		return result;
	}
}

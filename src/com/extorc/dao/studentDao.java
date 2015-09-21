package com.extorc.dao;

import java.sql.*;
import com.extorc.model.Student;
import com.extorc.util.DBCon;
import net.sf.json.JSONArray; 


public class studentDao {
	
	public JSONArray query(String sql){//查询方法
		ResultSet rs = null;
		DBCon dbc=new DBCon();
		JSONArray result =new JSONArray();
		rs=dbc.query(sql);
		try{
			while(rs.next()){
				Student student=new Student();
				student.setId(rs.getInt("ID"));
				student.setAge(rs.getInt("S_AGE"));
				student.setNumber(rs.getString("S_NUMBER"));
				student.setName(rs.getString("S_NAME"));
				student.setGender(rs.getString("S_GENDER"));
				student.setCollege(rs.getString("S_COLLEGE"));
				student.setClasses(rs.getString("S_CLASS"));
				student.setPost(rs.getString("S_POST"));
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

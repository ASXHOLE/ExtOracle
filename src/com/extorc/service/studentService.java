package com.extorc.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.sf.json.JSONArray;

import com.extorc.dao.studentDao;
import com.extorc.model.Student;
import com.extorc.util.DBCon;

public class studentService {
	public String query(String sql) {// 查询方法
		ResultSet rs = null;
		Connection conn =null;
		studentDao sd=new studentDao();
		conn=studentDao.getConn();
		JSONArray result = new JSONArray();
		rs = sd.query(sql);
		String rows = "";
		try {
			while (rs.next()) {
				Student student = new Student();
				student.setId(rs.getInt("ID"));
				student.setAge(rs.getInt("S_AGE"));
				student.setNumber(rs.getString("S_NUMBER"));
				student.setName(rs.getString("S_NAME"));
				student.setGender(rs.getString("S_GENDER"));
				student.setCollege(rs.getString("S_COLLEGE"));
				student.setClasses(rs.getString("S_CLASS"));
				student.setPost(rs.getString("S_POST"));
				result.add(student);

				if (rs.isLast()) {
					rows = rows + "{\"id\":\"" + student.getId()
							+ "\",\"number\":\"" + student.getNumber()
							+ "\",\"name\":\"" + student.getName()
							+ "\",\"age\":\"" + student.getAge()
							+ "\",\"gender\":\"" + student.getGender()
							+ "\",\"college\":\"" + student.getCollege()
							+ "\",\"classes\":\"" + student.getClasses()
							+ "\",\"post\":\"" + student.getPost() + "\"}";
				} else {
					rows = rows + "{\"id\":\"" + student.getId()
							+ "\",\"number\":\"" + student.getNumber()
							+ "\",\"name\":\"" + student.getName()
							+ "\",\"age\":\"" + student.getAge()
							+ "\",\"gender\":\"" + student.getGender()
							+ "\",\"college\":\"" + student.getCollege()
							+ "\",\"classes\":\"" + student.getClasses()
							+ "\",\"post\":\"" + student.getPost() + "\"},";
				}
			}
			rs.last();
			System.out.println(rs.getRow());
			conn.close();
		} catch (SQLException e) {
			System.out.println("查询数据失败");
			e.printStackTrace();
			return null;
		}
		
		return rows;
	}
}

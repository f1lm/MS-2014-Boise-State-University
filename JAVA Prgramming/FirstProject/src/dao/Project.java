package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Project {
	public String InsertMessage(Connection connection, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String message = null;
		try {
			message = request.getParameter("message");
			PreparedStatement ps = connection
					.prepareStatement("INSERT INTO messages(message) VALUES(?)");
				
			ps.setString(1, message);
			int rs = ps.executeUpdate();
			if (rs>0) {
				return message;
			} else {
				return null;
			}

		} catch (Exception e) {
			throw e;
		}
	}

}

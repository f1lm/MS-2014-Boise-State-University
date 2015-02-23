import java.sql.*;

public class Main {

	public static void main(String[] args) {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();

			Connection con = DriverManager.getConnection(
					"jdbc:mysql://localhost/db_test", "root", "");
			con.setReadOnly(true);

			Statement stmt = con.createStatement();

			ResultSet rs = stmt.executeQuery("Select * from tbl_test");

			while (rs.next()) {
				System.out.println(rs.getInt(1) + "" + rs.getString(2));
			}

			rs.close();
			stmt.close();
			con.close();

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

}

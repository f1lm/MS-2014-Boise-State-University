import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Reports {
	
	
	private static ResultSet findOrders(Connection con, int customer_id, String start,
			String end) throws SQLException {
		Statement stmt = con.createStatement();
		String sql = "select orderNumber from orders "
					+ "where customerNumber = " + customer_id + " and "
					+ "orderDate < '" + end + "' and "
					+ "orderDate > '" + start + "';";
		return stmt.executeQuery(sql);
	}

	
	public static void main(String[] args) {
		 Connection con = null;
		if(args.length != 8) {
			System.err.println("Usage: java -cp [library for jdbc] Reports [severname] "
					+ "[port] [user] [password] [customer_id] [start-date] [end-date] "
					+ "[output folder]");
			System.exit(1);
		}
		if(args[5].compareTo(args[6])>0) {
			System.err.println("date logic error");
		}
		String servername = "";
		String port = "";
		String username = "";
		String password = "";
		int customer_id = -1;
		String start = "";
		String end = "";
		String path = "";
		final String DBNAME = "ecommerce";
		servername = args[0];
		port = args[1];
		username = args[2];
		password = args[3];
		customer_id = Integer.parseInt(args[4]);
		start = args[5];
		end = args[6];
		path = args[7];
		
		String connectString = String.format("jdbc:mysql://%s:%s/%s", servername, port, DBNAME);
	    	try {
	    	   con = DriverManager.getConnection(connectString, username, password);
	    	} catch (SQLException e1) {
				System.err.println("Error connecting to DB");
				e1.printStackTrace();
			}
		
		String order_id = "";
		
		ResultSet result =null ;
		try {
			result = findOrders(con, customer_id, start, end);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			while(result.next()) {
				order_id = result.getString(1);
				String filename = order_id + ".txt";
				try {
					File file = new File(path+filename);		 
					if (!file.exists()) {
						file.createNewFile();
					}	
					FileWriter fw = new FileWriter(file.getAbsoluteFile());
					print(con, fw, customer_id, order_id);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

	private static void print(Connection con, FileWriter fw,
			int customer_id, String order_id) throws SQLException, IOException {
		Statement stmt = con.createStatement();
		String sql = "select * from customers "
					+ "where customerNumber = " + customer_id;
		ResultSet set = stmt.executeQuery(sql);
		BufferedWriter bw = new BufferedWriter(fw);
		
		while(set.next()) {
			bw.write("-----------------Customer Details -------------------\n");
			bw.write("CustomerNumber: " + set.getString(1) + "\n");
			bw.write("CustomerName: " + set.getString(2) + "\n");
			bw.write("ContactLastName: " + set.getString(3) + "\n");
			bw.write("ContactFirstName: " + set.getString(4) + "\n");
			bw.write("Phone: " + set.getString(5) + "\n");
			bw.write("AddressLine1: " + set.getString(6) + "\n");
			bw.write("AddressLine2: " + set.getString(7) + "\n");
			bw.write("City: " + set.getString(8) + "\n");
			bw.write("State: " + set.getString(9) + "\n");
			bw.write("PostCode: " + set.getString(10) + "\n");
			bw.write("Country: " + set.getString(11) + "\n");
			bw.write("SalesRepEmployeeNumber: " + set.getString(12) + "\n");
			bw.write("PostCode: " + set.getString(13) + "\n");
			bw.write("--------------------------------------------\n");
		}
		
		String orders = "select * from orders "
				+ "where orderNumber = " + order_id;
		String order2 = "select *, priceEach*quantityOrdered as 'TotalPrice' from orderdetails "
					+ "where orderNumber = " + order_id;
		String order3 = "select p.productCode, p.productName, p.productDescription "
					+ "from products p, orderdetails o "
					+ "where p.productCode = o.productCode and o.orderNumber = " + order_id;
		ResultSet result1 = stmt.executeQuery(orders);
		
		bw.write("---------Order Details -----------------\n");
		while(result1.next()) {
			bw.write("OrderNumber: " + result1.getString(1) + "\n");
			bw.write("OrderDate: " + result1.getString(2) + "\n");
			bw.write("RequiredDate: " + result1.getString(3) + "\n");
			bw.write("ShippedDate: " + result1.getString(4) + "\n");
			bw.write("Shipping Status: " + result1.getString(5) + "\n");
			bw.write("Comments: " + result1.getString(6) + "\n");
		}
		bw.write("--------------------------------------------\n");
		ResultSet result3 = stmt.executeQuery(order3);
		result3.next();
		while(result3.next()) {
			bw.write("ProductCode: " + result3.getString(1) + "\n");
			bw.write("Product Name: " + result3.getString(2) + "\n");
			bw.write("Product Description: " + result3.getString(3) + "\n");
		}
		bw.write("--------------------------------------------\n");
		ResultSet result2 = stmt.executeQuery(order2);
	
		while(result2.next()) {
			bw.write("ProductCode: " + result2.getString(1) + "\n");
			bw.write("Quantity Ordered: " + result2.getString(2) + "\n");
			bw.write("Unit Price: " + result2.getString(3) + "\n");
			bw.write("Total Price: " + result2.getString(4) + "\n");
			bw.write("OrderLineNumber: " + result2.getString(5) + "\n");
			bw.write("-----------------------------------------");
		}
		
		bw.close();

	}



}

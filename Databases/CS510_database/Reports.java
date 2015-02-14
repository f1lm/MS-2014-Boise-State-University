import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

// Reports.java
// Generate order reports given customerNumber, start date and end date.

public class Reports {

	static Connection con;
	
	public static void main(String[] args) {
		
		// Input validation.
		if(args.length != 8) {
			System.err.println("Usage: java -cp [library for jdbc] Reports [severname] "
					+ "[port] [user] [password] [customer_id] [start-date] [end-date] "
					+ "[output folder]");
			System.exit(1);
		}
		// Check end>start date
		if(args[5].compareTo(args[6])>0) {
			System.err.println("Err: start-date exceeds end-date");
		}
		
		// Initialize variables.
		String servername = "";
		String port = "";
		String username = "";
		String password = "";
		int customer_id = -1;
		String start = "";
		String end = "";
		String outputfolder = "";
		final String DBNAME = "ecommerce";
		
		// Parse the input args.
		servername = args[0];
		port = args[1];
		username = args[2];
		password = args[3];
		customer_id = Integer.parseInt(args[4]);
		start = args[5];
		end = args[6];
		outputfolder = args[7];
		
		String connectString = String.format("jdbc:mysql://%s:%s/%s", servername, port, DBNAME);
	        // Initialize the connection here.
	    	try {
	    	   con = DriverManager.getConnection(connectString, username, password);
	    	} catch (SQLException e1) {
				System.err.println("Error connecting to DB");
				e1.printStackTrace();
			}
		
		String order_id = "";
		
		ResultSet result = null;
		// 1. Find orders with the customer_id, start/end date.
		try {
			result = findProperOrders(con, customer_id, start, end);
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		
		// 2. For each order, print the required info
		try {
			while(result.next()) {
				order_id = result.getString(1);
				String filename = outputfolder + order_id + ".txt";

				// For each order
				try {
					File file = new File(filename);		 
					// if file does not exist, then create it
					if (!file.exists()) {
						file.createNewFile();
					}	
					FileWriter fw = new FileWriter(file.getAbsoluteFile());
					
					printReport(con, fw, customer_id, order_id);
					
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

	private static void printReport(Connection con2, FileWriter fw,
			int customer_id, String order_id) throws SQLException, IOException {
		// 2.1 Write customer Details.
		Statement stmt = con.createStatement();
		String sql = "select * from customers "
					+ "where customerNumber = " + customer_id;
		ResultSet set = stmt.executeQuery(sql);
		BufferedWriter bw = new BufferedWriter(fw);
		
		while(set.next()) {
			bw.write("**********Customer Details ****************\n");
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
		
		// 2.2 Print order details
		String sql1 = "select * from orders "
				+ "where orderNumber = " + order_id;
		String sql2 = "select *, priceEach*quantityOrdered as 'TotalPrice' from orderdetails "
					+ "where orderNumber = " + order_id;
		String sql3 = "select p.productCode, p.productName, p.productDescription "
					+ "from products p, orderdetails o "
					+ "where p.productCode = o.productCode and o.orderNumber = " + order_id;
		ResultSet set1 = stmt.executeQuery(sql1);
		
		bw.write("*************Order Details ****************\n");
		while(set1.next()) {
			bw.write("OrderNumber: " + set1.getString(1) + "\n");
			bw.write("OrderDate: " + set1.getString(2) + "\n");
			bw.write("RequiredDate: " + set1.getString(3) + "\n");
			bw.write("ShippedDate: " + set1.getString(4) + "\n");
			bw.write("Shipping Status: " + set1.getString(5) + "\n");
			bw.write("Comments: " + set1.getString(6) + "\n");
		}
		bw.write("--------------------------------------------\n");
		ResultSet set3 = stmt.executeQuery(sql3);
		set3.next();
		while(set3.next()) {
			bw.write("ProductCode: " + set3.getString(1) + "\n");
			bw.write("Product Name: " + set3.getString(2) + "\n");
			bw.write("Product Description: " + set3.getString(3) + "\n");
		}
		bw.write("--------------------------------------------\n");
		ResultSet set2 = stmt.executeQuery(sql2);
	
		while(set2.next()) {
			bw.write("ProductCode: " + set2.getString(2) + "\n");
			bw.write("Quantity Ordered: " + set2.getString(3) + "\n");
			bw.write("Unit Price: " + set2.getString(4) + "\n");
			bw.write("Total Price: " + set2.getString("TotalPrice") + "\n");
			bw.write("OrderLineNumber: " + set2.getString(5) + "\n");
			bw.write("--------------------------------------------\n");
		}
		
		bw.close();

	}

	// Find orders that match the criterion.
	private static ResultSet findProperOrders(Connection con, int customer_id, String start,
			String end) throws SQLException {
		Statement stmt = con.createStatement();
		String sql = "select orderNumber from orders "
					+ "where customerNumber = " + customer_id + " and "
					+ "orderDate < '" + end + "' and "
					+ "orderDate > '" + start + "';";
		return stmt.executeQuery(sql);
	}


}

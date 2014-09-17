package org.sales;

import java.util.ArrayList;

/**
 * This is main class for sales system assignment1
 * @author Milson Munakami
 * @version 1.0.0
 */
public class App {

	public static void main(String[] args) {
		ArrayList<Item> items = new ArrayList<Item>();
		Item item;

		item = new Item("iPad", 10, 100);
		items.add(item);
		item = new Item("iPhone", 5, 100);
		items.add(item);
		item = new Item("iPhone", 5, 100);
		items.add(item);

		Sales sales = new Sales();
		sales.addItem(items);
		
		//Set the customer type fixed and SENIORS for now
		Customers customer = new Customers(CustomerType.SENIORS);
		double rate = customer.getDiscountRate();

		double discountedPrice = sales.getDiscountedSubTotal(rate);
		System.out.println("Your SubTotal is: " + discountedPrice);

	}
}

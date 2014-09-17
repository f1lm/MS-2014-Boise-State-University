package org.sales;

import java.util.ArrayList;

public class Sales {

	private ArrayList<Item> itemList = new ArrayList<Item>();
	private double _subTotal = 0.0;

	public double get_subTotal() {
		return _subTotal;
	}

	public void set_subTotal(double _subTotal) {
		this._subTotal = _subTotal;
	}
	
	/**
	 * Add list of Items to the customer's cart
	 * @param items Collection of items
	 */
	public void addItem(ArrayList<Item> items) {
		for (Item item : items) {
			itemList.add(item);
			System.out.println(item.get_title() + " is added to your cart!");
		}
	}
	
	/**
	 * Calculate the discount based on the Rate for the specific Customer Type
	 * @param rate rate specified for current customer
	 * @return discounted cost
	 */
	public double getDiscount(double rate) {
		return get_subTotal() * rate;
	}
	
	/**
	 * Calculate the subtotal for added items 
	 * @return the subtotal of the cutomer's cart items
	 */
	public double getSubTotal() {

		// int occurrences = Collections.frequency(itemList, "iPhone");
		int count = 0;
		double subTotal = 0.0;
		for (Item item : itemList) {
			// buy one, get the second (and the rest of the same item) 50% off
			if (item.get_title().equalsIgnoreCase("iPhone")) {
				count++;
			}
			subTotal += item.getItemTotal(count);
		}
		set_subTotal(subTotal);
		return subTotal;
	}

	/*
	 * 
	 */
	/**
	 * Calculate the discounted subtotal of items
	 * @param rate customer's rate of discount
	 * @return total cost after discounted price
	 */
	public double getDiscountedSubTotal(double rate) {
		return getSubTotal() - getDiscount(rate);

	}
}

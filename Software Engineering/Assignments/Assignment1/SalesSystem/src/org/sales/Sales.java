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

	public void addItem(ArrayList<Item> items) {
		// itemList = items;
		for (Item item : items) {
			itemList.add(item);
			System.out.println(item.get_title() + " is added to your cart!");
		}
		// ListIterator<Item> listIterator = itemList.listIterator();
		// while (listIterator.hasNext()) {
		// Item value = (Item) listIterator.next();
		// System.out.println(value._title + " is added to your cart!");
		// }
	}

	public double getDiscount(double rate) {
		return get_subTotal() * rate;
	}

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

	public double getDiscountedSubTotal(double rate) {
		return getSubTotal() - getDiscount(rate);

	}
}
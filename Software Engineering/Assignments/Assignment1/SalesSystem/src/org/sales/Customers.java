package org.sales;

import java.text.DateFormatSymbols;
import java.util.Calendar;

public class Customers {

	private CustomerType _customerType;
	private double _discount = 0.05;

	public CustomerType get_customerType() {
		return _customerType;
	}

	public void set_customerType(CustomerType _customerType) {
		set_customerType(_customerType);
	}

	public double get_discount() {
		return _discount;
	}

	public void set_discount(double _discount) {
		this._discount = _discount;
	}

	public Customers(CustomerType customerType) {
		this._customerType = customerType;
	}
	
	/**
	 * Calculate the discount rate based on CustomerType and day of the week
	 * @return discount
	 */
	public double getDiscountRate() {

		Calendar cal = Calendar.getInstance();
		String dayName = new DateFormatSymbols().getWeekdays()[cal
				.get(Calendar.DAY_OF_WEEK)];

		if (get_customerType().equals(CustomerType.SENIORS)) {
			if (dayName.equalsIgnoreCase("TUESDAY")) {
				set_discount(0.10);
			} else {
				System.out
						.println("You get discount rate of 0.10 on Tuesday only!");
			}
		} else if (get_customerType().equals(CustomerType.PREFERRED)) {
			set_discount(0.50);
		}
		return get_discount();

	}
}

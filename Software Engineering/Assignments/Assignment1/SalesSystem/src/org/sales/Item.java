package org.sales;

public class Item {
	private String _title;
	private double _unitPriceOrgi;
	private int _quantity;

	public Item(String title, double unitPriceOrgi, int quantity) {
		set_title(title);
		set_unitPriceOrgi(unitPriceOrgi);
		set_quantity(quantity);
	}

	public String get_title() {
		return _title;
	}

	public void set_title(String _title) {
		this._title = _title;
	}

	public double get_unitPriceOrgi() {
		return _unitPriceOrgi;
	}

	public void set_unitPriceOrgi(double _unitPriceOrgi) {
		this._unitPriceOrgi = _unitPriceOrgi;
	}

	public int get_quantity() {
		return _quantity;
	}

	public void set_quantity(int _quantity) {
		this._quantity = _quantity;
	}

	public double getItemTotal(int count) {
		if (count >= 2) {
			return (get_unitPriceOrgi() - get_unitPriceOrgi() * 0.5);
		} else {
			return get_unitPriceOrgi();
		}
	}

}

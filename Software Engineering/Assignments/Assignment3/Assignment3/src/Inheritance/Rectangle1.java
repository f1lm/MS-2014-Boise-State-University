package Inheritance;

public class Rectangle1 {
	private double length;
	private double width;

	public double computeArea() {
		return this.length * this.width;
	}

	public double computePerimeter() {
		return 2 * (this.length + this.width);
	}

	public Rectangle1(double length, double width) {
		this.length = length;
		this.width = width;
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

}

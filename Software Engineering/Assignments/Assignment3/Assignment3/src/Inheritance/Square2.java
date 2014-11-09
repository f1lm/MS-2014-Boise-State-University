package Inheritance;

public class Square2 {
	private double side;

	public double computeArea() {
		return this.side * this.side;
	}

	public double computePerimeter() {
		return 4 * this.side;
	}

	public double getSide() {
		return side;
	}

	public void setSide(double side) {
		this.side = side;
	}
}

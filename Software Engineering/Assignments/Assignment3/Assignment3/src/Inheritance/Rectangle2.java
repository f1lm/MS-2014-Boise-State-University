package Inheritance;

public class Rectangle2 extends Square2 {
	public Rectangle2(double side) {
		super(side);
	}

	public void setLength(double size) {
		super.setSide(size);
	}

	public void setWidth(double size) {
		super.setSide(size);
	}
}

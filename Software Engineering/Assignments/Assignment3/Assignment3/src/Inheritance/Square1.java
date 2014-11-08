package Inheritance;

public class Square1 extends Rectangle1 {

	public Square1(double length, double width) {
		super(length, width);
	}

	public void setSide(double size) {
		super.setLength(size);
		super.setWidth(size);
	}
}

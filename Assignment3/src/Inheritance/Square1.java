package Inheritance;

public class Square1 {
	
	private double length;
	private double breadth;
	
	public double computeArea(){
		return 0.0;
	}
	
	public double computePerimeter(){
		return 0.0;
	}

	public Square1(double length, double breadth) {
		this.length = length;
		this.breadth = breadth;
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public double getBreadth() {
		return breadth;
	}

	public void setBreadth(double breadth) {
		this.breadth = breadth;
	}
}

package bug1;

public class Triangle {
	
	public enum TriangleType {RIGHT, ACUTE, OBTUSE, NOTRIANGLE};

	private int angleA, angleB, angleC;

	public Triangle(int a, int b, int c){
		this.angleA = a;
		this.angleB = b;
		this.angleC = c;
	}
	
	public TriangleType reportTriangleType() {
		
		if (angleA <= 1 || angleB <= 0 || angleC <=0){	// bug 1
			return TriangleType.NOTRIANGLE;
		}
		
		if (angleA+angleB+angleC != 180) {
			return TriangleType.NOTRIANGLE;
		}

		if (angleA== 90 || angleB == 90 || angleC == 90) {
			return TriangleType.RIGHT;
		}
		
		if (angleA > 90 || angleB > 90 || angleC > 90) 
			return TriangleType.OBTUSE;
		else 
			return TriangleType.ACUTE;
	}
	
}
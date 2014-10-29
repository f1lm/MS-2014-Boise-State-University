package bug2;

public class Triangle {
	
	public enum TriangleType {RIGHT, ACUTE, OBTUSE, NOTRIANGLE};

	private int angleA, angleB, angleC;

	public Triangle(int a, int b, int c){
		this.angleA = a;
		this.angleB = b;
		this.angleC = c;
	}
	
	public TriangleType reportTriangleType() {
		
		if (angleA <= 0 || angleB <= 0 || angleC <=0){
			return TriangleType.NOTRIANGLE;
		}
		
		if (angleA+angleB+angleC > 180) {	// bug 2
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
package bug4;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class TriangleTest {

	@Test
	public void test1Triangle() {
		Triangle triangle = new Triangle(50, 60, 70);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.ACUTE);
	}

	@Test
	public void test2Triangle() {
		Triangle triangle = new Triangle(89, 41, 50);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.ACUTE);
	}

	@Test
	public void test3Triangle() {
		Triangle triangle = new Triangle(20, 89, 71);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.ACUTE);
	}

	@Test
	public void test4Triangle() {
		Triangle triangle = new Triangle(31, 60, 89);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.ACUTE);
	}

	@Test
	public void test5Triangle() {
		Triangle triangle = new Triangle(1, 100, 79);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test6Triangle() {
		Triangle triangle = new Triangle(91, 19, 70);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test7Triangle() {
		Triangle triangle = new Triangle(10, 91, 79);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test8Triangle() {
		Triangle triangle = new Triangle(30, 59, 91);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test9Triangle() {
		Triangle triangle = new Triangle(178, 1, 1);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test10Triangle() {
		Triangle triangle = new Triangle(1, 178, 1);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test11Triangle() {
		Triangle triangle = new Triangle(1, 1, 178);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.OBTUSE);
	}

	@Test
	public void test12Triangle() {
		Triangle triangle = new Triangle(90, 1, 89);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.RIGHT);
	}

	@Test
	public void test13Triangle() {
		Triangle triangle = new Triangle(45, 90, 45);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.RIGHT);
	}

	@Test
	public void test14Triangle() {
		Triangle triangle = new Triangle(60, 30, 90);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.RIGHT);
	}

	@Test
	public void test15Triangle() {
		Triangle triangle = new Triangle(0, 10, 170);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test16Triangle() {
		Triangle triangle = new Triangle(50, 0, 130);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test17Triangle() {
		Triangle triangle = new Triangle(80, 120, 0);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test18Triangle() {
		Triangle triangle = new Triangle(179, 10, 1);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test19Triangle() {
		Triangle triangle = new Triangle(20, 179, 10);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test20Triangle() {
		Triangle triangle = new Triangle(100, 50, 179);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test21Triangle() {
		Triangle triangle = new Triangle(181, 15, 50);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test22Triangle() {
		Triangle triangle = new Triangle(15, 181, 50);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test23Triangle() {
		Triangle triangle = new Triangle(16, 27, 181);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test24Triangle() {
		Triangle triangle = new Triangle(0, 0, 0);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test25Triangle() {
		Triangle triangle = new Triangle(-10, 120, 70);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test26Triangle() {
		Triangle triangle = new Triangle(100, -20, 100);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}

	@Test
	public void test27Triangle() {
		Triangle triangle = new Triangle(95, 120, -30);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}
	
	@Test
	public void test28Triangle() {
		Triangle triangle = new Triangle(1, 1, 1);
		assertTrue(triangle.reportTriangleType() == Triangle.TriangleType.NOTRIANGLE);
	}
}

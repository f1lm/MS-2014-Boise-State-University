package Inheritance;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class TestRectangle {

	Rectangle1 rect;
	Square1 sqr;

	@Before
	public void setUp() throws Exception {
		rect = new Rectangle1();
		rect.setLength(10);
		rect.setWidth(20);
		sqr = new Square1();
		sqr.setSide(10);
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testComputeArea() {
		assertEquals("Area of Rectangle", 200, rect.computeArea(), 0.01);
		assertEquals("Area of Square", 100, sqr.computeArea(), 0.01);
	}

	@Test
	public void testComputePerimeter() {
		assertEquals("Perimeter of Rectangle", 60, rect.computePerimeter(),
				0.01);
		assertEquals("Perimeter of Square", 40, sqr.computePerimeter(), 0.01);
	}

	@Test
	public void testRectangle1() {
		assertEquals("Length", 10, rect.getLength(), 0.01);
		assertEquals("Width", 20, rect.getWidth(), 0.01);
	}

}

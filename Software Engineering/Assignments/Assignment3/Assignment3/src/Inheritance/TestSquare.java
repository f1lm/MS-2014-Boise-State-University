package Inheritance;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class TestSquare {

	Square2 sqr;

	@Before
	public void setUp() throws Exception {
		sqr = new Square2(10);
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testComputeArea() {
		assertEquals("Area", 100, sqr.computeArea(), 0.01);
	}

	@Test
	public void testComputePerimeter() {
		assertEquals("perimeter", 40, sqr.computePerimeter(), 0.01);
	}

	@Test
	public void testSquare2() {
		assertEquals("Side", 10, sqr.getSide(), 0.01);
	}

}

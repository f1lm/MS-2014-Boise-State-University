package correct;

import static org.junit.Assert.*;

import org.junit.Test;

public class TriangleTest {

	@Test
	public void test() {
		fail("Not yet implemented");
	}
	
	@Test
	public void testAcuteTriangle () {
		Triangle triangle =  new Triangle(50, 60, 70);
		assertTrue(triangle.reportTriangleType()==Triangle.TriangleType.ACUTE);
	}


}

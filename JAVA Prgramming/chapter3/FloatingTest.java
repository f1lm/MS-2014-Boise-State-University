
/**
 Example that shows how floating point numbers cannot always be stored precisely.
 @author Amit Jain

 */

public class FloatingTest
{

	public static void main(String args[])
	{
		double x = 5.44;
		double y = 6.77;
		double z = y - x;

		System.out.println("x = " + x);
		System.out.println("y = " + y);
		System.out.println("z = y - x = " + z);
		System.out.println("z * 100 = " + (z * 100));
		System.out.println("(int) z = " + ((int) (z * 100)));
		System.out.println("Math.round(z) = " + (Math.round(z * 100)));
		System.out.println("re-z = " + ((Math.round(z * 100))/100.0));

		double value = 1;

		value = value/3;
		value = value/3;
		value = value/3;
		value = value*Math.sqrt(3.0);
		value = value*Math.sqrt(3.0);
		System.out.println("value = " + value);
		value = value * 9; 
		System.out.println("value * 9 = " + value);

	}

}

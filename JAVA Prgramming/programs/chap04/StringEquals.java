
/**
 * Demonstrate equals versus == for objects.
 * 
 * @author amit
 */

public class StringEquals
{
	public static void main(String[] args)
	{

		String s1 = "hello";
//		String s2 = "hello";
		String s2 = new String("hello");

		if (s1 == s2)
			System.out.println("Using ==  hello is hello");
		else
			System.out.println("Using ==  hello is not hello!");

		if (s1.equals(s2))
			System.out.println("Using equals  hello is hello");
		else
			System.out.println("Using equals  hello is not hello!");
	}

}

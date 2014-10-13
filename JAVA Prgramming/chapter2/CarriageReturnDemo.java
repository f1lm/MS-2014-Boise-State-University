
/**
 * Demonstrates the effects of a carraiae return control character.
 * @author amit
 *
 */

public class CarriageReturnDemo
{

	public static void main (String[] args) 
	throws InterruptedException
	{
		
		System.out.println();
		System.out.print("Ha \r"); Thread.sleep(500);
		System.out.print("Ha!"); Thread.sleep(500);
		System.out.print("Ha ha \r"); Thread.sleep(500);
		System.out.print("Ha ha ha\r"); Thread.sleep(500);
		System.out.print("Ha ha ha ha\r"); Thread.sleep(500);
		System.out.print("Ha ha ha ha ha\r"); Thread.sleep(500);
		System.out.print("Ha ha ha ha ha ha ha\r"); Thread.sleep(500);
		System.out.print("                       "); Thread.sleep(500);
		System.out.println();
	}

}

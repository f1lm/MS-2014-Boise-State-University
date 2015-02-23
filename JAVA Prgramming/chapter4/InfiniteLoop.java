import java.util.Random;

/**
Demonstrate an infinite loop. 
Simulates a crying baby :-)
@author amit
*/

public class InfiniteLoop
{
	
	public static void main (String[] args) 
	throws InterruptedException
	{
		final int MAX = 80;
		final int THRESHOLD = 75;
		Random generator = new Random();

		while (true)  {
			int count = generator.nextInt(MAX) + 1;
			if (count > THRESHOLD) {
				//System.out.println(count);
				Thread.sleep(1000); //milliseconds
			}

			System.out.print("bw");
			for (int i=0; i < count; i++) 
				System.out.print("a");
			System.out.print("h...");
			System.out.println();
		}
	}
}

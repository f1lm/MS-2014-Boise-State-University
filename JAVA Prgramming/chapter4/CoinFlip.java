/**
 * Demonstrates the use of an if-else statement. 
 * @author Lewis/Loftus/amit
 */

public class CoinFlip
{
	/**
	 * Creates a Coin object, flips it, and prints the results.
	 */
	public static void main(String[] args)
	{
		Coin myCoin = new Coin();

		myCoin.flip();

		System.out.println(myCoin);

		if (myCoin.isHeads())
			System.out.println("You win.");
		else
			System.out.println("Better luck next time.");
	}
}

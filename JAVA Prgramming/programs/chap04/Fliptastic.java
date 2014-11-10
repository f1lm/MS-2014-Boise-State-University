
public class Fliptastic
{
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Coin coin1 = new Coin();
		Coin coin2 = new Coin();

		int c1HeadCount = 0;
		int c2HeadCount = 0;
		
		while (c1HeadCount < 3 && c2HeadCount < 3)
		{
			coin1.flip();
			coin2.flip();
			if (coin1.isHeads())
				c1HeadCount++;
			else
				c1HeadCount = 0;
			if (coin2.isHeads())
				c2HeadCount++;
			else
				c2HeadCount = 0;
			System.out.println("Coin1: " + coin1 + "\tCoin2: "+ coin2);
		}//while()
		
		if (c1HeadCount >=3 && c2HeadCount >=3)
		{
			System.out.println("It's a tie!");
		}
		else
		{
			if (c1HeadCount >= 3)
				System.out.println("Coin1 Wins!");
			else
				System.out.println("Coin2 Wins!");
//			if (c2HeadCount >= 3)
//				System.out.println("Coin2 Wins!");
		}//else
	}//main()
}//Fliptastic


public class BoolTable {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		if (args.length != 2)
		{
			System.out.println("Usage: java BoolTable rows columns");
			System.exit(1);
		}
	
		int rows = Integer.parseInt(args[0]);
		int cols = Integer.parseInt(args[1]);
		
		boolean[][] bools = new boolean[rows][cols];
		
		//populate!
		for (int i = 0; i < bools.length; i++)
		{
			for (int j = 0; j < bools[i].length; j++)
			{
				if ((i + j) % 2 == 0)
					bools[i][j] = true;
				else
					bools[i][j] = false;
				
				//bools[i][j] = ((i + j) % 2 == 0);
			}
		}

		//output!
		for (boolean[] row : bools)
		{
			for (boolean val : row)
			{
				System.out.print("\t" + val);
			}
			System.out.println();
		}
	}

}

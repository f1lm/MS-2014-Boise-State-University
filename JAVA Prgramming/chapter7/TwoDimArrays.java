

/**
 * Example of square and rectangular two-dimensional arrays.
 * @author amit
 *
 */
public class TwoDimArrays
{		

	/**
	 * Prints a two-dimensional array row by row.
	 * @param arr a two-dimensional array
	 */
	public static void printArray (int arr[][])
	{
		for (int i=0; i<arr.length; i++)
		{
			for (int j=0; j<arr[i].length; j++)
				System.out.print(arr[i][j] + " ");
			System.out.println();
		}
		System.out.println();
	}

	/**
	 * Create a square two-dimensional array
	 * @param n the dimension of the two-dimensional array
	 */
	public static void createAndShowSquareArray(int n)
	{
		int [][] array = new int [n][];
		for (int i=0; i<n; i++)
		{
			array[i] = new int [n];
		}

		for (int i=0; i<n; i++)
			for (int j=0; j<n; j++)
				array[i][j] = j;

		printArray(array);
	}

	/**
	 * Create and print a rectangular array
	 * @param n number of rows
	 * @param m number of columns
	 */
	public static void createAndShowRectangularArray(int n, int m)
	{
		int [][] array = new int [n][];
		for (int i=0; i<n; i++)
		{
			array[i] = new int [m];
		}

		for (int i=0; i<n; i++)
			for (int j=0; j<m; j++)
				array[i][j] = j;

		printArray(array);
	}
	
	/**
	 * @param args Pass in number of rows and columns
	 */
	public static void main(String [] args)
	{
		if (args.length != 2)
		{
			System.err.println("Usage: java TwoDimArrays <#rows> <#columns>");
			System.exit(1);
		}
		int n = Integer.parseInt(args[0]);
		int m = Integer.parseInt(args[1]);

		createAndShowSquareArray(n);

		createAndShowRectangularArray(n, m);
	}
}

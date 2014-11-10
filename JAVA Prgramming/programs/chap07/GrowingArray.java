
import java.util.Scanner;

/**
 * Illustrates how to grow an array on the fly. Increase the INCREMENT to see
 * how running time is affected by how often we grow the array. Then change
 * growArray method to double capacity each time it is called and see how that
 * changes the running time.
 * 
 * @author amit
 */

public class GrowingArray
{
	private String[] words;

	// words[0...capacity-1]
	private int capacity;

	// size points to next free slot in words
	private int size;

	private final int INCREMENT = 100 ; //percentage increase

	/**
	 * Construct a Growing Array with an initial capacity.
	 * 
	 * @param initialCapacity
	 *            The initial capacity of the array.
	 */
	public GrowingArray(int initialCapacity)
	{
		words = new String[initialCapacity];
		capacity = initialCapacity;
		size = 0;
	}

	/**
	 * Increase capacity of internal array.
	 */
	private void growArray()
	{
		String[] temp = new String[capacity + (capacity * INCREMENT)/100 + 1];
		for (int i = 0; i < capacity; i++)
			temp[i] = words[i];

		capacity += (capacity * INCREMENT)/100 + 1;
		words = temp;
		System.out.println("Increased capacity to " + capacity);
	}

	/**
	 * Read in words (one per line) and store in array words, growing it as
	 * needed.
	 * 
	 * @throws IOException
	 */
	public void readData()
	{
		Scanner input = new Scanner(System.in);

		while (input.hasNext()) {
			String line = input.nextLine();
				if (size == capacity)
					growArray();
				words[size] = line;
				size++;
		}
	}

	/**
	 * Print words array on console.
	 */
	public void printData()
	{
		for (int i = 0; i < size; i++) {
			System.out.println(words[i]);
		}
	}

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args)
	{
		GrowingArray example = new GrowingArray(1);
		example.readData();
		/* example.printData(); */
	}

}

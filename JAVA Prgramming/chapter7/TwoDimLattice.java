import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Random;


/**
 * A random two-dimensional lattice of two types of atoms.
 * @author amit
 * 
 */
public class TwoDimLattice
{
	private int[][] lattice;
	private int size;
	private int percentage_A;
	private long seed = 0;
	
	public static final int ATOM_A = 0;
	public static final int ATOM_B = 1;

	private Random generator;


	/**
	 * Constructor: Set parameters and create a random two-dimensional lattice
	 * @param size
	 * @param a_percentage
	 * @param iterations
	 * @param seed 
	 */
	public TwoDimLattice(int size, int percentage_A, long seed)
	{
		this.size = size;
		this.percentage_A = percentage_A;
		this.seed = seed;
		createLattice();
	}

	/**
	 * @return the size
	 */
	public int getSize()
	{
		return size;
	}

	/**
	 * @return
	 */
	public int[][] getLattice()
	{
		return lattice;
	}


	/**
	 * Create a lattice and populate it with two types of atoms at random
	 * @param size
	 */
	public void createLattice()
	{
		lattice = new int[size][size];
		//create random generator with specified seed
		generator = new Random(seed); 
		
		for (int i = 0; i < lattice.length; i++)
			for (int j = 0; j < lattice[0].length; j++) {
				int value = generator.nextInt(100);
				if (value < percentage_A)
					lattice[i][j] = ATOM_A;
				else
					lattice[i][j] = ATOM_B;
			}
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	public String toString()
	{
		String result = "\n";
		result = "Lattice size = " + size + "\n" 
		         + " Percentage A atoms = " + percentage_A + "\n" 
		         + " Random seed = " + seed + "\n\n";
		
		for (int i = 0; i < lattice.length; i++) {
			for (int j = 0; j < lattice[0].length; j++) {
				if (lattice[i][j] == ATOM_A)
					result += "@ ";
				else
					result += "~ ";
			}
			result += "\n";
		}
		return result;
	}
	
	/**
	 * Save the lattice to a text file
	 * @param fileName
	 */
	public void saveToFile(String fileName) {
		File file = new File(fileName);
		try {
			PrintWriter out = new PrintWriter(file);
			out.println();
			for (int i = 0; i < lattice.length; i++) {
				for (int j = 0; j < lattice[0].length; j++) {
					if (lattice[i][j] == ATOM_A)
						out.print("@ ");
					else
						out.print("~ ");
				}
				out.println();
			}	
			out.println();
			out.close();
			
		} catch (FileNotFoundException e) {
			System.err.println("TwoDimLattice: Cannot save to file: " + fileName);
			System.err.println(e);
		}
	}

}

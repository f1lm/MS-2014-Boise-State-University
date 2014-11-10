

/**
 * A driver class for testing the creation of a random two-dimensional lattice.
 * 
 * @author amit
 * 
 */
public class TwoDimLatticeTest
{
	/**
	 * Show usage message and terminate the application.
	 */
	private static void show_usage()
	{
		System.err
				.println("java TwoDimLatticeTest <size> <A-percentage> <random-seed> [animate]");
		System.exit(1);
	}

	/**
	 * Process command line arguments and create a two-dimensional lattice.
	 * 
	 * @param args
	 * @return
	 */
	private static TwoDimLattice process_arguments(String[] args)
	{
		if (args.length < 3) {
			show_usage();
		}

		int size = Integer.parseInt(args[0]);
		if (size <= 0) {
			System.err.println("TwoDimLatticeTest: The size must be positive!");
			show_usage();
		}
		
		int percentage_A = Integer.parseInt(args[1]);
		if ((percentage_A <= 0) || (percentage_A >= 100)) {
			System.err.println("TwoDimLatticeTest: The percentage of A atoms must be greater than 0 and less than 100!");
			show_usage();
		}
		
		long seed = Long.parseLong(args[2]);

		return new TwoDimLattice(size, percentage_A, seed);
	}

	/**
	 * Creates a lattice and saves it to file.
	 * @param args
	 */
	public static void main(String[] args)
	{
		if (args.length < 3) {
			show_usage();
			System.exit(1);
		}

		TwoDimLattice simulation = process_arguments(args);

		System.out.println();
		System.out.print("TwoDimLatticeTest:  ");
		System.out.println(simulation);
		System.out.println();

		simulation.saveToFile("simulation_start.txt");
		System.out.println("Initial state saved in file: simulation_start.txt");
		System.out.println();

	}

}

import java.util.Scanner;



/**
 * 
 * @author ypariyar
 *
 */
public class RandomWalkTest {
	private static int gridSize = 0;
	private static long seed = -1;

	/**
	 * Complete the private static method named getInput() 
	 * that deals with the user input 
	 */
	private static void getInput() {
		Scanner scan = new Scanner(System.in);
		while (gridSize <= 0) {
			System.out.print("Enter grid size: ");
			gridSize = scan.nextInt();
			if(gridSize<=0){System.out.println("Error: grid size must be positive!");
			
			}
			

		}

		while (seed < 0) {
			System.out.print("Enter random seed(O for no seed): ");
			seed = scan.nextLong();
			if(seed<0){
				System.out.println("Error: random seed must be >=0");
			}
		}

	}

	/**
	 * main method with random walk object
	 * 
	 */
	public static void main(String[] args) {

		// call getInput to process user input
		getInput();

		RandomWalk walk;
		// create RandomWalk object using the appropriate constructor
		if (seed == 0) {
			walk = new RandomWalk(gridSize);
		} else {
			walk = new RandomWalk(gridSize, seed);
		}
		// create the random walk and then print it
		walk.createWalk();
		System.out.println(walk.toString());
	}
}
package gui;


import javax.swing.JFrame;

/**
 * Demonstrates the use of polygons and polylines.
 * @author Lewis/Loftus/amit
 *
 */
public class Rocket
{
	// -----------------------------------------------------------------
	// Creates the main frame of the program.
	// -----------------------------------------------------------------
	public static void main(String[] args)
	{
		JFrame frame = new JFrame("Rocket");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		RocketPanel panel = new RocketPanel();

		frame.getContentPane().add(panel);
		frame.pack();
		frame.setVisible(true);
	}
}

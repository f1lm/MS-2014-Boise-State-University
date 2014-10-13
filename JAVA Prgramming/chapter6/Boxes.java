package gui;


import javax.swing.JFrame;

/**
 * Demonstrates the use of loops to draw.
 * @author Lewis/Loftus/amit
 *
 */
public class Boxes
{
	/**
	 * Creates the main frame of the program.
	 * @param args
	 */
	public static void main(String[] args)
	{
		JFrame frame = new JFrame("Boxes");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		BoxesPanel panel = new BoxesPanel();

		frame.getContentPane().add(panel);
		frame.pack();
		frame.setVisible(true);
	}
}

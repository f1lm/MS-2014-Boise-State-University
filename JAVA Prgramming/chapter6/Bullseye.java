package gui;


import javax.swing.JFrame;

/**
 * Demonstrates the use of loops to draw.
 * 
 * @author Lewis/Loftus/amit
 * 
 */
public class Bullseye
{
	/**
	 * Creates the main frame of the program.
	 * @param args
	 */
	public static void main(String[] args)
	{
		JFrame frame = new JFrame("Bullseye");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		BullseyePanel panel = new BullseyePanel();

		frame.getContentPane().add(panel);
		frame.pack();
		frame.setVisible(true);
	}
}

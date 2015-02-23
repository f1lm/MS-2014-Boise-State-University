package gui;



import javax.swing.JFrame;

/**
 * Demonstrates the use of radio buttons with nested panels.
 * @author  Lewis/Loftus/amit
 *
 */
public class QuoteOptionsModified
{
	/**
	 * Creates and presents the program frame.
	 * @param args
	 */
	public static void main(String[] args)
	{
		JFrame frame = new JFrame("Quote Options");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		QuoteOptionsPanelModified panel = new QuoteOptionsPanelModified();
		frame.getContentPane().add(panel);

		frame.pack();
		frame.setVisible(true);
	}
}

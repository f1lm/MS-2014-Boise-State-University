package gui;

import javax.swing.JFrame;

public class CheckerBoard
{

	/**
	 * @param args
	 */
	public static void main(String[] args)
	{
		JFrame frame = new JFrame("Chess Board");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		CheckerBoardPanel panel = new CheckerBoardPanel(8);

		frame.getContentPane().add(panel);
		frame.pack();
		frame.setVisible(true);

	}

}

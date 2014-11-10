package gui;

import javax.swing.*;

/**
  Demonstrates a GUI application that draws a scalable pie chart
*/


public class PieChart
{
	public static void main (String[] args)
	{
		JFrame frame = new JFrame ("PieChart");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);

		frame.getContentPane().add(new PieChartPanel());
		frame.pack();
		frame.setVisible(true);
	}
}

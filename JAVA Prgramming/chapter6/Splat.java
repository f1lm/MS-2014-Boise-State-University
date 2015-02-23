package gui;

import javax.swing.*;

/**
  Splat.java       Author: Lewis/Loftus/Amit

  Demonstrates a series of circle objects used to create a splat.
*/


public class Splat
{
	/**
	  Presents a collection of circles.
	*/
	public static void main (String[] args)
	{
		JFrame frame = new JFrame ("Splat");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);

		frame.getContentPane().add(new SplatPanel());

		frame.pack();
		frame.setVisible(true);
	}
}

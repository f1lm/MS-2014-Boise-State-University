//package gui;

import java.awt.Dimension;
import javax.swing.JFrame;

/**
 * Demonstrates how to capture which mouse button was pressed.
 * @author amit
 *
 */
@SuppressWarnings("serial")
public class MouseButtonsDemo extends JFrame
{

	public static void main(String[] args) {
		
		MouseButtonsDemo demo = new MouseButtonsDemo();
		demo.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		demo.setPreferredSize(new Dimension(300, 200));
		demo.add(new MouseButtonsDemoPanel());
		demo.pack();
		demo.setVisible(true);
	}
}

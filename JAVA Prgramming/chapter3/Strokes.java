/* File: Strokes.java */

import javax.swing.*; //for JFrame, JPanel
import java.awt.*; //for Graphics and Container

/** 
 * Demonstrates changing line thickness for drawing with
 * with the Graphics2D class.
 * @author original unknown, converted to GUI by mvail
 */
public class Strokes extends JPanel {

	/**
	 * Draw with different line thicknesses
	 * @param g0 object on which to paint
	 */
	public void paintComponent( Graphics g0) {
		//clear panel
		super.paintComponent( g0);

		//"cast" Graphics reference to Graphics2D to
		// access setStroke() functionality
		Graphics2D g = (Graphics2D)g0;

		//draw
		g.setColor( new Color( 255, 0, 255));
		g.drawLine(25, 125, 125, 25);

		g.setColor( new Color( 204, 0, 204));
		g.setStroke( new BasicStroke( 4));
		g.drawLine(25, 225, 225, 25);

		g.setColor( new Color( 153, 0, 153));
		g.setStroke( new BasicStroke( 8, 
				BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
		g.drawLine(25, 325, 325, 25);

		g.setColor( new Color( 102, 0, 102));
		g.setStroke( new BasicStroke( 12,
				BasicStroke.CAP_BUTT, BasicStroke.JOIN_ROUND));
		g.drawLine(125, 325, 325, 125);

		g.setColor( new Color( 51, 0, 51));
		g.setStroke( new BasicStroke( 10));
		g.drawLine(225, 325, 325, 225);
	}

	/**
	 * Starting point for Strokes application.
	 * @param args unused
	 */
	public static void main (String[] args)
	{
		JFrame frame = new JFrame ("Strokes");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new Strokes());
		frame.pack();
		frame.setVisible(true);
	}

	/**
	 * Constructor (panel initialization)
	 */
	public Strokes()
	{
		setBackground(Color.black);
		setPreferredSize(new Dimension(400, 400));
	}

}

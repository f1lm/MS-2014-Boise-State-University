// TriangleApplet.java

import java.awt.*;
import java.awt.geom.*;

import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 * Displays a triangle, which requires use of arrays
 * of coordinates.
 * @author Teresa Cole, converted to GUI by mvail
 * @version Fall 2013
 */
public class Triangle extends JPanel
{
	/* declare class variables here */
	private int [] p1x, p1y, p2x, p2y;
	private static final double TWO_PI = Math.PI * 2.0;

	/**
	 * Draw the picture in the panel.
	 * @param g Graphics context
	 * @return none
	 */
	public void paintComponent(Graphics g)
	{
		super.paintComponent(g);
		
		g.drawString( "some text ...", 20, 20);
		g.setColor( Color.red);
		/*g.drawPolygon( p1x, p1y, 3);*/
		int xlast = p1x[2];
		int ylast = p1y[2];
		for (int i=0; i<3; i++)
		{
			g.drawLine( xlast, ylast, p1x[i], p1y[i]);
			xlast = p1x[i];
			ylast = p1y[i];
		}

		g.setColor( Color.yellow);
		g.fillPolygon( p2x, p2y, 3);
	}

	/**
	 * Starting point for Triangle application.
	 * @param args unused
	 */
	public static void main (String[] args)
	{
		JFrame frame = new JFrame ("Triangle");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new Triangle());
		frame.pack();
		frame.setVisible(true);
	}

	/**
	 * Initialize the panel
	 * @param none
	 * @return void
	 */
	public Triangle()
	{
		int width = 500;
		int height = 500;
		setBackground(Color.white);
		setPreferredSize(new Dimension(width, height));
		
		int xc = width / 2;
		int yc = height / 2;
		int xl = 2 * xc / 3;
		int yl = 2 * yc / 3;

		p1x = new int[3];
		p2x = new int[3];
		p1y = new int[3];
		p2y = new int[3];
		for (int i=0; i<3; i++)
		{
			double angle = 2 * i * TWO_PI / 6;
			p1x[i] = (int)Math.round(xc + xl * Math.cos( angle));
			p1y[i] = (int)Math.round(yc - yl * Math.sin( angle));
			angle = (2 * i + 1) * TWO_PI / 6;
			p2x[i] = (int)Math.round(xc + xl * Math.cos( angle));
			p2y[i] = (int)Math.round(yc - yl * Math.sin( angle));
		}
	}

} 

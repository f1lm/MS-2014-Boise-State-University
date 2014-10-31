package src;

//	
//BouncyBall.java
//
//Example using Random and conditional statements
//CS 121
//

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

/**
 * Animated program with a ball bouncing off the program boundaries
 * 
 * @author mvail
 */
public class BouncyBall extends JPanel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final int INIT_WIDTH = 600;
	private final int INIT_HEIGHT = 400;
	private final int DELAY = 100; // milliseconds between Timer events
	private Random rand; // random number generator
	private int x, y; // anchor point coordinates
	private int xDelta, yDelta; // change in x and y from one step to the next
	private final int DELTA_RANGE = 20; // range for xDelta and yDelta
	private int RADIUS = 10; // circle radius
	private int r;
	private int a;
	private int b;

	/**
	 * Draws a filled oval with random color and dimensions.
	 * 
	 * @param g
	 *            Graphics context
	 * @return none
	 */
	public void paintComponent(Graphics g) {
		int width = getWidth();
		int height = getHeight();

		// clear canvas
		g.setColor(getBackground());
		g.fillRect(0, 0, width, height);

		// CALCULATE NEW X
		x += xDelta;
		// TODO: needs more to stay in-bounds

		// CALCULATE NEW Y
		y += yDelta;
		// TODO: needs more to stay in-bounds

		if (y + RADIUS > height) {
			yDelta = -yDelta;
			y = height - RADIUS;
		}
		if (x + RADIUS > width) {
			xDelta = -xDelta;
			x = width - RADIUS;
		}

		if (y - RADIUS < 0) {
			yDelta = -yDelta;

			y = RADIUS;

		}
		if (x < RADIUS) {
			xDelta = -xDelta;
			x = RADIUS;
		}

		// NOW PAINT THE OVAL

		g.setColor(new Color(r, a, b));
		g.fillOval(x - RADIUS, y - RADIUS, 2 * RADIUS, 2 * RADIUS);

	}

	/**
	 * Constructor for the display panel initializes necessary variables. Only
	 * called once, when the program first begins. This method also sets up a
	 * Timer that will call paint() with frequency specified by the DELAY
	 * constant.
	 */
	public BouncyBall() {

		setPreferredSize(new Dimension(INIT_WIDTH, INIT_HEIGHT));
		this.setDoubleBuffered(true);
		setBackground(Color.black);

		rand = new Random(); // instance variable for reuse in paint()

		r = rand.nextInt(255);
		a = rand.nextInt(255);
		b = rand.nextInt(255);
		// initial ball location within panel bounds

		x = rand.nextInt(INIT_WIDTH - RADIUS) + RADIUS;
		y = rand.nextInt(INIT_HEIGHT - RADIUS) + RADIUS;

		// TODO: replace centered starting point with a random
		// position anywhere in-bounds - the ball should never
		// extend out of bounds, so you'll need to take RADIUS
		// into account

		// deltas for x and y\

		xDelta = rand.nextInt(20) - 10;
		yDelta = rand.nextInt(20) - 10;

		RADIUS = rand.nextInt(100) + 10;

		// TODO: replace with random deltas from -DELTA_RANGE/2
		// to +DELTA_RANGE/2

		// Start the animation - DO NOT REMOVE
		startAnimation();

	}

	/**
	 * Create an animation thread that runs periodically DO NOT MODIFY
	 */
	private void startAnimation() {
		ActionListener taskPerformer = new ActionListener() {
			public void actionPerformed(ActionEvent evt) {
				repaint();
			}
		};
		new Timer(DELAY, taskPerformer).start();
	}

	/**
	 * Starting point for the BouncyBall program DO NOT MODIFY
	 * 
	 * @param args
	 *            unused
	 */
	public static void main(String[] args) {
		JFrame frame = new JFrame("Bouncy Ball");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new BouncyBall());
		frame.pack();
		frame.setVisible(true);
	}

}

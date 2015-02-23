import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

/**
 * Partial class for lab exercise using Random, Math and Color classes to draw
 * random color blobs.
 * 
 * @author mvail, amit
 */

public class ColorBlobs extends JPanel
{
	private final int TIMER_DELAY = 500; // milliseconds
	private Random rand;

	// Note: no other instance variables are necessary for this project

	/**
	 * Initialize the ColorBlobs class.
	 */
	public ColorBlobs()
	{
		// Note: no modifications to this method are necessary for this project
		rand = new Random();
		setBackground(Color.black);
		startAnimation();
		setPreferredSize(new Dimension(600, 600));
	}

	/**
	 * This method draws on the panel. It is called periodically by the
	 * animation thread.
	 */
	public void paintComponent(Graphics page)
	{
		int width = getWidth(); // width of the drawing panel
		int height = getHeight(); // height of the drawing panel
         int x, y;
         
		
		
		//int maxOvalWidth=width/2 +1;
		//int minOvalWidth=width/20;
		
		int maxOvalWidth= rand.nextInt(width/2+1);
		int ovalWidth=Math.max(maxOvalWidth, width/20);
		
		int maxOvalHeight=rand.nextInt(height/2+1);
		int ovalHeight=Math.max(maxOvalHeight, height/20);
		
		x=rand.nextInt(width-ovalWidth+1);
        y=rand.nextInt(height-ovalHeight+1);
		
		Color blue =new Color(100,149,237);
		page.setColor(blue);
		
		page.fillOval(x, y, maxOvalWidth,maxOvalHeight);
		
		
		
		

	}

	/**
	 * The main method that starts up the application. DO NOT MODIFY.
	 * 
	 * @param args
	 */
	public static void main(String[] args)
	{
		JFrame frame = new JFrame("Color Blobs");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new ColorBlobs());
		frame.pack();
		frame.setVisible(true);
	}

	/**
	 * Create an animation thread that runs periodically DO NOT MODIFY
	 */
	private void startAnimation()
	{
		ActionListener taskPerformer = new ActionListener() {
			public void actionPerformed(ActionEvent event)
			{
				repaint(); // redraw the panel
			}
		};
		new Timer(TIMER_DELAY, taskPerformer).start();
	}

}
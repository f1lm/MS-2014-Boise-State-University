/*
 *  File: CenterTextApplet.java
 *  Original source: Java, Java, Java, 2E
 *  Description: This applet centers a string of text in the window.
 */

import java.awt.*;

import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 * @author convertetd to GUI by mvail
 */
public class CenterText extends JPanel {
    /**
     * displays a text string centered in the applet window.
     */
    public void paintComponent(Graphics g) {
    	super.paintComponent(g);
    	
        String str = "Hello World!";

        g.setFont(new Font("Serif", Font.BOLD, 36));    
        FontMetrics metrics = g.getFontMetrics();         // Get Font's metrics

        Dimension d = getSize();                          // Get the frame's size

        setBackground(Color.yellow);
        g.setColor(Color.black);

        int x = (d.width - metrics.stringWidth(str)) / 2; // Calculate coordinates
        int y = (d.height + metrics.getHeight()) / 2;

        g.drawString(str, x, y);                          // Draw the string
    }
   
	/**
	 * Starting point for CenterText application.
	 * @param args unused
	 */
	public static void main (String[] args)
	{
		JFrame frame = new JFrame ("CenterText");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new CenterText());
		frame.pack();
		frame.setVisible(true);
	}
	
	/**
	 * Constructor (panel initialization)
	 */
	public CenterText()
	{
		setBackground(Color.red);
		setPreferredSize(new Dimension(500, 500));
	}

} 

package gui;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 * Demonstrate how to load an image and display in a JPanel
 * @author amit
 *
 */
@SuppressWarnings("serial")
public class LoadImage extends JPanel
{

	BufferedImage img;

	/**
	 * Reads the image from a file.
	 */
	public LoadImage()
	{
		try {
			img = ImageIO.read(new File("images/01.jpg"));
			setPreferredSize(new Dimension(img.getWidth(null), img.getHeight(null)));
		} catch (IOException e) {
			System.err.println(e);
		}

	}

	/* (non-Javadoc)
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics g)
	{
		g.drawImage(img, 0, 0, null);
	}

	/**
	 * Create the main frame and add the image panel to it.
	 * @param args
	 */
	public static void main(String[] args)
	{

		JFrame f = new JFrame("Load Image Demo");
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		f.add(new LoadImage());
		f.pack();
		f.setVisible(true);
	}
}

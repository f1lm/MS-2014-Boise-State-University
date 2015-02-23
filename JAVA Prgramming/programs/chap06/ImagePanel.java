import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 * Demonstrate how to load an image and display in a JPanel. Also shows the use
 * of a scrollpane with an image.
 * 
 * @author amit
 * 
 */
public class ImagePanel extends JPanel
{
	BufferedImage img;
	File imageFile;

	/**
	 * Reads the image from a file.
	 */
	public ImagePanel(File imageFile)
	{

		this.imageFile = imageFile;
		try {
			img = ImageIO.read(imageFile);
			JLabel imgLabel = new JLabel(new ImageIcon(img));
			add(imgLabel);
		} catch (IOException e) {
			System.err.println(e);
		}

	}

}

import java.awt.Dimension;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;



/**
 * Demonstrate how to load an image and display in a JPanel. 
 * @author amit
 *
 */
public class ImageDemo extends JFrame
{
	/**
	 * Create the main frame and add the image panel to it.
	 * @param args
	 */
	public static void main(String[] args)
	{
		if (args.length == 0) {
			System.err.println("Usage: java ImageDemo <image filename>");
			System.exit(1);
		}

		final JFrame f = new JFrame("Load Image Demo");
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		File imageFile = new File(args[0]);
		JPanel panel = new ImagePanel(imageFile);
		f.setPreferredSize(new Dimension(200, 300));
		f.getContentPane().add(panel);
		f.pack();
		f.setVisible(true);
	}
}

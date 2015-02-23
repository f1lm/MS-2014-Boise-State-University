import java.awt.*;
import javax.swing.*;

/**
	Demonstrates the use of image icons in labels.

	@author: Lewis/Loftus. Modified by Amit.

*/

public class LabelDemo
{
	/**
   		Creates and displays the primary application frame.
	*/
   public static void main (String[] args)
   {
      JFrame frame = new JFrame ("Label Demo");
      frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);

      ImageIcon icon = new ImageIcon ("boise-river.png");

      JLabel label1, label2, label3;

      label1 = new JLabel ("River Left", icon, SwingConstants.CENTER);

      label2 = new JLabel ("River Right", icon, SwingConstants.CENTER);
      label2.setHorizontalTextPosition (SwingConstants.LEFT);
      label2.setVerticalTextPosition (SwingConstants.BOTTOM);

      label3 = new JLabel ("River Above", icon, SwingConstants.CENTER);
      label3.setHorizontalTextPosition (SwingConstants.CENTER);
      label3.setVerticalTextPosition (SwingConstants.BOTTOM);

      JPanel panel = new JPanel();
      panel.setBackground (Color.cyan);
      panel.setPreferredSize (new Dimension (200, 250));
      panel.add (label1);
      panel.add (label2);
      panel.add (label3);

      frame.getContentPane().add(panel);
      frame.pack();
      frame.setVisible(true);
   }
}

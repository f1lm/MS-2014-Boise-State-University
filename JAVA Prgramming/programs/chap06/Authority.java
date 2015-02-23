import java.awt.*;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
  Demonstrates the use of frames, panels, and labels.
  @author Lewis/Loftus. Modified by: Amit 
*/

public class Authority
{
   	/**
	* Displays some words of wisdom.
	*/
   	public static void main (String[] args)
   	{
      	JFrame frame = new JFrame ("Authority");

      	frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);

      	JPanel primary = new JPanel();
      	primary.setBackground (Color.yellow);
      	primary.setPreferredSize (new Dimension(250, 75));

      	JLabel label1 = new JLabel ("Rebel    ");
      	JLabel label2 = new JLabel ("but without a cause.");

      	primary.add (label1);
      	primary.add (label2);

      	frame.getContentPane().add(primary);
      	frame.pack();
      	frame.setVisible(true);
   	}
}

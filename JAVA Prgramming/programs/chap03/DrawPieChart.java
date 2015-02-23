import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Color;

/**

 Programming Exercise 2.20
 Write an applet that draws a pie chart with eight equal slices, all colored differently

 @author Amit Jain
 @author mvail converted from applet to GUI
*/
public class DrawPieChart extends JPanel
{

	public void paintComponent (Graphics page)
	{

		page.setColor(Color.blue);
		page.fillArc(0,0,100,100,0,45);

		page.setColor(Color.yellow);
		page.fillArc(0,0,100,100,45,45);

		page.setColor(Color.green);
		page.fillArc(0,0,100,100,90,45);

		page.setColor(Color.red);
		page.fillArc(0,0,100,100,135,45);

		page.setColor(Color.orange);
		page.fillArc(0,0,100,100,180,45);

		page.setColor(Color.lightGray);
		page.fillArc(0,0,100,100,225,45);

		page.setColor(Color.cyan);
		page.fillArc(0,0,100,100,270,45);

		page.setColor(Color.pink);
		page.fillArc(0,0,100,100,315,45);
	}

	/**
 	 * sets up a JFrame and the Einstein panel
	 * @param args unused
 	 */
	public static void main(String[] args) {
		JFrame frame = new JFrame("Pie Chart");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new DrawPieChart());
		frame.pack();
		frame.setVisible(true);
	}

 	/**
	 * Constructor (panel initialization)
	 */
	public DrawPieChart() {
		this.setBackground(Color.white);
		this.setPreferredSize(new Dimension(150,150));
	}
}



import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
import javax.swing.Timer;
import javax.swing.JApplet;
import java.util.Calendar;


/**
	An improved version of the animated digital clock. 
	Gets the time from the Java Date object.  Also shows the use of
	String.format static method to format a string.

	@author 
*/

public class DigitalClock2 extends JApplet
{
	private int hour;
	private int minute;
	private int second;
    private final int delay = 1000; //milliseconds

	/**
		Ask for time input via a dialog box  and parse the time input.
		@param none
		@return void
	*/
	public void init()
	{
		updateTime();
		setFont (new Font("Arial", Font.BOLD, 48));
		startAnimation();
	}

	/**
		Display the time in digital format
		@param g Graphics context
		@return none
	*/
	public void paint(Graphics g)
	{
		g.setColor(Color.black);
		g.fillRect(0, 0, getWidth(), getHeight());
		g.setColor(Color.green);
		String displayTime = String.format("%02d:%02d:%02d", hour, minute, second);
		g.drawString(displayTime, 60, 60);
	}


	/**
	 * Create an animation thread that runs once per second
	 */
	private void startAnimation() 
	{
		ActionListener taskPerformer = new ActionListener() {
			public void actionPerformed(ActionEvent evt) {
				updateTime();
				repaint();
			}
		};
		new Timer(delay, taskPerformer).start();
	}

	/**
	 * Update time from Calendar object from system
	 */
	private void updateTime() {
		Calendar now = Calendar.getInstance();
		hour = now.get(Calendar.HOUR_OF_DAY);
		minute = now.get(Calendar.MINUTE);
		second = now.get(Calendar.SECOND);
	}

}



import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
import javax.swing.Timer;
import javax.swing.JApplet;


/**
    An animated digital clock.
    @author  amit
*/

public class DigitalClock extends JApplet
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
        hour = 0;
        minute = 0;
        second = 0;
        setSize(200, 100);

        getTimeFromUser();
        setFont (new Font("Arial", Font.BOLD, 48));
        startAnimation();
    }

    /**
        Display the digital time. 
        @param g Graphics context
        @return none
    */
    public void paint(Graphics g)
    {
        g.setColor(Color.black);
        g.fillRect(0, 0, getWidth(), getHeight());
        g.setColor(Color.green);
        g.drawString(hour + ":" + minute + ":" + second, 60, 60);
    }


    /**
     * Create an animation thread that runs once per second
     */
    private void startAnimation() 
    {
        ActionListener taskPerformer = new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                ticktock();
                repaint();
            }
        };
        new Timer(delay, taskPerformer).start();
    }

    /**
     * Increment time by one second and adjust time accordingly.
     */
    private void ticktock() 
    {
        second = second + 1;
        if (second == 60) {
            minute = minute + 1;
			second = 0;
            if (minute == 60) {
                hour = hour + 1;
				minute = 0;
                if (hour == 12)
                    hour = 0;
            }
        }
    }

    /**
     * Ask user to input time to set the clock by a pop-up dialog box.
     */
    private void getTimeFromUser()
    {
        String input;

        input = JOptionPane.showInputDialog("time (hh:mm:ss):");
        if (input == null)
            System.out.println("No input");
        else 
        {
            try 
            {
                int index1 = input.indexOf(":");
                hour = Integer.parseInt(input.substring(0,index1));
                int index2 = input.indexOf(":",index1+1);
                minute = Integer.parseInt(input.substring(index1+1,index2));
                second = Integer.parseInt(input.substring(index2+1,input.length()));
            }
            catch (NumberFormatException e)
            {
                System.out.println(e);
            }
        }
    }

}

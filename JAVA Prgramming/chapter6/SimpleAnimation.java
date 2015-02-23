

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.Timer;
import javax.swing.JApplet;


/**
    A simple animation.
    @author  amit
*/

public class SimpleAnimation extends JApplet
{
    private int x, y;
    private int width, height;
    private int squareSide = 50;
    private int stepSize = 10;
    private final int delay = 50; //milliseconds

    /**
        Set initial location for square and start the animation
        @param none
        @return void
    */
    public void init()
    {
    	x = 0;
    	setBackground(Color.black);
        startAnimation();
    }

    /**
        Display the square at a new location. 
        @param g Graphics context
        @return none
    */
    public void paint(Graphics g)
    {
    	
    	width = getWidth();
    	height = getHeight();
    	
        //Erase the old square
    	g.setColor(getBackground());
    	g.fillRect(x, y, squareSide, squareSide);
    	
    	//Move to new position
    	x = (x + stepSize) % width;
    	y = height/2 - squareSide/2;
    	
    	//Draw new square
        g.setColor(Color.green);
        g.fillRect(x, y, squareSide, squareSide);   
    }


    /**
     * Create an animation thread that runs periodically
     */
    private void startAnimation() 
    {
        ActionListener taskPerformer = new ActionListener() {
            public void actionPerformed(ActionEvent evt) {
                repaint();
            }
        };
        new Timer(delay, taskPerformer).start();
    }

}

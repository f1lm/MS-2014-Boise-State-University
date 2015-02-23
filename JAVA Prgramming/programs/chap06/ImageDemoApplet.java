
import javax.swing.JApplet;
import java.awt.Image;
import java.awt.Graphics;

import java.net.URL;

/**
    Show how to load and display an image on an applet. 
	To run the program, use the following command:

		appletviewer ImagesDemo.html

	@author amit
*/

public class ImageDemoApplet extends JApplet
{
	Image picture;

	public void init()
	{
		// try to load the image...
		try { picture = getImage(new URL("file:cj.jpg"));} 
		catch (Exception e) { System.out.println(e);}
	}


	public void paint(Graphics g)
	{
		// The width and height of the picture can be hardcoded.
		// Ideally you would want to ask the Image object about its
		// height/width.  That is what the code below does.

		int imgWidth = picture.getWidth(this);
		int imgHeight = picture.getHeight(this);

		// draw the image in the center of the applet panel.
		g.drawImage(picture, getWidth()/2 - imgWidth/2, getHeight()/2 - imgHeight/2, this);
	}
}

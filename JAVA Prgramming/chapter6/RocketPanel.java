package gui;


import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;

import javax.swing.JPanel;

/**
 * Demonstrates the use of polygons and polylines.
 * @author Lewis/Loftus/amit
 *
 */
@SuppressWarnings("serial")
public class RocketPanel extends JPanel
{
	private int[] xRocket = { 100, 120, 120, 130, 130, 70, 70, 80, 80 };
	private int[] yRocket = { 15, 40, 115, 125, 150, 150, 125, 115, 40 };

	private int[] xWindow = { 95, 105, 110, 90 };
	private int[] yWindow = { 45, 45, 70, 70 };

	private int[] xFlame = { 70, 70, 75, 80, 90, 100, 110, 115, 120, 130, 130 };
	private int[] yFlame = { 155, 170, 165, 190, 170, 175, 160, 185, 160, 175,
			155 };

	/**
	 * Lewis/Loftus
	 */
	public RocketPanel()
	{
		setBackground(Color.black);
		setPreferredSize(new Dimension(200, 200));
	}

	
	/* (non-Javadoc)
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics page)
	{
		super.paintComponent(page);
		// Draws a rocket using polygons and polylines.

		page.setColor(Color.cyan);
		page.fillPolygon(xRocket, yRocket, xRocket.length);

		page.setColor(Color.gray);
		page.fillPolygon(xWindow, yWindow, xWindow.length);

		page.setColor(Color.red);
		page.drawPolyline(xFlame, yFlame, xFlame.length);
	}
}

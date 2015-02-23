
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

import javax.swing.JPanel;
import javax.swing.Timer;

/**
 * Animates the movement of a walker on a grid. The grid is shown
 * with the origin (0, 0) at the top left corner.
 * 
 * @author amit
 * @author mvail
 */
@SuppressWarnings("serial")
public class GridMap extends JPanel
{
	private int displaySize = 600;
	private int blockSize;
	private int offset;
	private int numBlocks;
	private int delay = 100; // milliseconds
	private RandomWalk walk;
	/**
	 * 
	 * @param walk
	 *            The RandomWalk object to animate on the city map
	 * @param gridSize
	 *            The size of the grid: from (0,0) to (gridSize,gridSize)
	 */
	public GridMap(RandomWalk walk, int gridSize)
	{
		this.walk = walk;
		
		numBlocks = gridSize;
		blockSize = displaySize / (numBlocks);
		offset = blockSize;
		
		setBackground(Color.white);
		setPreferredSize(new Dimension(displaySize + offset, displaySize + offset));
		startAnimation();
	}
	

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics obj)
	{
		Graphics2D page = (Graphics2D) obj;
		super.paintComponent(page);

		Font font = new Font(Font.MONOSPACED, Font.PLAIN, blockSize / 3);
		page.setFont(font);
		page.setColor(Color.red);
		
		drawMap(page);
		
		if (!walk.isDone()) {
			walk.step();
		}
		drawPath(page);
		
		ArrayList<Point> path = walk.getPath();
		
		page.setColor(Color.blue);
		Point where = path.get(path.size()-1);
		// draw the walker as a rectangle
		page.fillRect(where.x * blockSize + offset - blockSize / 8,
				      where.y * blockSize + offset - blockSize / 8, 
				      blockSize/4, blockSize/4);
	}
	
	
	/**
	 * Draws the grid and labels it using coordinates in terms of blocks.
	 * @param page
	 */
	private void drawMap(Graphics2D page)
	{
		// draw east-west lines for blocks 0 .. numBlocks - 1
		for (int i = 0; i < numBlocks - 1; i++) {
			page.drawString(i + "", offset / 2, i * blockSize
					+ offset);
			for (int j = 0; j < numBlocks; j++) {
				page.drawLine(i * blockSize + offset, j * blockSize + offset,
						(i + 1) * blockSize + offset, j * blockSize + offset);
			}
		}
		page.drawString(numBlocks - 1 + "", offset / 2, (numBlocks - 1) * blockSize
				+ offset);

		// draw north-south lines for blocks 0 .. numBlocks - 1
		for (int i = 0; i < numBlocks; i++) {
			page.drawString(i + "", i * blockSize + offset, offset / 2);
			for (int j = 0; j < numBlocks - 1; j++) {
				page.drawLine(i * blockSize + offset, j * blockSize + offset, i
						* blockSize + offset, (j + 1) * blockSize + offset);
			}
		}
	}
	

	/**
	 * Draws the path of the walk in a different color with a thicker line
	 * @param page
	 */
	private void drawPath(Graphics2D page)
	{
		final int PATH_THICKNESS = 3;
		page.setColor(Color.blue);
		page.setStroke(new BasicStroke(PATH_THICKNESS));
		
		ArrayList<Point> path = walk.getPath();
		Point prev = path.get(0);
		for (Point next: path) {
			page.drawLine(prev.x * blockSize + offset, prev.y * blockSize + offset, 
					next.x * blockSize + offset, next.y * blockSize + offset);
			prev = next;
		}
		page.setStroke(new BasicStroke()); //back to default stroke width
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
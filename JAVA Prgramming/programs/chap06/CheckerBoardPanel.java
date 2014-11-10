package gui;


import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;

/**
 * Displays the simulation 
 * @author amit
 */
@SuppressWarnings("serial")
public class CheckerBoardPanel extends JPanel
{
	private Color [][] board;
	private final int MINIMUM_SIZE = 40;
	private Color current;
	
	
	/**
	 * Sets up the drawing panel.
	 * @param simulation 
	 */
	public CheckerBoardPanel(int size)
	{
		current = Color.white;	
		board = new Color[size][size];
		for (int i=0; i< board.length; i++) {
			for (int j=0; j < board[i].length; j++) {
				toggleColor();
				board[i][j] = current;
			}
			toggleColor();
		}
		setBackground(Color.white);
		setPreferredSize(new Dimension(size*MINIMUM_SIZE, size*MINIMUM_SIZE));
	}
	
	private void toggleColor() {
		if (current.equals(Color.red)) {
			current = Color.white;	
		} else if (current.equals(Color.white)) {
			current = Color.red;
		}	
	}

	/* (non-Javadoc)
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics obj)
	{
		super.paintComponent(obj);
		Graphics2D page = (Graphics2D) obj;
		
		super.paintComponent(page);
		// Paints boxes of random width and height in a random location.
		// Narrow or short boxes are highlighted with a fill color.
		
		for (int i=0; i<board.length; i++) {
			for (int j=0; j<board[i].length; j++) {
					page.setColor(board[j][i]);
					page.fillRect(i * MINIMUM_SIZE, j * MINIMUM_SIZE, MINIMUM_SIZE, MINIMUM_SIZE);
			}
		}
	}
}

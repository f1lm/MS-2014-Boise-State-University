import java.awt.BorderLayout;
import java.awt.Container;

import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.event.ListSelectionListener;
import javax.swing.event.ListSelectionEvent;

@SuppressWarnings("serial")
public class ClickableListDemo extends JFrame implements ListSelectionListener
{
	String[] names = { "Jane Resnick", "Jim Smith", "Bruce Chow",
			"Countess Ada" };

	JTextField statusLine = new JTextField(20); // 20 columns wide
	JList list = null;

	/**
	 * Create a scrollable list of names
	 */
	public ClickableListDemo()
	{
		setTitle("ClickableListDemo");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		list = new JList(names);
		list.addListSelectionListener(this);

		// Create the scroll pane and add the list to it.
		JScrollPane scrollPane = new JScrollPane(list,
				JScrollPane.VERTICAL_SCROLLBAR_ALWAYS,
				JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);

		// Add the scroll pane to this window.
		Container c = getContentPane();
		c.add(scrollPane, BorderLayout.CENTER);
		c.add(statusLine, BorderLayout.SOUTH);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.swing.event.ListSelectionListener#valueChanged(javax.swing.event
	 * .ListSelectionEvent)
	 */
	public void valueChanged(ListSelectionEvent event)
	{
		statusLine.setText("You have selected " + list.getSelectedValue());
	}

	/**
	 * Create the main window
	 * 
	 * @param args
	 */
	public static void main(String[] args)
	{
		ClickableListDemo frame = new ClickableListDemo();
		frame.pack();
		frame.setVisible(true);
	}
}

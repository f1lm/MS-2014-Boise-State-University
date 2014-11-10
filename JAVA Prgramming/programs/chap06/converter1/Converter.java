/**
   This class creates a GUI interface for the MetricConverter
    application using the Java Swing component set. It illustrates the
    use of some of the primary components of Swing, including JFrame,
    JTextField, JTextArea, and JButton. The top-level window for a Swing
    application is a JFrame. To handle action events for the application,
    an ActionListener interface is implemented.
	@author Ralph Morelli (modified by Amit Jain)
 */

import javax.swing.*;            
import java.awt.*;
import java.awt.event.*;

@SuppressWarnings("serial")
public class Converter extends JFrame implements ActionListener
{
    private JLabel prompt = new JLabel("Distance in miles: "); 
    private JTextField input = new JTextField(6);
    private JTextArea display = new JTextArea(10,20);
    private JButton convert = new JButton("Convert!");
  
    /**
       Converter() constructor sets the layout and adds
       components to the top-level JFrame. Note that components
       are added to the ContentPane rather to the JFrame itself.
     */
    public Converter() 
	{
		Container c = getContentPane();
        c.setLayout(new FlowLayout()); 
        c.add(prompt);
        c.add(input);
        c.add(convert);  
    
        c.add(display);

        display.setLineWrap(true);
        display.setEditable(false);
    
        convert.addActionListener(this);   
    } 
  
    /**
       actionPerformed() handles all action events for the program.
        In this case static methods of the MetricConverter class are
        called to perform the conversions requested by the user. The
        user's input is taken from a JTextField and the results are
        appended to a JTextArea.
       @param e -- the ActionEvent which prompted this method call
     */
    public void actionPerformed(ActionEvent e) 
	{
        double miles = Double.parseDouble(input.getText());
        double km = MetricConverter.milesToKm(miles);
        display.append(miles + " miles equals " + km + " kilometers\n");
    } 

    /**
       main() creates an instance of this (Converter) class and sets
        the size and visibility of its JFrame. 
       An anonymous class is used to create an instance of the 
        WindowListener class, which handles the window close events
        for the application.
     */
    public static void main(String args[]) 
	{
        Converter f = new Converter();
        f.setSize(400, 300);  
        f.setVisible(true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    } 
} 



import javax.swing.*;
import javax.swing.border.*;
import java.awt.*;
import java.awt.event.*;

/**
 *  File: OrderApplet.java
 *  @author: Java, Java, Java
 *  Description: This applet introduces some additional Swing
 *   components, including the JCheckBox and JRadioButton classes.
 *   An ItemListener interface is implemented to support check box
 *   and radio button actions. Also, the BorderFactory class is used
 *   to create borders around various areas of the applet window.
 */


public class OrderApplet extends JApplet implements ItemListener, ActionListener {

    private final int NTITLES = 3, NOPTIONS = 3;
  
    private JPanel mainPanel = new JPanel(), 
                   centerPanel = new JPanel(),
                   choicePanel = new JPanel(), 
                   optionPanel = new JPanel(), 
                   buttonPanel = new JPanel();
                 
    private ButtonGroup optGroup = new ButtonGroup();
    private JCheckBox titles[] = new JCheckBox[NTITLES];
    private JRadioButton options[] = new JRadioButton[NOPTIONS];
    private String titleLabels[] = 
        {"Chess Master - $59.95", "Checkers Pro - $39.95","Crossword Maker - $19.95"};
    private String optionLabels[] = {"Credit Card", "Debit Card", "E-cash"};
  
    private JTextArea display = new JTextArea(7, 25);
    private JButton submit = new JButton("Submit Order"), 
                    cancel = new JButton("Cancel");

    /**
     * init() sets up the interface. Note that it calls the initChoices()
     *  and initOptions() methods to set up the check boxes and radio buttons.
     *  Also, note that it uses several panels to organize the interface into
     *  distinct areas, making it easier for the user to navigate.
     */
    public void init() {
        mainPanel.setBorder(BorderFactory.createTitledBorder("Acme Software Titles"));
        mainPanel.setLayout(new GridLayout(3, 1, 1, 1));
        cancel.addActionListener(this);
        submit.addActionListener(this);
        initChoices();
        initOptions(); 
        buttonPanel.setBorder( BorderFactory.createTitledBorder("Order Today"));
        buttonPanel.add(cancel);
        buttonPanel.add(submit);

        centerPanel.add(choicePanel);
        centerPanel.add(optionPanel);
    
        mainPanel.add( display); 
        mainPanel.add(centerPanel);
        mainPanel.add( buttonPanel); 
        getContentPane().add(mainPanel); 
        setSize(400,400);
    } // init()
  
    /**
     * initChoices() initializes the JCheckBoxes which are organized
     *   into a separate panel, layed out in BoxLayout format with a
     *   border around it.
     */
    private void initChoices() {
        choicePanel.setBorder(BorderFactory.createTitledBorder("Titles"));
        choicePanel.setLayout(new BoxLayout(choicePanel, BoxLayout.Y_AXIS));
    
        for (int k = 0; k < titles.length; k++) {
            titles[k] = new JCheckBox(titleLabels[k]);
            titles[k].addItemListener(this);
            choicePanel.add(titles[k]);
        }
    } // initChoices()

    /**
     * initOptions() initializes the JRadioButtons which are organized
     *   into a separate panel, layed out in BoxLayout format with a
     *   border around it.
     */
    private void initOptions() {
        optionPanel.setBorder(BorderFactory.createTitledBorder("Payment By"));
        optionPanel.setLayout(new BoxLayout(optionPanel, BoxLayout.Y_AXIS));
     
        for (int k = 0; k < options.length; k++) {
            options[k] = new JRadioButton(optionLabels[k]);
            options[k].addItemListener(this);
            optionPanel.add(options[k]);
            optGroup.add(options[k]);
        }
        options[0].setSelected(true);
    } // initOptions()

    /**
     * itemStateChanged() handles the user's check box and radio button
     *   selections. In each case, it appends some text to the main 
     *   display area.
     * @param e -- the ItemEvent that led to this method call
     */
    public void itemStateChanged(ItemEvent e) {
        display.setText("Your order so far (Payment by: ");
        for (int k = 0; k < options.length; k++ )
            if (options[k].isSelected())
                display.append(options[k].getText() + ")\n");
        for (int k = 0; k < titles.length; k++ )
            if (titles[k].isSelected())
                display.append("\t" + titles[k].getText() + "\n");
    } // itemStateChanged()
  
    /**
     * actionPerformed() handles the applet's action events
     *  Note that the submit button changes labels depending on the state
     *  of the user's order. In effect, the button's label keeps track of
     *  the applet's state -- either submitting or confirming an order.
     * @param e -- the ActionEvent that led to this method call
     */
    public void actionPerformed(ActionEvent e){
        String label = submit.getText();
        if (e.getSource() == submit) {
            if (label.equals("Submit Order")) {
                display.append("Thank you. Press 'Confirm' to submit for your order!\n");
                submit.setText("Confirm Order");
            } else {
                display.append("Thank you. You will receive your order tomorrow!\n");
                submit.setText("Submit Order");
            } 
        } else 
            display.setText("Thank you. Maybe we can serve you next time!\n");
    } // actionPerformed()
} // OrderApplet

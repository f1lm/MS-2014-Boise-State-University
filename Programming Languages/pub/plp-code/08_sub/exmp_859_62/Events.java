// Examples 8.61 and 8.62

import java.awt.event.*;
import javax.swing.*;
import java.lang.Thread.*;

// The Counter class is given a window and a label.
// It maintains an internal counter, which it increments once a second,
// and displays on the given label in the given window.
//
class Counter extends Thread {
    volatile Boolean running = true;
    JLabel myLabel;
    JPanel myPanel;

    public Counter(JPanel p, JLabel l) {
        myPanel = p;
        myLabel = l;
        myLabel.setText("0");
    }

    public void run() {
        int n = 0;
        while(true) {
            myLabel.setText(Integer.toString(n));
            try {
                sleep(1000);   // milliseconds
            } catch(InterruptedException e) {};
            if (running) n++;
        }
    }

    public void pauseMe() {
        running = false;
    }

    public void resumeMe() {
        running = true;
    }
}

// Class Demo, derived from JPanel, contains a label and two buttons.
// The label houses a Counter (see above).
// The two buttons pause and resume the counter.
// In the code here, the pause button is created in the style of Example
// 8.61; the resume button is created in the style of Example 8.62.
//
class Demo extends JPanel {
    Thread myThread;
    Counter myCount;

    class PauseListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            myCount.pauseMe();
        }
    }

    public Demo(RootPaneContainer pane) {
        // setMinimumSize(new Dimension(240, 120));
        final JLabel myLabel = new JLabel("0");

        final JButton pauseButton = new JButton("pause");
        pauseButton.addActionListener(new PauseListener());

        final JButton resumeButton = new JButton("resume");
        resumeButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                myCount.resumeMe();
            }
        });

        // Panel layout
        setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        add(myLabel);
        add(pauseButton);
        add(resumeButton);

        // put self into the Frame
        pane.getContentPane().add(this);

        // create worker thread to do the counting:
        myCount = new Counter(this, myLabel);
        myCount.start();
    }
}

public class Events {
    public static void main(String[] args) {
        JFrame f = new JFrame("Event demo");
        f.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
        Demo d = new Demo(f);
        f.pack();
        f.setVisible(true);
    }
}

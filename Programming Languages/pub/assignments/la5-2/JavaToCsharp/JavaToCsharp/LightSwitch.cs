using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace JavaToCsharp
{
    public partial class LightSwitch : Form
    {
        private ToggleButton button;
        private BinaryCounter counter;

        public LightSwitch()
        {
            button = new ToggleButton("off", "on");            
            counter = new BinaryCounter(0);
            button.addActionListener(counter);

            Panel contentPane=new Panel();

            contentPane.Location = new System.Drawing.Point(128, 0);
            contentPane.Size = new System.Drawing.Size(184, 82);
            contentPane.Location = Location = new Point(175, 10);

            button.Location = new System.Drawing.Point(44, 3);
            button.Size = new System.Drawing.Size(75, 43);
            counter.AutoSize = true;
            counter.Location = new System.Drawing.Point(125, 18);
            counter.Size = new System.Drawing.Size(35, 13);

            contentPane.Controls.Add(button);
            contentPane.Controls.Add(counter);
            this.Controls.Add(contentPane);
            InitializeComponent();           
        }
    }
}

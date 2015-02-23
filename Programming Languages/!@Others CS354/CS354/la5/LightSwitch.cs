using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS354_la5
{
    class LightSwitch: Form
    {
        ToggleButton button;
        BinaryCounter label;

        public LightSwitch()
        {
            button = new ToggleButton("on", "off");
            label = new BinaryCounter();
            button.Click += new EventHandler(this.updateCount);
            this.Text = "Light Switch";
            this.Controls.Add(button);
            this.Controls.Add(label);
            this.Width = 200;
            this.Height = 200;
            button.Left = button.Left + 100;
        }

        public void updateCount(Object sender, EventArgs e)
        {
            label.changeCount();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS354_la5
{
    class ToggleButton : Button
    {
        String s1;
        String s2;
        public ToggleButton(String string1, String string2)
        {
            s1 = string1;
            s2 = string2;
            this.Click += new EventHandler(this.toggle);
            this.Text = s2;
        }

        private void toggle(Object sender, EventArgs e)
        {
            String s = s1;
            s1 = s2;
            s2 = s;
            this.Text = s1;
        }
    }
}

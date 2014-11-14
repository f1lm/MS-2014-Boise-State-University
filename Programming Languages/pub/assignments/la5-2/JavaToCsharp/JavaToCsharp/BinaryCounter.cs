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
    public partial class BinaryCounter : Label
    {
        private int count;

        public BinaryCounter(int count)
        {
            // TODO: Complete member initialization
            this.Text = Convert.ToString(count, 2); 
            this.count = count;
        }

        internal void actionPerformed(object sender, EventArgs e)
        {
            this.Text = Convert.ToString(++count, 2); 
        }
    }
}

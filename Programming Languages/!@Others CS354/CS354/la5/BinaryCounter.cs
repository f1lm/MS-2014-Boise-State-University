using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS354_la5
{
    class BinaryCounter : Label
    {
        int count;

        public BinaryCounter() 
        {
            count = 0;
            this.Text = Convert.ToString(count, 2);
        }

        public void changeCount()
        {
            count++;
            this.Text = Convert.ToString(count, 2);
        }

    }
}

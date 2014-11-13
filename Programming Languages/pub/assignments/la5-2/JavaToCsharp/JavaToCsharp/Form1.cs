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
    public partial class Form1 : Form
    {
        private int count = 0;
        private string label1, label2;

        public Form1()
        {
            InitializeComponent();
            label1 = "off";
            label2 = "on";
            btnClick.Text = label1;
            lblText.Text = Convert.ToString(count, 2);
        }

        private void btnClick_Click(object sender, EventArgs e)
        {
            String s = label1;
            label1 = label2;
            label2 = s;
            btnClick.Text = label1;

            lblText.Text = Convert.ToString(++count, 2);         
        }
    }
}

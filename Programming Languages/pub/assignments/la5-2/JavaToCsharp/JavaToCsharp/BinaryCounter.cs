using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace JavaToCsharp
{
    class BinaryCounter: Form
    {
        private Label label1;

        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(228, 56);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(35, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "label1";
            // 
            // BinaryCounter
            // 
            this.ClientSize = new System.Drawing.Size(484, 162);
            this.Controls.Add(this.label1);
            this.Name = "BinaryCounter";
            this.ResumeLayout(false);
            this.PerformLayout();

        }
    }
}

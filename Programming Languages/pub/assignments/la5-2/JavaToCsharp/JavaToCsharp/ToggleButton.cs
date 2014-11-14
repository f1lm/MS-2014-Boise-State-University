using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace JavaToCsharp
{
    class ToggleButton : Form
    {
        internal Panel LightSwitch;
        internal Button btnToggle;

        private void InitializeComponent()
        {
            this.LightSwitch = new System.Windows.Forms.Panel();
            this.btnToggle = new System.Windows.Forms.Button();
            this.LightSwitch.SuspendLayout();
            this.SuspendLayout();
            // 
            // LightSwitch
            // 
            this.LightSwitch.Controls.Add(this.btnToggle);
            this.LightSwitch.Location = new System.Drawing.Point(148, 12);
            this.LightSwitch.Name = "LightSwitch";
            this.LightSwitch.Size = new System.Drawing.Size(184, 64);
            this.LightSwitch.TabIndex = 4;
            // 
            // btnToggle
            // 
            this.btnToggle.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnToggle.Location = new System.Drawing.Point(31, 3);
            this.btnToggle.Name = "btnToggle";
            this.btnToggle.Size = new System.Drawing.Size(76, 37);
            this.btnToggle.TabIndex = 0;
            this.btnToggle.Text = "off";
            this.btnToggle.UseVisualStyleBackColor = true;
            // 
            // ToggleButton
            // 
            this.ClientSize = new System.Drawing.Size(484, 162);
            this.Controls.Add(this.LightSwitch);
            this.Name = "ToggleButton";
            this.LightSwitch.ResumeLayout(false);
            this.ResumeLayout(false);

        }
    }
}

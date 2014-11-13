namespace JavaToCsharp
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnClick = new System.Windows.Forms.Button();
            this.lblText = new System.Windows.Forms.Label();
            this.LightSwitch = new System.Windows.Forms.Panel();
            this.LightSwitch.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnClick
            // 
            this.btnClick.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnClick.Location = new System.Drawing.Point(31, 3);
            this.btnClick.Name = "btnClick";
            this.btnClick.Size = new System.Drawing.Size(76, 37);
            this.btnClick.TabIndex = 0;
            this.btnClick.Text = "on";
            this.btnClick.UseVisualStyleBackColor = true;
            this.btnClick.Click += new System.EventHandler(this.btnClick_Click);
            // 
            // lblText
            // 
            this.lblText.AutoSize = true;
            this.lblText.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblText.Location = new System.Drawing.Point(113, 12);
            this.lblText.Name = "lblText";
            this.lblText.Size = new System.Drawing.Size(45, 13);
            this.lblText.TabIndex = 1;
            this.lblText.Text = "Label1";
            // 
            // LightSwitch
            // 
            this.LightSwitch.Controls.Add(this.btnClick);
            this.LightSwitch.Controls.Add(this.lblText);
            this.LightSwitch.Location = new System.Drawing.Point(138, 3);
            this.LightSwitch.Name = "LightSwitch";
            this.LightSwitch.Size = new System.Drawing.Size(184, 64);
            this.LightSwitch.TabIndex = 3;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(484, 162);
            this.Controls.Add(this.LightSwitch);
            this.Name = "Form1";
            this.Text = "LightSwitch";
            this.LightSwitch.ResumeLayout(false);
            this.LightSwitch.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        internal System.Windows.Forms.Button btnClick;
        internal System.Windows.Forms.Label lblText;
        internal System.Windows.Forms.Panel LightSwitch;
    }
}


namespace SDEToolKit
{
    partial class CardHero
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose( bool disposing )
        {
            if ( disposing && ( components != null ) )
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.SkillsPanel = new System.Windows.Forms.Panel();
            this.HeroBackgroundPictureBox = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.HeroBackgroundPictureBox)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.panel1.BackColor = System.Drawing.Color.Transparent;
            this.panel1.BackgroundImage = global::SDEToolKit.Resources.Card_Foreground_Border;
            this.panel1.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Controls.Add(this.HeroBackgroundPictureBox);
            this.panel1.Controls.Add(this.SkillsPanel);
            this.panel1.Location = new System.Drawing.Point(10, 10);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(400, 560);
            this.panel1.TabIndex = 0;
            // 
            // SkillsPanel
            // 
            this.SkillsPanel.BackColor = System.Drawing.Color.Transparent;
            this.SkillsPanel.BackgroundImage = global::SDEToolKit.Resources.Card_Background_SkillsBox;
            this.SkillsPanel.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.SkillsPanel.Location = new System.Drawing.Point(11, 348);
            this.SkillsPanel.Name = "SkillsPanel";
            this.SkillsPanel.Size = new System.Drawing.Size(375, 201);
            this.SkillsPanel.TabIndex = 0;
            // 
            // HeroBackgroundPictureBox
            // 
            this.HeroBackgroundPictureBox.Image = global::SDEToolKit.Resources.Card_Background_Hero_Forest;
            this.HeroBackgroundPictureBox.Location = new System.Drawing.Point(14, 68);
            this.HeroBackgroundPictureBox.Name = "HeroBackgroundPictureBox";
            this.HeroBackgroundPictureBox.Size = new System.Drawing.Size(371, 248);
            this.HeroBackgroundPictureBox.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.HeroBackgroundPictureBox.TabIndex = 1;
            this.HeroBackgroundPictureBox.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::SDEToolKit.Resources.Hero_Portrait;
            this.pictureBox1.Location = new System.Drawing.Point(28, 48);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(262, 268);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 2;
            this.pictureBox1.TabStop = false;
            // 
            // CardHero
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.WhiteSmoke;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.Controls.Add(this.panel1);
            this.DoubleBuffered = true;
            this.Name = "CardHero";
            this.Size = new System.Drawing.Size(420, 580);
            this.panel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.HeroBackgroundPictureBox)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel SkillsPanel;
        private System.Windows.Forms.PictureBox HeroBackgroundPictureBox;
        private System.Windows.Forms.PictureBox pictureBox1;
    }
}

namespace SDEToolKit
{
    partial class HeroViewerForm
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

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.DisplayCard = new SDEToolKit.CardHero();
            this.SuspendLayout();
            // 
            // DisplayCard
            // 
            this.DisplayCard.BackColor = System.Drawing.Color.WhiteSmoke;
            this.DisplayCard.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.DisplayCard.Location = new System.Drawing.Point(12, 12);
            this.DisplayCard.Name = "DisplayCard";
            this.DisplayCard.Size = new System.Drawing.Size(420, 580);
            this.DisplayCard.TabIndex = 1;
            // 
            // HeroViewerForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(808, 645);
            this.Controls.Add(this.DisplayCard);
            this.Name = "HeroViewerForm";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private CardHero DisplayCard;


    }
}


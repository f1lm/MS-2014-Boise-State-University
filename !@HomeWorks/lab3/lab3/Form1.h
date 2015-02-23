#pragma once

# include "histo.h"
namespace lab3 {

	using namespace System;
	using namespace System::ComponentModel;
	using namespace System::Collections;
	using namespace System::Windows::Forms;
	using namespace System::Data;
	using namespace System::Drawing;

	/// <summary>
	/// Summary for Form1
	///
	/// WARNING: If you change the name of this class, you will need to change the
	///          'Resource File Name' property for the managed resource compiler tool
	///          associated with all .resx files this class depends on.  Otherwise,
	///          the designers will not be able to interact properly with localized
	///          resources associated with this form.
	/// </summary>
	public ref class Form1 : public System::Windows::Forms::Form
	{
	public:
		Form1(void)
		{
			InitializeComponent();
			//
			//TODO: Add the constructor code here
			//
		}

	protected:
		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		~Form1()
		{
			if (components)
			{
				delete components;
			}
		}
	private: System::Windows::Forms::PictureBox^  pictureBox1;
	protected: 
	private: System::Windows::Forms::PictureBox^  pictureBox2;
	private: System::Windows::Forms::MenuStrip^  menuStrip1;
	private: System::Windows::Forms::OpenFileDialog^  openFileDialog1;
	private: System::Windows::Forms::ToolStripMenuItem^  openToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  openiToolStripMenuItem;

	private: System::Windows::Forms::Button^  button1;
	private: System::Windows::Forms::Button^  button2;
	private: System::Windows::Forms::ToolStripMenuItem^  editToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  avaregFilterToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  mideanFilterToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  maxFilterToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  minFilterToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  lablaceToolStripMenuItem;
	private: System::Windows::Forms::ToolStripMenuItem^  noiseToolStripMenuItem;
	private: System::Windows::Forms::TextBox^  textBox1;


	private:
		/// <summary>
		/// Required designer variable.
		/// </summary>
		System::ComponentModel::Container ^components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		void InitializeComponent(void)
		{
			this->pictureBox1 = (gcnew System::Windows::Forms::PictureBox());
			this->pictureBox2 = (gcnew System::Windows::Forms::PictureBox());
			this->menuStrip1 = (gcnew System::Windows::Forms::MenuStrip());
			this->openToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->openiToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->editToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->avaregFilterToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->mideanFilterToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->maxFilterToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->minFilterToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->lablaceToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->noiseToolStripMenuItem = (gcnew System::Windows::Forms::ToolStripMenuItem());
			this->openFileDialog1 = (gcnew System::Windows::Forms::OpenFileDialog());
			this->button1 = (gcnew System::Windows::Forms::Button());
			this->button2 = (gcnew System::Windows::Forms::Button());
			this->textBox1 = (gcnew System::Windows::Forms::TextBox());
			(cli::safe_cast<System::ComponentModel::ISupportInitialize^  >(this->pictureBox1))->BeginInit();
			(cli::safe_cast<System::ComponentModel::ISupportInitialize^  >(this->pictureBox2))->BeginInit();
			this->menuStrip1->SuspendLayout();
			this->SuspendLayout();
			// 
			// pictureBox1
			// 
			this->pictureBox1->Location = System::Drawing::Point(24, 94);
			this->pictureBox1->Name = L"pictureBox1";
			this->pictureBox1->Size = System::Drawing::Size(265, 234);
			this->pictureBox1->SizeMode = System::Windows::Forms::PictureBoxSizeMode::StretchImage;
			this->pictureBox1->TabIndex = 0;
			this->pictureBox1->TabStop = false;
			// 
			// pictureBox2
			// 
			this->pictureBox2->Location = System::Drawing::Point(454, 42);
			this->pictureBox2->Name = L"pictureBox2";
			this->pictureBox2->Size = System::Drawing::Size(336, 301);
			this->pictureBox2->SizeMode = System::Windows::Forms::PictureBoxSizeMode::StretchImage;
			this->pictureBox2->TabIndex = 1;
			this->pictureBox2->TabStop = false;
			// 
			// menuStrip1
			// 
			this->menuStrip1->Items->AddRange(gcnew cli::array< System::Windows::Forms::ToolStripItem^  >(2) {this->openToolStripMenuItem, 
				this->editToolStripMenuItem});
			this->menuStrip1->Location = System::Drawing::Point(0, 0);
			this->menuStrip1->Name = L"menuStrip1";
			this->menuStrip1->Size = System::Drawing::Size(818, 28);
			this->menuStrip1->TabIndex = 2;
			this->menuStrip1->Text = L"menuStrip1";
			// 
			// openToolStripMenuItem
			// 
			this->openToolStripMenuItem->DropDownItems->AddRange(gcnew cli::array< System::Windows::Forms::ToolStripItem^  >(1) {this->openiToolStripMenuItem});
			this->openToolStripMenuItem->Name = L"openToolStripMenuItem";
			this->openToolStripMenuItem->Size = System::Drawing::Size(55, 24);
			this->openToolStripMenuItem->Text = L"open";
			// 
			// openiToolStripMenuItem
			// 
			this->openiToolStripMenuItem->Name = L"openiToolStripMenuItem";
			this->openiToolStripMenuItem->Size = System::Drawing::Size(116, 24);
			this->openiToolStripMenuItem->Text = L"openi";
			this->openiToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::openiToolStripMenuItem_Click);
			// 
			// editToolStripMenuItem
			// 
			this->editToolStripMenuItem->DropDownItems->AddRange(gcnew cli::array< System::Windows::Forms::ToolStripItem^  >(6) {this->avaregFilterToolStripMenuItem, 
				this->mideanFilterToolStripMenuItem, this->maxFilterToolStripMenuItem, this->minFilterToolStripMenuItem, this->lablaceToolStripMenuItem, 
				this->noiseToolStripMenuItem});
			this->editToolStripMenuItem->Name = L"editToolStripMenuItem";
			this->editToolStripMenuItem->Size = System::Drawing::Size(47, 24);
			this->editToolStripMenuItem->Text = L"edit";
			// 
			// avaregFilterToolStripMenuItem
			// 
			this->avaregFilterToolStripMenuItem->Name = L"avaregFilterToolStripMenuItem";
			this->avaregFilterToolStripMenuItem->Size = System::Drawing::Size(165, 24);
			this->avaregFilterToolStripMenuItem->Text = L"avareg filter";
			this->avaregFilterToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::avaregFilterToolStripMenuItem_Click);
			// 
			// mideanFilterToolStripMenuItem
			// 
			this->mideanFilterToolStripMenuItem->Name = L"mideanFilterToolStripMenuItem";
			this->mideanFilterToolStripMenuItem->Size = System::Drawing::Size(165, 24);
			this->mideanFilterToolStripMenuItem->Text = L"Midean Filter";
			this->mideanFilterToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::mideanFilterToolStripMenuItem_Click);
			// 
			// maxFilterToolStripMenuItem
			// 
			this->maxFilterToolStripMenuItem->Name = L"maxFilterToolStripMenuItem";
			this->maxFilterToolStripMenuItem->Size = System::Drawing::Size(165, 24);
			this->maxFilterToolStripMenuItem->Text = L"max filter";
			this->maxFilterToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::maxFilterToolStripMenuItem_Click);
			// 
			// minFilterToolStripMenuItem
			// 
			this->minFilterToolStripMenuItem->Name = L"minFilterToolStripMenuItem";
			this->minFilterToolStripMenuItem->Size = System::Drawing::Size(165, 24);
			this->minFilterToolStripMenuItem->Text = L"min filter";
			this->minFilterToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::minFilterToolStripMenuItem_Click);
			// 
			// lablaceToolStripMenuItem
			// 
			this->lablaceToolStripMenuItem->Name = L"lablaceToolStripMenuItem";
			this->lablaceToolStripMenuItem->Size = System::Drawing::Size(165, 24);
			this->lablaceToolStripMenuItem->Text = L"lablace";
			this->lablaceToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::lablaceToolStripMenuItem_Click);
			// 
			// noiseToolStripMenuItem
			// 
			this->noiseToolStripMenuItem->Name = L"noiseToolStripMenuItem";
			this->noiseToolStripMenuItem->Size = System::Drawing::Size(165, 24);
			this->noiseToolStripMenuItem->Text = L"Noise";
			this->noiseToolStripMenuItem->Click += gcnew System::EventHandler(this, &Form1::noiseToolStripMenuItem_Click);
			// 
			// openFileDialog1
			// 
			this->openFileDialog1->FileName = L"openFileDialog1";
			// 
			// button1
			// 
			this->button1->Location = System::Drawing::Point(34, 55);
			this->button1->Name = L"button1";
			this->button1->Size = System::Drawing::Size(174, 23);
			this->button1->TabIndex = 4;
			this->button1->Text = L"histogram equalization";
			this->button1->UseVisualStyleBackColor = true;
			this->button1->Click += gcnew System::EventHandler(this, &Form1::button1_Click_1);
			// 
			// button2
			// 
			this->button2->Location = System::Drawing::Point(250, 55);
			this->button2->Name = L"button2";
			this->button2->Size = System::Drawing::Size(149, 23);
			this->button2->TabIndex = 5;
			this->button2->Text = L"button2";
			this->button2->UseVisualStyleBackColor = true;
			this->button2->Click += gcnew System::EventHandler(this, &Form1::button2_Click);
			// 
			// textBox1
			// 
			this->textBox1->Location = System::Drawing::Point(319, 290);
			this->textBox1->Name = L"textBox1";
			this->textBox1->Size = System::Drawing::Size(100, 24);
			this->textBox1->TabIndex = 6;
			// 
			// Form1
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(7, 16);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(818, 387);
			this->Controls->Add(this->textBox1);
			this->Controls->Add(this->button2);
			this->Controls->Add(this->button1);
			this->Controls->Add(this->pictureBox2);
			this->Controls->Add(this->pictureBox1);
			this->Controls->Add(this->menuStrip1);
			this->MainMenuStrip = this->menuStrip1;
			this->Name = L"Form1";
			this->Text = L"Form1";
			(cli::safe_cast<System::ComponentModel::ISupportInitialize^  >(this->pictureBox1))->EndInit();
			(cli::safe_cast<System::ComponentModel::ISupportInitialize^  >(this->pictureBox2))->EndInit();
			this->menuStrip1->ResumeLayout(false);
			this->menuStrip1->PerformLayout();
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion
		public: 	String  ^filename;
	private: System::Void openiToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {
				  System::Windows::Forms::DialogResult result;
				 result=this->openFileDialog1->ShowDialog();
				 if (result==System::Windows::Forms::DialogResult::OK){
					 filename=openFileDialog1->FileName;
					 Bitmap ^ im1= gcnew Bitmap(filename);
					int w=im1->Width;
					int h=im1->Height;
					 //pictureBox1->Width=w;
					 //pictureBox1->Height=h;

					pictureBox1->Image=im1;


				 }

			 }
private: System::Void button1_Click(System::Object^  sender, System::EventArgs^  e) {
////
Bitmap	^  im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
 //hist_equalize = new Bitmap(image);

            int  hist[256];
            int sum=0;
            int sum_of_hist[256];
            int area = im1->Height * im1->Width;
            double constant = 255 / area;
            int k=(int)constant;
 
            for (int i = 0; i < im1->Height; i++)
            {
				for (int j = 0; j < im1->Width; j++)
                {
					
					Color c=im1->GetPixel(j,i);
					/*
                    r = image.GetPixel(j, i).R;
                    g = image.GetPixel(j, i).G;
                    b = image.GetPixel(j, i).B;*/
					int r=c.R;
					int b=c.B;
					int g=c.G;
                  int  avr = (r + g + b) / 3;
                    hist[avr] = hist[avr] + 1;
                   
                }
               
            }
 
            for (int i = 0; i < 256; i++)
            {
                sum = sum + hist[i];
                sum_of_hist[i] = sum;
 
            }
 
			for (int i = 0; i < im1->Height; i++)
            {
				for (int j = 0; j < im1->Width; j++)
                {
                   Color c=im1->GetPixel(j,i);
				  // int  x =Math::Round(um_of_hist[avr]
					int r=c.R;
					int b=c.B;
					int g=c.G;

                   //int avr = (r + g + b) / 3;
					int  x =Math::Round((sum_of_hist[c.R])*255/area);
                   // im2->SetPixel(x,y,Color::FromArgb(r,g,b));
				  // int t[256];
					//t[i]=x;
					////im1->SetPixel(j,i,Color::FromArgb(t[i],k*sum_of_hist[avr],k*sum_of_hist[avr]));
					if ( x> 255|| x<0)
						x=255;
					else
					im1->SetPixel(j,i,Color::FromArgb(x,x,x));
                }
            }
 
            pictureBox2->Image = im1;
 
         
 
 
            }
// 
//  Bitmap	^  im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);      
// 
//long GrHst[256]; long HstValue = 0;
//	long GrSum [256]; long SumValue = 0;
//	for (int row = 0; row<im1->Height; row++)
//		for (int col = 0; col<im1->Width; col++)
//		{
//			HstValue = (long)(255 * im1->GetPixel(col,row).GetBrightness());
//			GrHst[HstValue]++;
//		}
//	for (int level = 0; level<255; level++)
//	{
//		SumValue += GrHst[level];
//		GrSum[level] = SumValue;
//	}
//	for (int row = 0; row<im1->Height; row++)
//		for (int col = 0; col<im1->Width; col++)
//		{
//			Color c=im1->GetPixel(col,row);
//			long HstValue = (255 * c.GetBrightness());
//		 HstValue = (255 / (im1->Width * im1->Height) * GrSum[HstValue] - HstValue);
//			int R = (int)Math::Min(255,c.R + HstValue/3); //.299
//			int G = (int)Math::Min(255,c.G + HstValue/3); //.587
//			int B = (int)Math::Min(255,c.B + HstValue/3); //.112
//			im1->SetPixel(col,row,Color::FromArgb(Math::Max(R,0),Math::Max(G,0),Math::Max(B,0)));
//			
//		}			
//	
//
// pictureBox2->Image = im1;    
//		 }

		 
private: System::Void button1_Click_1(System::Object^  sender, System::EventArgs^  e) {

Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
			im1=equalization(im1);
			this->pictureBox2->Image=im1;

          
 
         
  
            }

		 
private: System::Void button2_Click(System::Object^  sender, System::EventArgs^  e) {
Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
Bitmap	^ im2= dynamic_cast <Bitmap ^> (this->pictureBox2->Image);
			im1=histmatch(im1,im2);
			//this->pictureBox3->Image=im1;
	

        }





		 
private: System::Void avaregFilterToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {

Bitmap	^  im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);

int fsize=3;
int h=im1->Height;
int w=im1->Width;
int  AvrgFilter[3][3]= {1,2,1,2,4,2,1,2,1};
for (int x=1;x<w-1 ;x++)
 for(int y=1;y<h-1 ;y++){
  int r= 0,g=0,b=0;
  for ( int i=-fsize /2;i<= fsize /2;i++)
   for (int  j=- fsize /2;j<= fsize /2;j++){
	  Color c=im1->GetPixel(x+i,y+j);
	  r+=c.R* AvrgFilter [i+ fsize /2][j+ fsize /2];
	  g+=c.G* AvrgFilter [i+ fsize /2][j+ fsize /2];
	  b+=c.B* AvrgFilter [i+ fsize /2][j+ fsize /2];}
  r=r/16;g=g/16;b=b/16;
  im1->SetPixel(x,y,Color::FromArgb(r,g,b));}// for 
	 pictureBox2->Image = im1;}


		 
private: System::Void mideanFilterToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {


Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
			im1=Median(im1);
			this->pictureBox2->Image=im1;


//int fsize=3;
//int h=im1->Height;
//int w=im1->Width;
//int  AvrgFilter[3][3]= {1,2,1,2,2,2,1,2,1};// replace the midian 
//for (int x=1;x<w-1 ;x++)
// for(int y=1;y<h-1 ;y++){
//  int r= 0,g=0,b=0;
//  for ( int i=-fsize /2;i<= fsize /2;i++)
//   for (int  j=- fsize /2;j<= fsize /2;j++){
//	  Color c=im1->GetPixel(x+i,y+j);
//	  r+=c.R* AvrgFilter [i+ fsize /2][j+ fsize /2];
//	  g+=c.G* AvrgFilter [i+ fsize /2][j+ fsize /2];
//	  b+=c.B* AvrgFilter [i+ fsize /2][j+ fsize /2];}
//  r=r/16;g=g/16;b=b/16;
//  im1->SetPixel(x,y,Color::FromArgb(r,g,b));}// for 
//	 pictureBox2->Image = im1;

		 }		 
private: System::Void maxFilterToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {
 //int maxfilter[3][3]={1,1,1,2,2,2,2,4};

Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
			im1=maxfilter(im1);
			this->pictureBox2->Image=im1;

}

		 
private: System::Void minFilterToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {


Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
			im1=minfilter(im1);
			this->pictureBox2->Image=im1;


		 }
private: System::Void lablaceToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {

Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
			im1=laplace(im1);
			this->pictureBox2->Image=im1;


		 }

private: System::Void noiseToolStripMenuItem_Click(System::Object^  sender, System::EventArgs^  e) {
Bitmap	^ im1= dynamic_cast <Bitmap ^> (this->pictureBox1->Image);
int th=Convert::ToInt16(textBox1->Text);
			im1=Noise(im1,th);
			this->pictureBox2->Image=im1;
			 
		 }
};
}


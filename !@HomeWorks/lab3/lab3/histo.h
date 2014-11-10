using namespace System::Collections;
using namespace System::Windows::Forms;
using namespace System::Data;
using namespace System::Drawing;
#include "stdafx.h" 
using  System::Math;
using System::Random;

Bitmap  ^ equalization(Bitmap  ^im1){

			Bitmap  ^ im2=gcnew Bitmap(im1);
			int w=im1->Width;
			int h=im1->Height;
			 int Hist[256];
			int cum[256];
			int t[256];
			int x,y,i;
			Color c;
			for (x = 0 ;x<256;x++) {
			  Hist[x] = 0;
			  cum[x] = 0;
			t[x]=0;
			}
			for (x = 0;x<w;x++) {
			  for (y = 0;y<h;y++) {
				c = im1->GetPixel(x,y);
						i=c.R;
				Hist[i]++ ;
			  }
			}
			cum[0]=Hist[0];
			for (x=1;x<256;x++)
			{
				cum[x]=cum[x-1]+Hist[x];
			}

            for (x=0;x<256;x++)
			{
				int j=Math::Round(cum[x]*(255)/(h*w));
			  t[x] =j;
			//  inv_t[j]=x;
			}
			for (x = 0;x<w;x++) {
			  for (y = 0;y<h;y++) {
				Color c = im1->GetPixel(x,y);
				im2->SetPixel(x,y,Color::FromArgb(t[c.R],t[c.R],t[c.R]));
			  }
			}
			return im2;

}

Bitmap  ^ histmatch(Bitmap  ^im1,Bitmap  ^im2)
{
            Bitmap  ^ im3=gcnew Bitmap(im1);
			int w=im1->Width;
			int h=im1->Height;
		    int Hist[256];
			int Hist2[256];
			int cum[256];
			int cum2[256];
			int t[256];
			int t2[256];
			int inv_t[256];
			int inv_t2[256];
			int x,y,i;
			Color c,c2;
			for (x = 0 ;x<256;x++) {
			  Hist[x] = 0;
			  cum[x] = 0;
			t[x]=0;
			 Hist2[x] = 0;
			  cum2[x] = 0;
			t2[x]=0;
			}
			for (x = 0;x<w;x++) {
			  for (y = 0;y<h;y++) {
				c = im1->GetPixel(x,y);
				c2 = im2->GetPixel(x,y);
						i=c.R;
				Hist[i]++ ;
				Hist2[i]++ ;
			  }
			}
			cum[0]=Hist[0];
			cum2[0]=Hist2[0];
			for (x=1;x<256;x++)
			{
				cum[x]=cum[x-1]+Hist[x];
				cum2[x]=cum2[x-1]+Hist2[x];
			}

            for (x=0;x<256;x++)
			{
				int j=Math::Round(cum[x]*(255)/(h*w));
			  t[x] =j;
				}
			 for (x=0;x<256;x++)
			{
				int j=Math::Round(cum[x]*(255)/(h*w));
				 inv_t2[x]=inv_t[j];
			}
			for (x = 0;x<w;x++) {
			  for (y = 0;y<h;y++) {
				Color c = im1->GetPixel(x,y);
				im3->SetPixel(x,y,Color::FromArgb(t[c.R],t[c.R],t[c.R]));
			  }
			}
			return im3;
}

Bitmap ^ maxfilter(Bitmap ^ im1){ 

int h= im1->Height;
int w= im1->Width;
Bitmap ^im2=gcnew Bitmap(w,h);
int fsize=3;
int x,y;
int maxred=0,maxgreen=0,maxblue=0;
int AvrgFilter[3][3]= {1,2,1,2,4,2,1,2,1};
for (x=1;x<w-1 ;x++)
for(y=1;y<h-1 ;y++){
int r,g,b;
int maxred=0,maxgreen=0,maxblue=0;
for ( int i=- fsize /2;i<= fsize /2;i++)
for (int j=- fsize /2;j<= fsize /2;j++){
Color c=im1->GetPixel(x+i,y+j);
r=c.R;
if(r>maxred)
maxred=r;
g=c.G;
if(g>maxgreen)
maxgreen=g;
b=c.B;
if(b>maxblue)
maxblue=b;}

im2->SetPixel(x,y,Color::FromArgb(maxred,maxgreen,maxblue));}
return im2; }

Bitmap ^ Noise(Bitmap ^ im1,float th){ 

int h= im1->Height;
int w= im1->Width;
Bitmap ^im2=gcnew Bitmap(w,h);
int count =w*h*th;

Random rndx(4523);
Random rndy(3712);
Random rndcol(5678);

for (int i=1;i<count ;i++){
int x=rndx.Next(1,w-2);
int y=rndy.Next(1,h-2);

int c=rndcol.Next(0,7);
if(c=0)
im2->SetPixel(x,y,Color::Black);
else

im2->SetPixel(x,y,Color::White);}
return im2; }

Bitmap ^ minfilter(Bitmap ^ im1){ 

int h= im1->Height;
int w= im1->Width;
Bitmap ^im2=gcnew Bitmap(w,h);
int fsize=3;
int x,y;
int minred=255,mingreen=255,minblue=255;
int AvrgFilter[3][3]= {1,2,1,2,4,2,1,2,1};
for (x=1;x<w-1 ;x++)
for(y=1;y<h-1 ;y++){
int r= 0,g=0,b=0;
int minred=255,mingreen=255,minblue=255;
for ( int i=- fsize /2;i<= fsize /2;i++)
for (int j=- fsize /2;j<= fsize /2;j++){
Color c=im1->GetPixel(x+i,y+j);
r=c.R;
if(r<minred)
minred=r;
g=c.G;
if(g<mingreen)
mingreen=g;
b=c.B;
if(b<minblue)
minblue=b;}
im2->SetPixel(x,y,Color::FromArgb(minred,mingreen,minblue));}
return im2; }

Bitmap ^ laplace(Bitmap ^ im1){ 

int h= im1->Height;
int w= im1->Width;
Bitmap ^im2=gcnew Bitmap(w,h);
int fsize=3;
int x,y;
int lab[3][3]= {0,1,0,1,-4,1,0,1,0};
//int lab[3][3]= {0,-1,0,-1,5,-1,0,-1,0};
//int lab[3][3]= {0,-0,0,0,-2,1,0,1,0};
//int lab[3][3]= {0,0,0,0,3,-1,0,-1,0};
for (x=1;x<w-1 ;x++)
for(y=1;y<h-1 ;y++){
//int r=0,g=0,b=0;
int r=0,g=0,b=0;
//int minred=255,mingreen=255,minblue=255;
for ( int i=- fsize /2;i<= fsize /2;i++)
for (int j=- fsize /2;j<= fsize /2;j++){
Color c=im1->GetPixel(x+i,y+j);
 r+=c.R*lab[i+fsize/2][j+fsize/2];
 g+=c.G*lab[i+fsize/2][j+fsize/2];
 b+=c.B*lab[i+fsize/2][j+fsize/2];
}
if (r >255 )
r=255;
if (g >255 )
g=255;
if (b >255 )
b=255;
if (r <0 )
r=0;
if (g <0 )
g=0;
if (b <0 )
b=0;
im2->SetPixel(x,y,Color::FromArgb(r,g,b));}
return im2; }
	
Bitmap ^ Median(Bitmap ^ im1){

	int w=im1->Width,h=im1->Height;
Bitmap  ^im2=gcnew Bitmap(w,h);
int fsize=3;
for (int x=1;x<w-1 ;x++)
 for(int y=1;y<h-1 ;y++){
  ArrayList ^ar= gcnew ArrayList();
  for (int i=- fsize /2;i<= fsize /2;i++)
   for (int j=- fsize /2;j<= fsize /2;j++){
	  Color c=im1->GetPixel(x+i,y+j);
	  ar->Add(c.R);
   }
  ar->Sort();
  //System::Convert::ToInt32(r*4);
  im2->SetPixel(x,y,Color::FromArgb(System::Convert::ToInt32(ar[3]->ToString()),System::Convert::ToInt32 (ar[3]->ToString()),System::Convert::ToInt32(ar[3]->ToString())));
 }
return im2;	
}
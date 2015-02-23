//***********************************************************************
//  BlankOrDark.java       Author: Amit
//
//  Demonstrates the use of escape sequences.
//  Poem copyright by Amit Jain. 
//  Poem illustrates syllabic pattern: Fibonacci series: 1 1 2 3 5 8 13 
//***********************************************************************

public class BlankOrDark
{
   	//-----------------------------------------------------------------
   	//  Prints a poem on multiple lines.
   	//-----------------------------------------------------------------
   	public static void main (String[] args)
   	{
      	System.out.println ("\nblank or dark\n\n"+
						  	"blank\n"+
						  	"blank\n"+
						  	"so blank\n"+
						  	"i am blank\n"+
						  	"so very much blank\n"+
						  	"why should it be so perplexing?\n"+
						  	"\n"+
						  	"dark\n"+
						  	"dark\n"+
						  	"so dark\n"+
						  	"in the dark\n"+
						  	"pick one, blank or dark\n"+
						  	"the muse-- she's lurking both places.\n"+
						  "\n"+
						  /* Copyright symbol on the console */
						  (char)169 + "by Amit Jain"
	  					 );
   	}
}

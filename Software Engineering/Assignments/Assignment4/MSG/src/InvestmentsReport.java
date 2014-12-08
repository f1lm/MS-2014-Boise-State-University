

import java.io.*;
import java.util.*;

public class InvestmentsReport
{

  public static void printReport ()
  //
  // generates the investment report.
  //
  {
    try
    {
	File  investmentFile = new File ("investment.dat");
	int   i = 0;			// used for screen clearing
        Investment tempInvestment = new Investment();

	if (investmentFile.exists ())
	{
          RandomAccessFile inFile = new RandomAccessFile (investmentFile, "r");

	  while (inFile.getFilePointer () != inFile.length ())
	  {
	    //
	    // pause the screen after every three investments
	    //
	    if (((i % 4) == 0) && (i != 0))
	    {
		System.out.println ();
	        System.out.println ();
		System.out.println (" Press <ENTER> to view the next screen...");
		System.in.read ();
	    }

	    //
	    // display a header message after every third painting
	    //
	    if ((i % 4) == 0)
	    {
		UserInterface.clearScreen ();

		System.out.println ();
		System.out.println ();
		System.out.println ("\t       Martha Stockton Greengage Foundation");
		System.out.println ("\t                 INVESTMENT REPORT\n");
	    }

            System.out.println ("-----------------------------------------------------------------------------");

	    tempInvestment.read (inFile);

	    tempInvestment.print ();

	    i++;
	  }

	  inFile.close ();

	}
	else
	{
	  System.out.println ("\nNo investments currently exist.");
	}

	UserInterface.pressEnter();

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: InvestmentsReport.printReport () *****");
	System.out.println ("\t" + e);
    }

  }  // printReport

}

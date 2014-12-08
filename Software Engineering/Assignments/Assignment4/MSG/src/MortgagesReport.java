

import java.io.*;
import java.util.*;

public class MortgagesReport
{

  public static void printReport ()
  //
  // generates the mortgage report.
  //
  {
    try
    {
	File  mortgageFile = new File ("mortgage.dat"); 	// file of mortgage records
	int i = 0;	     	                        	// used for screen clearing
        Mortgage tempMortgage = new Mortgage();                 // used for file reading

	if (mortgageFile.exists ())
	{
            RandomAccessFile inFile = new RandomAccessFile (mortgageFile, "r");

            while (inFile.getFilePointer () != inFile.length ())
	    {
		//
		// pause the screen after every three mortgages
		//
		if (((i % 2) == 0) && (i != 0))
		{
	            System.out.println ();
		    System.out.println ();
	            System.out.println (" Press <ENTER> to view the next screen...");
	            System.in.read ();
		}

		//
		// display a header message after every third mortgage
		//
		if ((i % 2) == 0)
		{
			UserInterface.clearScreen ();

          		System.out.println ();
			System.out.println ();
			System.out.println ("\t       Martha Stockton Greengage Foundation");
			System.out.println ("\t                 MORTGAGE REPORT\n");
		}

		System.out.println ("-----------------------------------------------------------------------------");

		tempMortgage.read (inFile);
	        tempMortgage.print ();

		i++;
	      }

	      inFile.close ();
            }
	    else
	    {
		System.out.println ("\nNo mortgages currently exist.");
	    }

	    UserInterface.pressEnter();
        }
	catch (Exception e)
	{
	  System.out.println ("***** Error: MortgagesReport.printReport () *****");
	  System.out.println ("\t" + e);
        }

  }  // printReport

}



import java.io.*;
import java.util.*;

class MSGApplication
{

  private static float estimatedAnnualOperatingExpenses;	// annual operating expenses
  private static float estimatedFundsForWeek;                   // weekly funds available

  // getter for annualOperatingExpenses
  public static float getAnnualOperatingExpenses () { return estimatedAnnualOperatingExpenses; }

  public static void setAnnualOperatingExpenses (float newAnnualOperatingExpenses)
  //
  // Validates new annual operating expenses, writes data to opexp.dat
  // for use in the current execution.
  //
  {

    try
    {
	if (newAnnualOperatingExpenses >= 0.0)
	{
	  File operatingExpensesFile = new File ("opexp.dat");                            // file containing annual operating expenses
	  FileOutputStream newFileOutput = new FileOutputStream (operatingExpensesFile);  // output stream for newPrintStream
	  PrintStream newFilePrint = new PrintStream (newFileOutput);	                  // to output newAnnualOperatingExpenses

          newFilePrint.println (newAnnualOperatingExpenses);
	  newFilePrint.close ();
	  newFileOutput.close ();

	  estimatedAnnualOperatingExpenses = newAnnualOperatingExpenses;
	}
      }
      catch (Exception e)
      {
	System.out.println ("***** Error: MSGApplication.setAnnualOperatingExpenses () *****");
	System.out.println ("\t" + e);
      }

  }  // setAnnualOperatingExpenses ()

//----------------------------------------------------------------------------------------------------------------------------------------------

  public static void updateAnnualOperatingExpenses ()
  //
  // updateAnnualOperatingExpenses obtains the new annual operating expenses from user, validates,
  // and then writes the data to the operating expenses file.
  //
  {
    try
    {
	char	      c;			    // character entered by user
	String        input;			    // buffer for line of characters
	float         newAnnualOperatingExpenses;   // for storing user's response

	UserInterface.clearScreen ();

	System.out.println ("\nEnter new annual operating expenses:");
	input = UserInterface.getString();

	Float tempFloat = new Float (input.toString ());
	newAnnualOperatingExpenses = tempFloat.floatValue ();

	setAnnualOperatingExpenses (newAnnualOperatingExpenses);
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: MSGApplication.updateAnnualOperatingExpenses () *****");
	System.out.println ("\t" + e);
    }

  }  // updateAnnualOperatingExpenses ()

//----------------------------------------------------------------------------------------------------------------------------------------------

  // getter-setters for estimatedFundsForWeek
  public static float getEstimatedFundsForWeek () { return estimatedFundsForWeek; }

  public static void setEstimatedFundsForWeek(float e)
  //
  //  display report for each change of estimate
  //
  {

    estimatedFundsForWeek = e;
    EstimatedFundsReport.printReport();

  }

//----------------------------------------------------------------------------------------------------------------------------------------------

  private static void initializeApplication ()
  //
  // initializeApplication initializes annual operating expenses from file opexp.dat, if it exists.
  // If file does not exist, annual operating expenses are set to 0.0 by calling
  // setAnnualOperatingExpenses
  //
  {
    try
    {
	File  operatingExpensesFile = new File ("opexp.dat");	// file containing annual operating expenses

	if (!operatingExpensesFile.exists ())
	{
          setAnnualOperatingExpenses ( (float) 0.0);
	}
	else
	{
	  RandomAccessFile  inFile = new RandomAccessFile (operatingExpensesFile, "r");
          char	            c;		        // character entered by user
          String            input;        	// buffer for line of characters

          input = UserInterface.getString();

          Float tempFloat = new Float (input.toString ());
	  estimatedAnnualOperatingExpenses = tempFloat.floatValue ();

	  inFile.close ();
	}
     }
     catch (Exception e)
     {
        System.out.println ("***** Error: MSGApplication.initializeApplication () *****");
        System.out.println ("\t" + e);
     }

  }  // initializeApplication ()

//----------------------------------------------------------------------------------------------------------------------------------------------

  public static void main (String args[])
  //
  // main method of MSG product
  // First performs initialization by calling initializeApplication,
  // then calls displayMainMenu to solicit user's choice.
  //
  {
    initializeApplication ();
    UserInterface.displayMainMenu ();
  }  // main ()

}  // class MSGApplication









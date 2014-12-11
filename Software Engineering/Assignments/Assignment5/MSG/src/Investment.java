
import java.io.*;
import java.util.*;

class Investment extends Asset
{

  private String investmentName;        	// investment name
  private float	 expectedAnnualReturn;  	// expected annual return on investment
  private String expectedAnnualReturnUpdated;   // date expected annual return updated

  // getter-setter methods for Investment
  public String getInvestmentName () { return investmentName; }
  public void setInvestmentName (String n) { investmentName = n; }
  public float getExpectedAnnualReturn () { return expectedAnnualReturn; }
  public void setExpectedAnnualReturn (float r) { expectedAnnualReturn = r; }
  public String getExpectedAnnualReturnUpdated () { return expectedAnnualReturnUpdated; }
  public void setExpectedAnnualReturnUpdated (String d) { expectedAnnualReturnUpdated = d; }

  public float totalWeeklyReturnOnInvestment ()
  //
  // totalWeeklyReturnOnInvestment reads records from the investments
  // file and computes totalAnnualReturn by summing each expectedAnnualReturn
  // on investments and dividing by WEEKS_IN_YEAR.
  //
  {
    try
    {
	File  investmentFile = new File ("investment.dat");
	float totalAnnualReturn = (float) 0.0;	// total annual return on investments

	if (investmentFile.exists ())
	{
          RandomAccessFile inFile = new RandomAccessFile (investmentFile, "r");

	  while (inFile.getFilePointer () != inFile.length ())
	  {
	      read (inFile);
	      totalAnnualReturn += expectedAnnualReturn;
          }

	  inFile.close ();
	}

	return (totalAnnualReturn / (float) 52.0);
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Investment.totalWeeklyReturnOnInvestment () *****");
	System.out.println ("***** Returned a value of 0 *****");
	System.out.println ("\t" + e);
	return (float) 0.0;
    }

  }  // totalWeeklyReturnOnInvestment

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public boolean find (String findInvestmentID)
  //
  // find locates a given investment record if it exists.
  // Returns true if the investment is located, otherwise false.
  //
  {
    try
    {
	File	investmentFile = new File ("investment.dat");
	boolean	found = false;		// result of comparison

	if (investmentFile.exists ())
	{
          RandomAccessFile inFile = new RandomAccessFile (investmentFile, "r");

          while (!found && (inFile.getFilePointer () != inFile.length ()))
	  {
	      read (inFile);

	      if (assetNumber.compareTo (findInvestmentID) == 0) found = true;
          }
	  inFile.close ();
        }

        return found;
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Investment.find () *****");
	System.out.println ("\t" + e);

	return false;
    }

  }  // find

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void read (RandomAccessFile fileName)
  //
  // reads an investment record from fileName.
  // Assumes that the existence of fileName has already been established.
  //
  {
    try
    {
	String  inputString = new String ();	// for storing investment record
	int	i = 0;		                // position in record

	inputString = fileName.readLine ();

	StringBuffer input = new StringBuffer ();	// for storing field within record

	while (inputString.charAt (i) != '|')
	{
	  input.append (inputString.charAt (i));
	  i++;
	}

	assetNumber = input.toString ();
	i++;

        input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	  input.append (inputString.charAt (i));
	  i++;
	}
	investmentName = input.toString ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	  input.append (inputString.charAt (i));
	  i++;
	}
	Float tempFloat = new Float (input.toString ());
	expectedAnnualReturn = tempFloat.floatValue ();
	i++;

	input = new StringBuffer ();
	while (i < inputString.length ())
	{
	  input.append (inputString.charAt (i));
	  i++;
	}
	expectedAnnualReturnUpdated = input.toString ();

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Investment.read () *****");
	System.out.println ("\t" + e);
    }

  }  // read

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void write (RandomAccessFile fileName)
  //
  // writes an investment record to fileName.
  //
  {
    try
    {
	fileName.writeBytes (assetNumber + "|" + investmentName + "|");
	fileName.writeBytes (expectedAnnualReturn + "|");
	fileName.writeBytes (expectedAnnualReturnUpdated.toString () + "\n");
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Investment.write () *****");
	System.out.println ("\t" + e);
    }

}  // write

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void print ()
  //
  // displays the contents of an investment object.
  //
  {
      System.out.print ("Investment ID: " + assetNumber);
      System.out.println ("\tInvestment Name: " + investmentName);
      System.out.println ("Expected return: " + expectedAnnualReturn);
      System.out.println ("	Date expected return was updated: " + expectedAnnualReturnUpdated);

  }  // print

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void printAll ()
  //
  // displays a list of all investment objects.
  //
  {
      InvestmentsReport.printReport();

  }  // printAll

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void obtainNewData ()
  //
  // Reads a new investment record by calling readInvestmentData.
  //
  {
    readInvestmentData ();
  }  // obtainNewData

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void performDeletion ()
  //
  // performDeletion performs the actual deletion of an investment record from a file.
  //
  {
    try
    {
	File  investmentFile = new File ("investment.dat");
	File  tempInvestmentFile = new File ("investment.tmp");

	Investment investment = new Investment ();	// record to be checked

	if (!investmentFile.exists ())
	{
	  return;
	}

	RandomAccessFile inFile = new RandomAccessFile (investmentFile, "r");
	RandomAccessFile outFile = new RandomAccessFile (tempInvestmentFile, "rw");

	while (inFile.getFilePointer () != inFile.length ())
	{
	  investment.read (inFile);

          if (assetNumber.compareTo (investment.getAssetNumber ()) != 0)
	  {
	      investment.write (outFile);
	  }
	}

	inFile.close ();
	outFile.close ();

	investmentFile.delete ();
	tempInvestmentFile.renameTo (investmentFile);

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Investment.performDeletion () *****");
	System.out.println ("\t" + e);
    }

  }  // performDeletion

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void save ()
  //
  // saves an individual investment record into a file, ordered by investmentID.
  //
  {
    try
    {
	File investmentFile = new File ("investment.dat");	// file of investments
	File  tempInvestmentFile = new File ("investment.tmp");	// temporary file for investments

	Investment  investment = new Investment ();	// record read, then written
	boolean	    found = false;		// terminates while-loop

	RandomAccessFile newFile = new RandomAccessFile (tempInvestmentFile, "rw");

	if (!investmentFile.exists ())
	{
	  write (newFile);
	}
	else
	{
	  RandomAccessFile oldFile = new RandomAccessFile (investmentFile, "r");

	  int compareInvestments; // to find correct place for the new investment

	  while (oldFile.getFilePointer () != oldFile.length ())
	  {
	      investment.read (oldFile);

              compareInvestments = assetNumber.compareTo (investment.getAssetNumber());

	      if ((!found) && (compareInvestments < 0))
	      {
		write (newFile);
		investment.write (newFile);
		found = true;
	      }
	      else if (compareInvestments == 0)
	      {
		write (newFile);
		found = true;
	      } else
		{
		  investment.write (newFile);
		}
	  }  // while

	  if (!found) write (newFile);

	  oldFile.close ();

	}  // else

	newFile.close ();

	investmentFile.delete ();
	tempInvestmentFile.renameTo (investmentFile);

      }
      catch (Exception e)
      {
	  System.out.println ("***** Error: Investment.putRecord () *****");
	  System.out.println ("\t" + e);
      }

  }  // save

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void readInvestmentData ()
  //
  // readInvestmentData obtains input data for all fields of an investment record.
  //
  {
    try
    {
	char	      c;				// character entered by user
	String        input;                      	// buffer for line of characters
	boolean	      valid = false;      		// used to validate length of ID

	while (!valid)
        {
	    System.out.println ("Enter investment number (12 digits): ");
            assetNumber = UserInterface.getString();
            valid = (assetNumber.length () <= 12);

            if (!valid)
		System.out.println ("\n\nThe investment number must be 12 digits long.");
	 }

	 System.out.println ("Enter investment name: ");
	 investmentName = UserInterface.getString();

         System.out.println ("Enter expected annual return: ");
	 input = UserInterface.getString();
	 Float newFloat = new Float (input);
	 expectedAnnualReturn = newFloat.floatValue ();

        System.out.println ("Enter today's date (mm/dd/yy):");
        expectedAnnualReturnUpdated = UserInterface.getString();

      }
      catch (Exception e)
      {
	System.out.println ("***** Error: Investment.readInvestmentData () *****");
	System.out.println ("\t" + e);
      }

  }  // readInvestmentData

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateInvestmentName ()
  {

    System.out.println ("\n\nOld investment name: " + investmentName);
    System.out.println ("Enter new investment name: ");
    investmentName = UserInterface.getString();

  } // updateInvestmentName

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateExpectedReturn ()
  {

    String input;

    System.out.println ("\n\nOld expected return: " + expectedAnnualReturn);
    System.out.println ("Enter new expected return: ");
    input = UserInterface.getString();
    Float tempFloat = new Float (input);
    expectedAnnualReturn = tempFloat.floatValue ();

    System.out.println ("Enter today's date (mm/dd/yy):");
    expectedAnnualReturnUpdated = UserInterface.getString();

  } // updateExpectedReturn

}  // class Investment

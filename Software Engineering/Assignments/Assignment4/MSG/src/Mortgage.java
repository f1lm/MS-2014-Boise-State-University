

import java.io.*;
import java.util.*;

class Mortgage extends Asset
{
  //
  // Instance variables
  //
  private String mortgageeName;		// names of mortgagees
  private float	price;			// price paid for mortgaged property
  private String dateMortgageIssued;	// date mortgage was issued
  private float	currentWeeklyIncome;	// weekly income of mortgagees
  private String weeklyIncomeUpdated;	// date weekly income updated
  private float	annualPropertyTax;	// annual property tax
  private float	annualInsurancePremium;	// annual insurance premium
  private float	mortgageBalance;	// mortgage balance

  static final int NUMBER_OF_MORTGAGE_PAYMENTS = 1560;
  static final float MAXIMUM_PERC_OF_INCOME = (float) 0.28;
  static final float WEEKS_IN_YEAR = (float) 52.0;
  static final float INTEREST_RATE = (float) 0.04;

  // getter-setter methods for Mortgage
  public String getMortgageeName () { return mortgageeName; }
  public void  setMortgageeName (String n) { mortgageeName = n; }
  public float getPrice () { return price; }
  public void  setPrice (float p) { price = p; }
  public String  getDateMortgageIssued () { return dateMortgageIssued; }
  public void  setDateMortgageIssued (String d) { dateMortgageIssued = d; }
  public float getCurrentWeeklyIncome () { return currentWeeklyIncome; }
  public void  setCurrentWeeklyIncome (float c) { currentWeeklyIncome = c; }
  public String  getWeeklyIncomeUpdated () { return weeklyIncomeUpdated; }
  public void  setWeeklyIncomeUpdated (String w) { weeklyIncomeUpdated = w; }
  public float getAnnualPropertyTax () { return annualPropertyTax; }
  public void setAnnualPropertyTax (float p) { annualPropertyTax = p; }
  public float getAnnualInsurancePremium () { return annualInsurancePremium; }
  public void setAnnualInsurancePremium (float a) { annualInsurancePremium = a; }
  public float getMortgageBalance () { return mortgageBalance; }
  public void setMortgageBalance (float m) { mortgageBalance = m; }

  //
  // Instance methods
  //
  public float totalWeeklyNetPayments ()
  //
  // Computes the net total weekly payments made by the mortgagees, that is,
  // the expected total weekly mortgage amount less the expected total weekly grants.
  //
  {
    try
    {

      File mortgageFile = new File ("mortgage.dat");    // file of mortgage records
      float expectedTotalWeeklyMortgages = (float) 0.0; // expected total weekly mortgages
      float expectedTotalWeeklyGrants = (float) 0.0;    // expected total weekly grants
      float capitalRepayment = (float) 0.0;		// capital repayment
      float interestPayment = (float) 0.0;	        // interest payment
      float escrowPayment = (float) 0.0;	        // escrow payment
      float tempMortgage = (float) 0.0;	                // temporary mortgage payment
      float maximumPermittedMortgagePayment = (float) 0.0; // maximum a family is allowed to pay

      if (mortgageFile.exists ())
      {
	RandomAccessFile inFile = new RandomAccessFile (mortgageFile, "r");

	while (inFile.getFilePointer () != inFile.length ())
	{
          read (inFile);

          capitalRepayment = price / NUMBER_OF_MORTGAGE_PAYMENTS;
          interestPayment = mortgageBalance * INTEREST_RATE / WEEKS_IN_YEAR ;
          escrowPayment = (annualPropertyTax + annualInsurancePremium) / WEEKS_IN_YEAR;
          tempMortgage = capitalRepayment + interestPayment + escrowPayment;
          expectedTotalWeeklyMortgages += tempMortgage;
          maximumPermittedMortgagePayment = currentWeeklyIncome * MAXIMUM_PERC_OF_INCOME;

	  if (tempMortgage > maximumPermittedMortgagePayment)
		expectedTotalWeeklyGrants += tempMortgage - maximumPermittedMortgagePayment;
	}

	inFile.close ();

      }	// if

      return (expectedTotalWeeklyMortgages - expectedTotalWeeklyGrants);

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.totalWeeklyNetPayments () *****");
	System.out.println ("\t" + e);
	return ( (float) 0.0);
    }

  }  // totalWeeklyNetPayments

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public boolean find (String findMortgageID)
  //
  // find locates a given mortgage record if it exists.
  // Returns true if the mortgage is located, otherwise false.
  //
  {
    try
    {
	File  mortgageFile = new File ("mortgage.dat"); // file of mortgage records
	boolean	found = false;		                // result of comparison

	if (mortgageFile.exists ())
	{
          RandomAccessFile inFile = new RandomAccessFile (mortgageFile, "r");

	  while (!found && (inFile.getFilePointer () != inFile.length ()))
	  {
	    read (inFile);

	    if (assetNumber.compareTo (findMortgageID) == 0) found = true;
          }

	  inFile.close ();
	}
	return found;
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.find () *****");
	System.out.println ("\t" + e);
	return false;
    }

  }  // find

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void read (RandomAccessFile fileName)
  //
  // reads a mortgage record from fileName.
  // Assumes that the existence of fileName has already been established.
  //
  {
    try
    {
	String  inputString = new String ();	// for storing mortgage record
	int	i = 0;    			// position within string

	inputString = fileName.readLine ();

	StringBuffer input = new StringBuffer ();
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

	mortgageeName = input.toString ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	    input.append (inputString.charAt (i));
	    i++;
  	}

	Float tempFloat = new Float (input.toString ());
	price = tempFloat.floatValue ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
            input.append (inputString.charAt (i));
	    i++;
	}

	dateMortgageIssued = input.toString ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	    input.append (inputString.charAt (i));
	    i++;
        }

	tempFloat = new Float (input.toString ());
	currentWeeklyIncome = tempFloat.floatValue ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	  input.append (inputString.charAt (i));
	  i++;
	}

	weeklyIncomeUpdated = input.toString ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	    input.append (inputString.charAt (i));
	    i++;
	}

	tempFloat = new Float (input.toString ());
	annualPropertyTax = tempFloat.floatValue ();
	i++;

	input = new StringBuffer ();
	while (inputString.charAt (i) != '|')
	{
	    input.append (inputString.charAt (i));
	    i++;
	}

	tempFloat = new Float (input.toString ());
	annualInsurancePremium = tempFloat.floatValue ();
	i++;

	input = new StringBuffer ();
	while (i < inputString.length ())
	{
	    input.append (inputString.charAt (i));
	    i++;
	}

	tempFloat = new Float (input.toString ());
	mortgageBalance = tempFloat.floatValue ();
	i++;
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.read () *****");
	System.out.println ("\t" + e);
    }

  }  // read

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void write (RandomAccessFile fileName)
  //
  // writes a mortgage record to specified file.
  //
  {
    try
    {
	fileName.writeBytes (assetNumber + "|" + mortgageeName + "|");
        fileName.writeBytes (price + "|" + dateMortgageIssued.toString () + "|");
	fileName.writeBytes (currentWeeklyIncome + "|" + weeklyIncomeUpdated.toString () + "|");
	fileName.writeBytes (annualPropertyTax + "|" + annualInsurancePremium + "|");
	fileName.writeBytes (mortgageBalance + "\n");
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.write () *****");
	System.out.println ("\t" + e);
    }

  }  // write

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void print ()
  //
  // displays the names of the fields of a mortgage and their values.
  //
  {
    System.out.print ("Mortgage ID: " + assetNumber);
    System.out.println ("\tMortgagee Name: " + mortgageeName);
    System.out.println ("Price :" + price);
    System.out.println ("	Date mortgage issued: " + dateMortgageIssued);
    System.out.println ("Current weekly income: " + currentWeeklyIncome);
    System.out.println ("	Date weekly income updated: " + weeklyIncomeUpdated);
    System.out.print ("Annual property tax: " + annualPropertyTax);
    System.out.println ("\t\tAnnual insurance premium: " + annualInsurancePremium);
    System.out.println ("Mortgage balance: " + mortgageBalance);
  }  // print

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void printAll ()
  //
  // displays a list of all mortgage objects.
  //
  {
      MortgagesReport.printReport();

  }  // printAll

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void obtainNewData ()
  //
  // obtainNewData reads a new mortgage record by calling readMortgageData.
  //
  {
	readMortgageData ();
  }  // obtainNewData

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void performDeletion ()
  //
  // performDeletion performs the actual deletion of a mortgage record from a file.
  //
  {
    try
    {
	File  mortgageFile = new File ("mortgage.dat");		// file of mortgage records
	File  tempMortgageFile = new File ("mortgage.tmp");	// temporary file of mortgage records
	Mortgage  mortgage = new Mortgage ();	                // record to be checked

	if (!mortgageFile.exists ())
	{
          return;
	}

	RandomAccessFile inFile = new RandomAccessFile (mortgageFile, "r");
	RandomAccessFile outFile = new RandomAccessFile (tempMortgageFile, "rw");

	while (inFile.getFilePointer () != inFile.length ())
	{
	    mortgage.read (inFile);

	    if (assetNumber.compareTo (mortgage.getAssetNumber ()) != 0)
	    {
		mortgage.write (outFile);
	    }
	}

	inFile.close ();
	outFile.close ();

	mortgageFile.delete ();
	tempMortgageFile.renameTo (mortgageFile);
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.performDeletion () *****");
	System.out.println ("\t" + e);
    }

  }  // performDeletion

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void save ()
  //
  // saves an individual mortgage record into a file, ordered by mortgageID.
  //
  {
    try
    {
	File  mortgageFile = new File ("mortgage.dat");		// file of mortgage records
	File  tempMortgageFile = new File ("mortgage.tmp");	// temporary file of mortgage records
	Mortgage  mortgage = new Mortgage ();	                // record read, then written
	boolean	  found = false;		                // terminates while-loop

	RandomAccessFile newFile = new RandomAccessFile (tempMortgageFile, "rw");

	if (!mortgageFile.exists ())
	{
	  write (newFile);
	}
	else
	{
	  RandomAccessFile oldFile = new RandomAccessFile (mortgageFile, "r");

	  int compareMortgages;	// to find correct place for the new mortgage

	  while (oldFile.getFilePointer () != oldFile.length ())
	  {
		mortgage.read (oldFile);

		compareMortgages = assetNumber.compareTo (mortgage.getAssetNumber ());

		if ((!found) && (compareMortgages < 0))
		{
	  	  write (newFile);
		  mortgage.write (newFile);
		  found = true;
		}
		else if (compareMortgages == 0)
		{
		  write (newFile);
		  found = true;
		}
		else
		{
		  mortgage.write (newFile);
		}
	    }  // while

	    if (!found) write (newFile);

	    oldFile.close ();
        }

	newFile.close ();

	mortgageFile.delete ();
	tempMortgageFile.renameTo (mortgageFile);

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.save () *****");
	System.out.println ("\t" + e);
    }

  }  // save

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void readMortgageData ()
  //
  // readMortgageData asks user to enter information for the fields of a mortgage.
  //
  {
    try
    {
	char		c;				// character entered by user
	boolean		valid = false;	        	// used to validate length of ID
        String          input;

	while (!valid)
	{
	  System.out.println ("Enter mortgage number (12 digits): ");
          assetNumber = UserInterface.getString();

	  valid = (assetNumber.toString ().length () <= 12);

          if (!valid)
		System.out.println ("\n\nThe mortgage number must be 12 digits.");

	}

	System.out.println ("Enter mortgagee name: ");
	mortgageeName = UserInterface.getString();

	System.out.println ("Enter price of home: ");
	input = UserInterface.getString();
	Float tempFloat = new Float (input);
	price = tempFloat.floatValue ();

	System.out.println ("Enter date mortgage was issued (mm/dd/yy): ");
	dateMortgageIssued = UserInterface.getString();

	System.out.println ("Enter current weekly income: ");
	input = UserInterface.getString();
	tempFloat = new Float (input.toString ());
	currentWeeklyIncome = tempFloat.floatValue ();

        System.out.println ("Enter today's date (mm/dd/yy):");
        weeklyIncomeUpdated = UserInterface.getString();

        System.out.println ("Enter annual property tax: ");
	input = UserInterface.getString();
	tempFloat = new Float (input.toString ());
	annualPropertyTax = tempFloat.floatValue ();

	System.out.println ("Enter mortgage balance: ");
	input = UserInterface.getString();
	tempFloat = new Float (input.toString ());
	mortgageBalance = tempFloat.floatValue ();
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Mortgage.readMortgageData () *****");
	System.out.println ("\t" + e);
    }

  }  // readMortgageData

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateMortgageeName ()
  {

    System.out.println ("\n\nOld mortgagee name: " + mortgageeName);
    System.out.println ("Enter new mortgagee name: ");
    mortgageeName = UserInterface.getString();

  } // updateMortgageeName

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updatePrice ()
  {

    String input;
    Float tempFloat;

    System.out.println ("\n\nOld price: " + price);
    System.out.println ("Enter new price of home: ");

    input = UserInterface.getString();
    tempFloat = new Float (input);
    price = tempFloat.floatValue ();

  } // updatePrice

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateDate ()
  {

    System.out.println ("\n\nOld mortgage date: " + dateMortgageIssued);
    System.out.println ("Enter date the mortgage was issued (mm/dd/yy):");

    dateMortgageIssued = UserInterface.getString();

  } // updateDate

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateWeeklyIncome ()
  {

    String input;
    Float tempFloat;

    System.out.println ("\n\nOld weekly income: " + currentWeeklyIncome);
    System.out.println ("Enter current weekly income:");

    input = UserInterface.getString();
    tempFloat = new Float (input.toString ());
    currentWeeklyIncome = tempFloat.floatValue ();

    System.out.println ("Enter today's date (mm/dd/yy):");
    weeklyIncomeUpdated = UserInterface.getString();

  } // updateWeeklyIncome

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updatePropertyTax ()
  {

    String input;
    Float tempFloat;

    System.out.println ("\n\nOld annual property tax: " + annualPropertyTax);
    System.out.println ("Enter new annual property tax:");

    input = UserInterface.getString();
    tempFloat = new Float (input.toString ());
    annualPropertyTax = tempFloat.floatValue ();

  } // updatePropertyTax

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateInsurancePremium ()
  {

    String input;
    Float tempFloat;

    System.out.println ("\n\nOld insurance premium: " + annualInsurancePremium);
    System.out.println ("Enter new annual insurance premium:");

    input = UserInterface.getString();
    tempFloat = new Float (input.toString ());
    annualInsurancePremium = tempFloat.floatValue ();;

  } // updateInsurancePremium

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void updateBalance ()
  {

    String input;
    Float tempFloat;

    System.out.println ("\n\nOld mortgagee balance: " + mortgageBalance);
    System.out.println ("Enter new mortgage balance:");

    input = UserInterface.getString();
    tempFloat = new Float (input.toString ());
    mortgageBalance = tempFloat.floatValue ();

  } // updateBalance

}  // class Mortgage

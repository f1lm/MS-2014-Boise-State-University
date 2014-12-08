

import java.io.*;

abstract class Asset
{

  protected String assetNumber;  // unique identifying number of an asset

  // getter-setter methods for Asset
  public String getAssetNumber ()       { return assetNumber; }
  public void setAssetNumber (String a) { assetNumber = a; }

  // virtual methods
  public abstract void read (RandomAccessFile fileName);
  public abstract void print ();
  public abstract void save ();
  public abstract void write (RandomAccessFile fileName);
  public abstract boolean find (String findRecordID);
  public abstract void obtainNewData ();
  public abstract void performDeletion ();

  public void delete ()
  //
  // deletes an Asset
  //
  {
    try
    {
	char	      c;			    // character entered by user
	String        input;                        // buffer for line of characters
	boolean	      done = false;	            // tells when user is done entering information
	boolean       found = false;	            // tells when an investment has been found
	char          choice;           	    // for storing user's response

	while (!found && !done)
	{
	  System.out.println ("Please enter the number of the " + getClass ().getName () +
	                      " to be deleted (12 digits): ");

          input = UserInterface.getString();

	  found = find (input);

	  if (!found)
	  {
	    System.out.println (getClass ().getName () + " " + input.toString () +
				" was not found.");
            System.out.println ("Would you like to enter another " + getClass ().getName ()+ " number?");

            choice = UserInterface.getChar();

	    if (choice == 'n')
	    {
	      done = true;
	    }
	  }
	}

	if (!found)
	{
          return;
	}

	performDeletion ();
	System.out.println ("\nThe record has been deleted.");
	UserInterface.pressEnter();
    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Asset.delete () *****");
	System.out.println ("\t" + e);
    }

  }  // delete

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public void add ()
  //
  // adds a new investment/mortgage.
  //
  {
    try
    {
	int c;	// character entered by user

	obtainNewData ();
	save ();
	System.out.println ("\nThe following record was inserted\n");
	print ();
	UserInterface.pressEnter();

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: Asset.add () *****");
	System.out.println ("\t" + e);
    }

  }  // add

}  // class Asset



import java.io.*;
import java.util.*;

class UserInterface
{

  public static void clearScreen ()
  //
  // clearScreen clears the screen
  //
  {
    int	i;		// loop counter representing the number of blank lines to be printed

    //
    // Implementation-dependent code to clear the screen should replace the code
    // given below.
    //
    for (i = 0; i < 26; i++)
    {
	System.out.println ();
    }

  }  // clearScreen ()

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void pressEnter()
  //
  // press_enter waits until the user presses the <enter> key
  //
  {
     try
     {

       DataInputStream MyInput = new DataInputStream(System.in);
       String inputLine = MyInput.readLine();

     }
     catch (IOException e)
     {

       System.out.println("I/O exeption");

     }

  }

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void displayMainMenu ()
  //
  // displayMainMenu  displays main menu that drives product, offering the user choice
  // of investment data, mortgage data, operating expenses, or reports; the appropriate
  // method is then called, namely displayInvestmentMenu, displayMortgageMenu,
  // updateAnnualOperatingExpenses, or displayReportMenu, respectively.
  // The user may also choose to quit
  //
  {
    boolean done;	// terminates while loop
    char choice;        // user's choice

    done = false;

    while (!done)
    {
	clearScreen ();

	System.out.println ("\t               MAIN MENU\n\n");
	System.out.println ("\t  MARTHA STOCKTON GREENGAGE FOUNDATION\n\n");
	System.out.println ("\t            1. Estimate Funds for Week\n");
	System.out.println ("\t            2. Manage an Investment\n");
	System.out.println ("\t            3. Manage a Mortgage\n");
	System.out.println ("\t            4. Update Operating Expenses\n");
	System.out.println ("\t            5. Produce Reports\n");
	System.out.println ("\t            6. Quit\n\n");
	System.out.println ("Enter your choice and press <ENTER>: ");

	try
	{
          choice = getChar();

	  switch (choice)
	  {

          case '1':
		EstimateFundsForWeek.compute();
		break;

          case '2':
		displayInvestmentMenu ();
		break;

	  case '3':
		displayMortgageMenu ();
		break;

	  case '4':
		MSGApplication.updateAnnualOperatingExpenses ();
		break;

	  case '5':
	        displayReportMenu ();
		break;

          case '6':
	        case '\n':
		done = true;
		break;

          default:
		System.out.println ("\n\nNot a valid choice\n");
                pressEnter();
		break;
	}
      }
      catch (Exception e)
      {
	System.out.println ("***** Error: UserInterface.displayMainMenu () *****");
	System.out.println ("\t" + e);
      }
    }

  }  // displayMainMenu ()

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void displayInvestmentMenu ()
  //
  // displayInvestmentMenu displays investment, offering the user the
  // choice of adding, modifying, or deleting an investment; the appropriate
  // method is then called.  The user may also choose to return to main menu.
  //
  {
    boolean     done;			              // terminates while loop
    char        choice;                              // user's choice
    Investment  investment = new Investment ();      // investment record

    done = false;

    while (!done)
    {
	clearScreen ();

        System.out.println ("\t               INVESTMENTS\n\n");
	System.out.println ("\t  MARTHA STOCKTON GREENGAGE FOUNDATION\n\n");
	System.out.println ("\t            1. Add an investment\n");
	System.out.println ("\t            2. Modify an investment\n");
	System.out.println ("\t            3. Delete an investment\n");
	System.out.println ("\t            4. Exit to main menu\n\n");
	System.out.println ("Enter your choice and press <ENTER>: ");

	try
	{
          choice = getChar();

	  switch (choice)
	  {
	    case '1':
		clearScreen ();
		investment.add ();
		break;

	    case '2':
		clearScreen ();
		AssetManager.manageInvestment ();
		break;

            case '3':
		clearScreen ();
		investment.delete ();
		break;

            case '4':

            case '\n':
		done = true;
		break;

	    default:
		System.out.println ("\n\nNot a valid choice\n");
                pressEnter();
		break;

  	  }
	}
	catch (Exception e)
	{
	    System.out.println ("***** Error: UserInterface.displayInvestmentMenu () *****");
	    System.out.println ("\t" + e);
	}
    }
  }  // displayInvestmentMenu ()

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void displayMortgageMenu ()
  //
  // displayMortgageMenu displays mortgage menu, offering the user the
  // choice of adding, modifying, or deleting a mortgage; the appropriate
  // method is then called. The user may also choose to return to main menu.
  //
  {
    boolean   done = false;		        // terminates while-loop
    char      choice;	                        // user's choice
    Mortgage  mortgage = new Mortgage ();	// mortgage record

    while (!done)
    {
	clearScreen ();

	System.out.println ("\t                MORTGAGES\n\n");
	System.out.println ("\t  MARTHA STOCKTON GREENGAGE FOUNDATION\n\n");
	System.out.println ("\t            1. Add a mortgage\n");
	System.out.println ("\t            2. Modify a mortgage\n");
	System.out.println ("\t            3. Delete a mortgage\n");
	System.out.println ("\t            4. Exit to main menu\n");
	System.out.println ("Enter your choice and press <ENTER>: ");

	try
	{
            choice = getChar();

	    switch (choice)
	    {
		case '1':
	            clearScreen ();
		    mortgage.add ();
		    break;

		case '2':
	            clearScreen ();
		    AssetManager.manageMortgage ();
	            break;

		case '3':
		    clearScreen ();
		    mortgage.delete ();
		    break;

		case '4':

		case '\n':
		  done = true;
		  break;

		default:
		    System.out.println ("\n\nNot a valid choice\n");
                    pressEnter();
		    break;
  	    }
	}
	catch (Exception e)
	{
		System.out.println ("***** Error: UserInterface.displayMortgageMenu () *****");
		System.out.println ("\t" + e);
	}
     }

  }  // displayMortgageMenu ()

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static void displayReportMenu ()
  //
  // displayReportMenu displays report menu, offering the user the choice of
  // investment report, mortgage report, or funds availability report;
  // the appropriate method is then called.
  // The user may also choose to return to main menu.
  //
  {
    boolean	done = false;	      // terminates while loop
    char        choice;               // user's choice

    while (!done)
    {
	clearScreen ();

	System.out.println ("\t                 REPORTS\n\n");
	System.out.println ("\t  MARTHA STOCKTON GREENGAGE FOUNDATION\n\n");
	System.out.println ("\t            1. List of investments\n");
	System.out.println ("\t            2. List of mortgages\n");
	System.out.println ("\t            3. Exit to main menu\n");
	System.out.println ("Enter your choice and press <ENTER>: ");

	try
	{
	    choice = getChar();

	    switch (choice)
	    {

		case '1':
	          Investment.printAll ();
		  break;

		case '2':
		  Mortgage.printAll ();
		  break;

		case '3':

		case '\n':
		  done = true;
		  break;

		default:
		  System.out.println ("\n\nNot a valid choice\n");
                  pressEnter();
		  break;

		}
	      }
              catch (Exception e)
	      {
		System.out.println ("***** Error: UserInterface.displayReportMenu () *****");
		System.out.println ("\t" + e);
	      }
	  }

    }  // displayReportMenu ()

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static char getChar()
  //
  // the following method returns the first character entered on the keyboard
  //
  {

     char ch = '\n';

     try
     {

        Reader in = new InputStreamReader(System.in);
        ch = (char)in.read();

     }
     catch (Exception e)
     {

        System.out.println("Error: " + e.toString());

     }

     return ch;

  }  // getChar

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static int getInt()
  //
  // the following method returns an integer entered from the keyboard
  //
  {

     int res;
     String strInt;

     strInt = getString();
     res = (short)Integer.parseInt(strInt);

     return res;

  } // getInt

//----------------------------------------------------------------------------------------------------------------------------------------------------

  public static String getString()
  //
  // the following method returns a string entered from the keyboard
  //
  {
     String str = "_";

     try
     {

        DataInputStream MyInput = new DataInputStream(System.in);
        str = MyInput.readLine();

     }
     catch (Exception e)
     {

        System.out.println("Error: " + e.toString());

     }

     return str;

  }  // getString

}  // class MSGUtilities

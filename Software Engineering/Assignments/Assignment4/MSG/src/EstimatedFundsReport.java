
import java.io.*;

public class EstimatedFundsReport
{

  public static void printReport ()
  //
  // computes total funds available for purchasing new mortgages in the current week.
  //
  {
    System.out.println ("Funds available: " + MSGApplication.getEstimatedFundsForWeek());
    UserInterface.pressEnter();
  }  // printReport

}

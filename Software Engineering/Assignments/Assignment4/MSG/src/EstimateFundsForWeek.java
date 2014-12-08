

public class EstimateFundsForWeek {

  public static void compute()
  //
  // computes the estimated funds available for week
  //
  {

    try
    {
	float expectedWeeklyInvestmentReturn = (float) 0.0; // expected weekly investment return
	float expectedTotalWeeklyNetPayments = (float) 0.0; // expected total mortgage payments less total weekly grants
        float estimatedFunds = (float) 0.0;

	Investment  inv = new Investment ();	// investment record
	Mortgage    mort = new Mortgage ();	// mortgage record

	expectedWeeklyInvestmentReturn = inv.totalWeeklyReturnOnInvestment ();
	expectedTotalWeeklyNetPayments = mort.totalWeeklyNetPayments ();

        estimatedFunds = (expectedWeeklyInvestmentReturn - (MSGApplication.getAnnualOperatingExpenses () / (float) 52.0) +
                        expectedTotalWeeklyNetPayments);

        MSGApplication.setEstimatedFundsForWeek(estimatedFunds);

    }
    catch (Exception e)
    {
	System.out.println ("***** Error: EstimatedFundsForWeek.compute () *****");
	System.out.println ("\t" + e);
    }

  }  // compute

}

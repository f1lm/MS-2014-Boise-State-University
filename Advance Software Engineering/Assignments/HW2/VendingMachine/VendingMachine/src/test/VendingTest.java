package test;

import vending.Coin;
import vending.VendingMachine;

import junit.framework.*;

public class VendingTest extends TestCase {

	private VendingMachine vending;
	
	public void setUp(){
		vending = new VendingMachine();
		vending.setDrink(VendingMachine.COFFEE, 85, 3);
		vending.setDrink(VendingMachine.JUICE, 60, 2);
		vending.setDrink(VendingMachine.SODA, 115, 5);
	}

	public void test1() {
		vending.insertCoin(Coin.DOLLAR);
		assertTrue("", vending.getDeposit()==100);
		vending.purchase(VendingMachine.JUICE);	
		assertTrue("", vending.getJuice().getCount()==1);
		assertTrue("", vending.getDeposit()==0);
	}
}

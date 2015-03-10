package test;

import vending.Coin;
import vending.Drink;
import vending.VendingMachine;
import junit.framework.*;

import org.junit.*;
import org.junit.Test;

public class VendingTest extends TestCase {

	private VendingMachine vending;

	@Before
	public void setUp() {
		vending = new VendingMachine();
		vending.setDrink(VendingMachine.COFFEE, 85, 3);
		vending.setDrink(VendingMachine.JUICE, 60, 2);
		vending.setDrink(VendingMachine.SODA, 115, 5);
	}

	@After
	public void tearDown() {
		vending = null;
	}

	@Test
	public void test1() {
		vending.insertCoin(Coin.DOLLAR);
		assertTrue("", vending.getDeposit() == 100);
		vending.purchase(VendingMachine.JUICE);
		assertTrue("", vending.getJuice().getCount() == 1);
		assertEquals(40, vending.getChange());
		assertTrue("", vending.getDeposit() == 0);
	}

	@Test
	public void testConstructor() {
		assertEquals(0, vending.getDeposit());
		assertEquals(0, vending.getChange());
	}

	@Test
	public void testCoin() {

		vending.insertCoin(Coin.NICKEL);
		assertEquals(5, vending.getDeposit());

		vending.insertCoin(Coin.DIME);
		vending.insertCoin(Coin.QUARTER);
		vending.insertCoin(Coin.DOLLAR);
		assertEquals(140, vending.getDeposit());

	}

	@Test
	public void testReturnCoins() {
		vending.insertCoin(Coin.DOLLAR);
		assertEquals(100, vending.getDeposit());
		vending.purchase(VendingMachine.JUICE);
		vending.returnCoins();
		assertEquals(0, vending.getDeposit());

	}
	
	@Test
	public void testLessCoin() {
		vending.insertCoin(Coin.DIME);
		assertFalse(vending.purchase(VendingMachine.COFFEE));
		assertTrue("", vending.getDeposit() == 10);
		assertFalse(vending.purchase(VendingMachine.JUICE));
		assertTrue("", vending.getDeposit() == 10);
		assertFalse(vending.purchase(VendingMachine.SODA));	
		assertTrue("", vending.getDeposit() == 10);
	}
	
	@Test
	public void testNoItems() {
		vending.insertCoin(Coin.DOLLAR);
		vending.insertCoin(Coin.DOLLAR);
		vending.insertCoin(Coin.QUARTER);
		assertEquals(225, vending.getDeposit());
		
		vending.purchase(VendingMachine.JUICE);
		vending.purchase(VendingMachine.JUICE);
		
		//All available Juice count = 2 are sold so not able to purchase additional Juice	
		assertEquals(0, vending.getJuice().getCount());
		assertFalse(vending.purchase(VendingMachine.JUICE));
	}
	
	@Test
	public void testMultiplePurchase(){
		vending.insertCoin(Coin.DOLLAR);
		vending.insertCoin(Coin.DOLLAR);
		vending.insertCoin(Coin.DOLLAR);
		vending.insertCoin(Coin.QUARTER);
		assertTrue("", vending.getCoffee().getCount() == 3);
		assertTrue("", vending.getJuice().getCount() == 2);
		assertTrue("", vending.getSoda().getCount() == 5);
		
	}
	
	
}

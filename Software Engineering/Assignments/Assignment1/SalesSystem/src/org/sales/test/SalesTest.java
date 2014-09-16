package org.sales.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sales.Item;

public class SalesTest {
	private ArrayList<Item> itemList = new ArrayList<Item>();

	@Before
	public void setUp() throws Exception {

	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testAddItem() {
		Item item = new Item("iPad", 2001, 100);
		itemList.add(item);
		assertEquals(1, itemList.size());
	}

	@Test
	public void testGetDiscountRate() {
		double DISCOUNT_RATE = 0.10;
		assertTrue(DISCOUNT_RATE == 0.10);
	}

	@Test
	public void testGetDiscount() {
		double DISCOUNT_RATE = 0.10;
		double subTotal = 10.0;
		assertTrue("Must be less than subTotal",
				(subTotal * DISCOUNT_RATE) < subTotal);

	}

	@Test
	public void testGetSubTotal() {
		Item item1 = new Item("iPad", 2001, 100);
		Item item2 = new Item("iPad", 2001, 100);
		double subTotal = 0.0;
		subTotal = subTotal + item1.get_unitPriceOrgi() + item2.get_unitPriceOrgi();
		assertTrue(subTotal > 0.0);
	}

	@Test
	public void testGetDiscountedSubTotal() {
		double DISCOUNT_RATE = 0.10;
		double subTotal = 10.0;
		assertTrue("Must be less than subTotal", (subTotal - subTotal
				* DISCOUNT_RATE) < subTotal);
	}

}

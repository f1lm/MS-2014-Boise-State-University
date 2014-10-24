package org.sales.test;

import static org.junit.Assert.assertNotNull;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import src.org.sales.Item;

public class SalesTestCase {
	private ArrayList<Item> itemList = new ArrayList<Item>();
	private ArrayList<Item> items = new ArrayList<Item>();
	private Item item;

	@Before
	public void setUp() throws Exception {
		item = new Item("iPad", 10, 100);
		items.add(item);
		item = new Item("iPhone", 5, 100);
		items.add(item);
		item = new Item("iPhone", 5, 100);
		items.add(item);
		for (Item item : items) {
			itemList.add(item);
		}
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testAddItem() {		
		assertNotNull(itemList);
	}

	@Test
	public void testGetSubTotal() {
		int count = 0;
		double subTotal = 0.0;
		for (Item item : itemList) {
			// buy one, get the second (and the rest of the same item) 50% off
			if (item.get_title().equalsIgnoreCase("iPhone")) {
				count++;
			}
			subTotal += item.getItemTotal(count);
		}
		Assert.assertEquals(17.5, subTotal, 0.1);
	}
}

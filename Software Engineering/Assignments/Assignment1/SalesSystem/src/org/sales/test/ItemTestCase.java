package org.sales.test;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sales.Item;

public class ItemTestCase {

	private Item item;

	@Before
	public void setUp() throws Exception {
		item = new Item("iPad", 2001, 100);
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testGetItemTotal() {
		assertTrue("SubTotal must be equal to 2001", (2001 == item.getItemTotal(1)));
	}

}

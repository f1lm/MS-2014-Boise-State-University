package org.sales.test;

import static org.junit.Assert.assertNotNull;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sales.Item;

public class ItemTest {

	private Item item = null;

	@Before
	public void setUp() throws Exception {
		item = new Item("iPad", 2001, 100);
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testItem() {
		assertNotNull(item);
	}

	@Test
	public void testGetItemTotal() {
		//assertTrue(item._unitPriceOrgi > 2000);
	}
}

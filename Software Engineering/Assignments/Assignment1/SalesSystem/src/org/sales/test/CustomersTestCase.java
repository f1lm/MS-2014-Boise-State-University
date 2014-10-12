package org.sales.test;

import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sales.CustomerType;
import org.sales.Customers;

public class CustomersTestCase {
	private Customers customer;

	@Before
	public void setUp() throws Exception {
		customer = new Customers(CustomerType.PREFERRED);
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testGetDiscountRate() {
		assertTrue("Discount for Preferred Customer be 0.50",
				(0.50 == customer.getDiscountRate()));		

	}
}

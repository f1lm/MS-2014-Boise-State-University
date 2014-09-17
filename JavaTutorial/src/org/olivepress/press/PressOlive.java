package org.olivepress.press;

import java.util.Collection;

import org.olivepress.olives.Olive;
import org.olivepress.olives.OliveOil;

/**
 * This is the main class for my app
 * @author MilsonMunakami
 * @version 1.0
 */
public class PressOlive {

	private double totalOil = 0;

	public double getTotalOil() {
		return totalOil;
	}

	/**
	 * @param totalOil
	 */
	private void setTotalOil(double totalOil) {
		this.totalOil += totalOil;
	}

	/**
	 * This method is for get oil
	 * @param olives
	 */
	public void getOil(Collection<Olive> olives) {
		int oil = 0;
		for (Olive olive : olives) {
			oil += olive.crush();
		}
		setTotalOil(oil);
	}

	/**
	 * This gives <b>total oil</b> values
	 * @param olives
	 */
	public void getTotalOil(Olive[] olives) {
		OliveOil oil = new OliveOil();
		for (Olive olive : olives) {
			olive.crush();
			setTotalOil(oil.add(olive));
		}
		System.out.println(getTotalOil());

	}

}

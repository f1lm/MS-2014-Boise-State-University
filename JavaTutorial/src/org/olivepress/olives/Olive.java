package org.olivepress.olives;

public class Olive {
	public static final long BLACK = 0x000000;
	public static final long GREEN = 0x00FF00;

	public String name = "Unknown";
	public String flavor = "Grassy";
	public long color = Olive.BLACK;
	private int oil = 3;

	private double volume;
	private boolean isCrushed = false;

	public Olive(int oil) {
		this.oil = oil;
	}

	public Olive() {
	}

	protected double getVolume() {
		return isCrushed ? volume : 0;
	}

	protected void setVolume(double volume) {
		this.volume = volume;
	}

	public int getOil() {
		return oil;
	}

	public void setOil(int oil) {
		this.oil = oil;
	}

	public int crush() {
		System.out.println("Ouch! Crush from Super class");
		this.isCrushed = true;
		return this.getOil();

	}

}

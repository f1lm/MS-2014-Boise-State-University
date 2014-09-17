package org.olivepress.olives;

public class Kalamata extends Olive {

	public Kalamata() {
		super(1);
		this.setVolume(3);
		this.name = "Kalamata";
		this.flavor = "Grassy";
		this.color = GREEN;
		// this.setOil(3);
	}

	@Override
	public int crush() {
		System.out.println("Crush form Kalamata!");
		return super.crush();
	}

	public String getOrigin() {
		return "Greece";
	}

}

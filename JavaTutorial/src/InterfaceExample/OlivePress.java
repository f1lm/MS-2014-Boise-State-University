package InterfaceExample;

import java.util.Collection;

import org.olivepress.olives.Olive;

public class OlivePress implements IPress {

	@Override
	public void getOil(Collection<Olive> olives) {
		System.out.println("Interface called!");

	}

	@Override
	public double getTotalOil() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void setTotalOil(double totalOil) {
		// TODO Auto-generated method stub

	}

}

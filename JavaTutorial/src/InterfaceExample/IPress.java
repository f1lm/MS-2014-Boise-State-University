package InterfaceExample;

import java.util.Collection;

import org.olivepress.olives.Olive;

public interface IPress {
	public void getOil(Collection<Olive> olives);

	public double getTotalOil();

	public void setTotalOil(double totalOil);
}

package Cohesion;

public class SchoolBusManager {
	public SchoolBusManager() {
		Bus bus = new Bus();
		bus.setBusNumber(1);
		bus.setBusDriver(new BusDriver("XYZ"));
		new BusRoute().getBusRoute("Boise", "Pocatello");
		new BusFee().payBusFee(150);
	}
}
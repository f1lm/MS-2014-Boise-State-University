package Cohesion;

public class Bus {
	private int busNumber;
	private BusDriver busDriver;

	public BusDriver getBusDriver() {
		return busDriver;
	}

	public void setBusDriver(BusDriver busDriver) {
		this.busDriver = busDriver;
	}

	public void setBusNumber(int busNumber) {
		this.busNumber = busNumber;
	}

	public int getBusNumber() {
		return busNumber;
	}
}

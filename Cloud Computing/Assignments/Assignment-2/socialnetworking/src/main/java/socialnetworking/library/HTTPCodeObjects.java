package socialnetworking.library;

public class HTTPCodeObjects {
	private int errorId; 
	private String errorCode; 
	private String serviceName; 
	private String occured;
	
	public int getErrorId() {
		return errorId;
	}
	public void setErrorId(int errorId) {
		this.errorId = errorId;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getOccured() {
		return occured;
	}
	public void setOccured(String occured) {
		this.occured = occured;
	}
}

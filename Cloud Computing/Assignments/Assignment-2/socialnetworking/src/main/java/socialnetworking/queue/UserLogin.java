package socialnetworking.queue;


public class UserLogin implements WorkItem {

	boolean isProcessed = false;

	public UserLogin() {
	}

	@Override
	public boolean process() throws Exception {
		try {
			isProcessed = true;
		} catch (Exception e) {
			throw e;
		}
		return isProcessed;
	}

	public boolean isCompleted() {
		return isProcessed;
	}

	public String getResponse() {
		return "";
	}

}

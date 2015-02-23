package socialnetworking.queue;

public class UserLogOut implements WorkItem {

	boolean isProcessed = false;

	public UserLogOut() {
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

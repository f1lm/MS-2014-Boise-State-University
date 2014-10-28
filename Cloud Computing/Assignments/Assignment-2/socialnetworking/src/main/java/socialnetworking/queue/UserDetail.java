package socialnetworking.queue;

public class UserDetail implements WorkItem {

	boolean isProcessed = false;

	public UserDetail() {
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

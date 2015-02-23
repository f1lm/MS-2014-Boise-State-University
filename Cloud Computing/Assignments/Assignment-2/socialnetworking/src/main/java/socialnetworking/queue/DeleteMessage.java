package socialnetworking.queue;

import socialnetworking.library.DataModel;

public class DeleteMessage implements WorkItem {
	boolean isProcessed = false;

	private DataModel dm = null;

	String tweet = null;
	int msgId =0;
	int userId = 0;
		
	public DeleteMessage(int msg_id, int userID) {
		this.dm = new DataModel();
		this.msgId = msg_id;
		this.userId = userID;
	}

	@Override
	public boolean process() throws Exception {
		
		try {
			tweet = dm.deleteTweet(msgId, userId);
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
		return tweet;
	}
}

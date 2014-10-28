package socialnetworking.queue;

import socialnetworking.library.DataModel;
import socialnetworking.library.JSONTansformer;
import socialnetworking.library.RetweetObjects;

public class RetweetMessage implements WorkItem {
	boolean isProcessed = false;

	private DataModel dm = null;

	RetweetObjects message = null;
	String retweet = null;
	int msgId = 0;
	int userId = 0;

	public RetweetMessage(int msg_id, int userID) {
		this.dm = new DataModel();
		this.message = new RetweetObjects();
		this.msgId = msg_id;
		this.userId = userID;
	}

	@Override
	public boolean process() throws Exception {
		try {
			message = dm.doRetweet(msgId, userId);
			retweet = JSONTansformer.RetweetJSONInfo(message);
			retweet = "{\"Retweet\":" + retweet + "}";

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
		return retweet;
	}
}

package socialnetworking.queue;

import socialnetworking.library.DataModel;

public class PostMessage implements WorkItem {
	boolean isProcessed = false;

	private DataModel dm = null;

	int tweetId = 0;
	String tweet = null;
	int userId = 0;

	public PostMessage(String tweet, int userID) {
		this.dm = new DataModel();
		this.tweet = tweet;
		this.userId = userID;
	}

	@Override
	public boolean process() throws Exception {
		tweetId = dm.InsertMessage(tweet, userId);
		isProcessed = true;
		return isProcessed;
	}

	public boolean isCompleted() {
		return isProcessed;
	}

	public int getResponse() {
		return tweetId;
	}
}

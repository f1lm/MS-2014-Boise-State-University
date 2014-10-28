package socialnetworking.queue;

import java.util.ArrayList;

import socialnetworking.library.DataModel;
import socialnetworking.library.FeedObjects;
import socialnetworking.library.JSONTansformer;

public class UserFeed implements WorkItem {
	boolean isProcessed = false;
	private DataModel dm = null;

	String feeds = null;
	int uid = 0;

	public UserFeed(int uid) {
		this.dm = new DataModel();
		this.uid = uid;
	}

	@Override
	public boolean process() throws Exception {
		ArrayList<FeedObjects> feed = new ArrayList<FeedObjects>();
		try {
			feed = dm.GetFeedsByUserID(uid);
			feeds = JSONTansformer.ConvertToJSON(feed);
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
		return feeds;
	}
}

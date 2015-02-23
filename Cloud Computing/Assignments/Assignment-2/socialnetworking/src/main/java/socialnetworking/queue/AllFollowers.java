package socialnetworking.queue;

import java.util.ArrayList;

import socialnetworking.library.DataModel;
import socialnetworking.library.FollowersObjects;
import socialnetworking.library.JSONTansformer;

public class AllFollowers implements WorkItem {

	boolean isProcessed = false;

	private DataModel dm = null;

	String followers = null;
	int userId = 0;

	public AllFollowers(int userID) {
		this.dm = new DataModel();
		this.userId = userID;
	}

	@Override
	public boolean process() throws Exception {
		ArrayList<FollowersObjects> followerList = new ArrayList<FollowersObjects>();
		try {
			followerList = dm.getAllFollowerList(userId);
			followers = JSONTansformer.ConvertToJSON(followerList);
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
		return followers;
	}

}

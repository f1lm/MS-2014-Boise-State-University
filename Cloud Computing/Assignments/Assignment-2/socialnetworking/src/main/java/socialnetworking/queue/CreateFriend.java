package socialnetworking.queue;

import socialnetworking.library.DataModel;

public class CreateFriend implements WorkItem {

	boolean isProcessed = false;

	private DataModel dm = null;
	int userId = 0;
	int friendId = 0;

	String response = null;

	public CreateFriend(int userID, int friend_id) {
		this.dm = new DataModel();
		this.userId = userID;
		this.friendId = friend_id;
	}

	@Override
	public boolean process() throws Exception {
		try {
			response = dm.sendFriendRequest(userId, friendId);
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
		return response;
	}
}

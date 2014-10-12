package socialnetworking.queue;

import java.util.ArrayList;

import socialnetworking.library.DataModel;
import socialnetworking.library.FriendsObjects;
import socialnetworking.library.JSONTansformer;

public class AllPendingOutgoingRequests implements WorkItem {
	boolean isProcessed = false;

	private DataModel dm = null;
	String pendingOutgoing = null;
	int userId = 0;

	public AllPendingOutgoingRequests(int userId) {
		this.dm = new DataModel();
		this.userId = userId;
	}

	@Override
	public boolean process() throws Exception {
		ArrayList<FriendsObjects> outgoingUsers = new ArrayList<FriendsObjects>();
		try {
			outgoingUsers = dm.getPendingOutgoingRequests(userId);
			pendingOutgoing = JSONTansformer.ConvertToJSON(outgoingUsers);
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
		return pendingOutgoing;
	}
}

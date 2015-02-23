package socialnetworking.queue;

import java.util.ArrayList;

import socialnetworking.library.DataModel;
import socialnetworking.library.JSONTansformer;
import socialnetworking.library.UsersObjects;

public class AllUsers implements WorkItem {
	boolean isProcessed = false;

	private DataModel dm = null;

	String users = null;
	int userId = 0;

	public AllUsers(int userID) {
		this.dm = new DataModel();
		this.userId = userID;
	}

	@Override
	public boolean process() throws Exception {
		ArrayList<UsersObjects> userList = new ArrayList<UsersObjects>();
		try {
			userList = dm.getAllUsersList(userId);
			users = JSONTansformer.ConvertToJSON(userList);
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
		return users;
	}

}

package socialnetworking.queue;

import socialnetworking.library.DataModel;
import socialnetworking.library.UsersObjects;

public class UserRegister implements WorkItem {

	boolean isProcessed = false;

	private DataModel dm = null;

	UsersObjects user = null;
	int userId = 0;

	private UsersObjects userInfo;

	public UserRegister(UsersObjects userInfo) {
		this.dm = new DataModel();
		this.userInfo = userInfo;
	}

	@Override
	public boolean process() throws Exception {
		try {
			user = dm.registerUser(userInfo);
			isProcessed = true;
		} catch (Exception e) {
			throw e;
		}
		return isProcessed;
	}

	public boolean isCompleted() {
		return isProcessed;
	}

	public UsersObjects getResponse() {
		return user;
	}
}

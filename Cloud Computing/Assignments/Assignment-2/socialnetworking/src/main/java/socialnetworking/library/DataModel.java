package socialnetworking.library;

import java.sql.SQLException;
import java.util.ArrayList;

public class DataModel {
	private DataAccessLayer dal;

	public DataModel() {

		try {
			dal = new DataAccessLayer();
		} catch (Exception e) {
			throw e;
		}
	}

	public int InsertQueue(String serviceName, String startTime)
			throws Exception {
		int message = 0;
		try {

			if (serviceName != null && serviceName != "") {
				message = dal.InsertQueue(serviceName, startTime);
			}
		} catch (Exception e) {
			throw e;
		}
		return message;
	}

	public void UpdateQueue(int qId, long elapsedTimeMillis) throws Exception {
		try {

			if (qId != 0) {
				dal.UpdateQueue(qId, elapsedTimeMillis);
			}
		} catch (Exception e) {
			throw e;
		}
	}

	public ArrayList<ProcessingTimeObjects> GetProcessingTime()
			throws Exception {
		ArrayList<ProcessingTimeObjects> messages = new ArrayList<ProcessingTimeObjects>();
		try {
			messages = dal.SearchQueueProcessingTime();
		} catch (Exception e) {
			throw e;
		}
		return messages;
	}

	public String GetQueueDepth() throws Exception {
		String queueDepth = "";
		try {
			queueDepth = dal.GetQueueDepth();
		} catch (Exception e) {
			throw e;
		}
		return queueDepth;
	}

	public ArrayList<MessagesListObjects> GetMessagePerResolution(
			String resolutionQPS, String resoultion) throws Exception {
		ArrayList<MessagesListObjects> messages = new ArrayList<MessagesListObjects>();
		try {
			if (resolutionQPS != null && resolutionQPS != "") {
				messages = dal.GetMessagePerResolution(resolutionQPS, resoultion);
			}
		} catch (Exception e) {
			throw e;
		}
		return messages;
	}

	public ArrayList<HTTPCodeObjects> GetMessagesByErrorCode(String type)
			throws Exception {
		ArrayList<HTTPCodeObjects> messages = new ArrayList<HTTPCodeObjects>();
		try {

			if (type != null && type != "") {
				messages = dal.GetMessagesByErrorCode(type);
			}
		} catch (Exception e) {
			throw e;
		}
		return messages;
	}

	// Tweet Service Model
	public int InsertMessage(String tweet, int uid) throws Exception {
		int message = 0;
		try {

			if (tweet != null && tweet != "" && tweet.length() > 0) {
				message = dal.InsertMessage(tweet, uid);
			}
		} catch (Exception e) {
			throw e;
		}
		return message;
	}

	public String getTweetDetailByID(int msg_id) throws Exception {
		String tweet = null;
		try {
			tweet = dal.GetTweetDetail(msg_id);
		} catch (Exception e) {
			throw e;
		}
		return tweet;
	}

	public String deleteTweet(int msg_id, int userID) throws SQLException {
		String tweet = null;
		try {
			tweet = dal.DeleteTweet(msg_id, userID);
		} catch (SQLException e) {
			throw e;
		}
		return tweet;
	}

	public RetweetObjects doRetweet(int msg_id, int userID) throws Exception {
		RetweetObjects retweet = new RetweetObjects();
		try {
			retweet = dal.doRetweetThis(msg_id, userID);
		} catch (Exception e) {
			throw e;
		}
		return retweet;
	}

	// Friends and Followers Service
	public ArrayList<FriendsObjects> getPendingIncomingRequests(int userID)
			throws Exception {
		ArrayList<FriendsObjects> userList = new ArrayList<FriendsObjects>();
		try {
			userList = dal.getPendingIncomingRequests(userID);
		} catch (Exception e) {
			throw e;
		}
		return userList;
	}

	public ArrayList<FriendsObjects> getPendingOutgoingRequests(int userID)
			throws Exception {
		ArrayList<FriendsObjects> userList = new ArrayList<FriendsObjects>();
		try {
			userList = dal.getPendingOutgoingRequests(userID);
		} catch (Exception e) {
			throw e;
		}
		return userList;
	}

	public String doFollowUser(int userID, int friend_id) throws Exception {
		String response = null;
		try {
			response = dal.doFollowUser(userID, friend_id);
		} catch (Exception e) {
			throw e;
		}
		return response;
	}

	public String sendFriendRequest(int userID, int friend_id) throws Exception {
		String response = null;
		try {
			response = dal.sendFriendRequest(userID, friend_id);
		} catch (Exception e) {
			throw e;
		}
		return response;
	}

	public String sendUnFriendRequest(int userID, int friend_id)
			throws Exception {
		String response = null;
		try {
			response = dal.sendUnFriendRequest(userID, friend_id, false);
		} catch (Exception e) {
			throw e;
		}
		return response;
	}

	public String acceptFriendRequest(int userID, int friend_id)
			throws Exception {
		String response = null;
		try {
			response = dal.acceptFriendRequest(userID, friend_id);
		} catch (Exception e) {
			throw e;
		}
		return response;
	}

	public String declineFriendRequest(int userID, int friend_id)
			throws Exception {
		String response = null;
		try {
			response = dal.sendUnFriendRequest(userID, friend_id, true);
		} catch (Exception e) {
			throw e;
		}
		return response;
	}

	public ArrayList<FriendsObjects> getAllFriendList(int userID)
			throws Exception {
		ArrayList<FriendsObjects> freindList = null;
		try {
			freindList = dal.getAllFriendList(userID, false);
		} catch (Exception e) {
			throw e;
		}
		return freindList;
	}

	public ArrayList<FollowersObjects> getAllFollowerList(int userID)
			throws Exception {
		ArrayList<FollowersObjects> followerList = null;
		try {
			followerList = dal.getAllFollowerList(userID);
		} catch (Exception e) {
			throw e;
		}
		return followerList;
	}

	// Users and Message Feed
	public UsersObjects registerUser(UsersObjects userInfo) throws Exception {
		try {
			return dal.registerUser(userInfo);
		} catch (SQLException e) {
			throw e;
		}
	}

	public UsersObjects GetUserInfoBy(String username, String password,
			String email) throws Exception {
		UsersObjects user = new UsersObjects();
		try {
			user = dal.GetUserInfoBy(username, password, email);
		} catch (Exception e) {
			throw e;
		}
		return user;
	}

	public UsersObjects GetUserInfoBy(String username, String password)
			throws Exception {
		UsersObjects user = new UsersObjects();
		try {
			user = dal.GetUserInfoBy(username, password);
		} catch (Exception e) {
			throw e;
		}
		return user;
	}

	public ArrayList<UsersObjects> getAllUsers() throws Exception {
		ArrayList<UsersObjects> userList = null;
		try {
			userList = dal.getAllUsers();

		} catch (Exception e) {
			throw e;
		}
		return userList;
	}

	public ArrayList<MessageObjects> GetAllMessages() throws Exception {
		ArrayList<MessageObjects> messageData = new ArrayList<MessageObjects>();
		try {
			messageData = dal.GetAllMessages();
		} catch (Exception e) {
			throw e;
		}
		return messageData;
	}

	public ArrayList<FeedObjects> GetFeedsByUserID(int uid) throws Exception {
		ArrayList<FeedObjects> feeds = new ArrayList<FeedObjects>();
		try {
			feeds = dal.GetFeedsByUserID(uid);
		} catch (Exception e) {
			throw e;
		}
		return feeds;
	}

	public ArrayList<UsersObjects> getAllUsersList(int userID) throws Exception {
		ArrayList<UsersObjects> users = new ArrayList<UsersObjects>();
		try {
			users = dal.GetUsersByUserID(userID);
		} catch (Exception e) {
			throw e;
		}
		return users;
	}

}

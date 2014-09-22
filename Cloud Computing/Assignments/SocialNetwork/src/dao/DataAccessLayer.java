package dao;

import java.net.InetAddress;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dto.FeedObjects;
import dto.FollowersObjects;
import dto.FriendsObjects;
import dto.MessageObjects;
import dto.RetweetObjects;
import dto.Status;
import dto.UsersObjects;

public class DataAccessLayer {

	private Connection connection;

	public DataAccessLayer() {
		Database database = new Database();
		try {
			connection = database.Get_Connection();
		} catch (Exception e) {
			e.getMessage();
		}
	}

	// Tweet/ Message Service Data
	public int InsertMessage(String tweet, int uid) throws Exception {
		try {
			Date date = new Date();
			int timeData = (int) date.getTime();
			String ip = InetAddress.getLocalHost().getHostAddress();
			PreparedStatement ps = connection
					.prepareStatement("INSERT INTO messages(message,uid_fk,ip,created) VALUES(?,?,?,?)");

			ps.setString(1, tweet);
			ps.setInt(2, uid);
			ps.setString(3, ip);
			ps.setInt(4, timeData);
			int rs = ps.executeUpdate();
			if (rs > 0) {
				return GetTweetDetailBy(tweet, uid);
			} else {
				return 0;
			}

		} catch (Exception e) {
			throw e;
		}
	}

	public int GetTweetDetailBy(String tweet, int uid) throws Exception {
		int message = 0;
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT msg_id FROM messages WHERE message=? AND uid_fk=? ORDER BY msg_id DESC ");
			ps.setString(1, tweet);
			ps.setInt(2, uid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				message = rs.getInt("msg_id");
			}
		} catch (Exception e) {
			throw e;
		}
		return message;
	}

	public String GetTweetDetail(int msg_id) throws Exception {
		String message = null;
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT message FROM messages WHERE msg_id=? ORDER BY msg_id DESC");
			ps.setInt(1, msg_id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				message = rs.getString("message");
			}
		} catch (Exception e) {
			throw e;
		}
		return message;
	}

	public String DeleteTweet(int msg_id, int userID) throws SQLException {
		PreparedStatement ps = null;
		String tweet = null;
		try {
			ps = connection
					.prepareStatement("SELECT msg_id FROM messages WHERE msg_id=? AND uid_fk=? ORDER BY msg_id DESC");
			ps.setInt(1, msg_id);
			ps.setInt(2, userID);
			ResultSet rs = ps.executeQuery();
			if (rs != null) {
				tweet = GetTweetDetail(msg_id);
				ps = connection
						.prepareStatement("DELETE FROM messages WHERE msg_id=? AND uid_fk=?");
				ps.setInt(1, msg_id);
				ps.setInt(2, userID);
				ps.executeUpdate();
			} else {
				tweet = "You are not allowed to delete this message";
			}

		} catch (Exception e) {
			e.getMessage();
		}
		return tweet;

	}

	public RetweetObjects doRetweetThis(int msg_id, int userID)
			throws Exception {
		RetweetObjects retweet = new RetweetObjects();
		Date date = new Date();
		int timeData = (int) date.getTime();
		PreparedStatement ps;
		try {
			ps = connection
					.prepareStatement("INSERT INTO retweets(msg_id_fk,uid_fk,created) VALUES(?,?,?)");
			ps.setInt(1, msg_id);
			ps.setInt(2, userID);
			ps.setLong(3, timeData);
			int rs = ps.executeUpdate();
			if (rs > 0) {
				int retweet_id = GetReTweetDetailBy(msg_id, userID);
				retweet = GetReTweetDetail(retweet_id);
			}
		} catch (SQLException e) {
			throw e;
		}

		return retweet;
	}

	public int GetReTweetDetailBy(int msg_id, int uid) throws Exception {
		int retweet_id = 0;
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT retweet_id FROM retweets WHERE msg_id_fk=? AND uid_fk=? ORDER BY retweet_id DESC");
			ps.setInt(1, msg_id);
			ps.setInt(2, uid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				retweet_id = rs.getInt("retweet_id");
			}
		} catch (Exception e) {
			throw e;
		}
		return retweet_id;
	}

	public RetweetObjects GetReTweetDetail(int retweet_id) throws Exception {
		RetweetObjects retweetData = new RetweetObjects();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT R.retweet_id, M.uid_fk , M.ip, R.created, M.message FROM retweets R, messages M WHERE R.msg_id_fk=M.msg_id AND retweet_id=?");
			ps.setInt(1, retweet_id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				retweetData.set_retweet_id(rs.getInt("retweet_id"));
				retweetData.setMessage(rs.getString("message"));
				retweetData.set_retweet_uid(rs.getInt("uid_fk"));
				retweetData.set_retweet_created(rs.getInt("created"));
			}
		} catch (Exception e) {
			throw e;
		}
		return retweetData;
	}

	// Friends and Followers Service Data
	public ArrayList<FriendsObjects> getPendingIncomingRequests(int userID)
			throws Exception {
		ArrayList<FriendsObjects> incomingFriendList = new ArrayList<FriendsObjects>();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT F.*,U.* FROM friends F, users U WHERE F.status = '0' AND F.uid_fk=? AND F.friendto_uid=U.uid");
			ps.setInt(1, userID);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				FriendsObjects uservo = new FriendsObjects();
				uservo.set_uid(rs.getInt("uid"));
				uservo.set_username(rs.getString("username"));
				incomingFriendList.add(uservo);
			}
			return incomingFriendList;
		} catch (Exception e) {
			throw e;
		}
	}

	public ArrayList<FriendsObjects> getPendingOutgoingRequests(int userID)
			throws Exception {
		ArrayList<FriendsObjects> outgoingFriendList = new ArrayList<FriendsObjects>();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT F.*,U.* FROM friends F, users U WHERE F.status = '0' AND F.friendto_uid=? AND F.friendto_uid=U.uid");
			ps.setInt(1, userID);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				FriendsObjects uservo = new FriendsObjects();
				uservo.set_uid(rs.getInt("uid"));
				uservo.set_username(rs.getString("username"));
				outgoingFriendList.add(uservo);
			}
			return outgoingFriendList;
		} catch (Exception e) {
			throw e;
		}
	}

	public String sendFriendRequest(int userID, int friend_id) throws Exception {

		ArrayList<FriendsObjects> userList = null;
		userList = getAllFriendList(userID, false);

		String response = null;
		boolean isConnected = false;
		for (FriendsObjects userVO : userList) {
			if ((userVO.get_friendto_uid() == userID && userVO.get_uid() == friend_id)
					|| (userVO.get_friendto_uid() == friend_id && userVO
							.get_uid() == userID)) {
				isConnected = true;
				response = "You are already connected with"
						+ userVO.get_username();
				break;
			}
		}
		userList = getAllFriendList(userID, true);

		for (FriendsObjects userVO : userList) {
			if ((userVO.get_friendto_uid() == userID && userVO.get_uid() == friend_id)
					|| (userVO.get_friendto_uid() == friend_id && userVO
							.get_uid() == userID)) {
				isConnected = true;
				response = "You have already send friend request to: "
						+ userVO.get_username();
				break;
			}
		}

		if (!isConnected) {
			PreparedStatement ps;
			try {
				ps = connection
						.prepareStatement("INSERT INTO messages(uid_fk,friendto_uid,status) VALUES(?,?,?)");
				ps.setInt(1, userID);
				ps.setInt(2, friend_id);
				ps.setInt(3, Status.PENDING.ordinal());
				ps.executeUpdate();
				response = "Friend request send successfully.";
			} catch (SQLException e) {
				throw e;
			}
		}
		return response;
	}

	public String acceptFriendRequest(int userID, int friend_id)
			throws Exception {
		ArrayList<FriendsObjects> userList = null;
		userList = getAllFriendList(userID, true);

		String response = null;
		boolean isConnected = false;
		for (FriendsObjects userVO : userList) {
			if ((userVO.get_friendto_uid() == userID && userVO.get_uid() == friend_id)
					|| (userVO.get_friendto_uid() == friend_id && userVO
							.get_uid() == userID)) {
				isConnected = true;
				response = "You  are already connected with"
						+ userVO.get_username();
				break;
			}
		}
		if (!isConnected) {
			PreparedStatement ps;
			try {
				ps = connection
						.prepareStatement("UPDATE friends SET status='1' WHERE (uid_fk=? AND friendto_uid=?) OR (uid_fk=? AND friendto_uid=?)");
				ps.setInt(1, userID);
				ps.setInt(2, friend_id);
				ps.setInt(3, friend_id);
				ps.setInt(4, userID);
				ps.executeUpdate();
				response = "Friend request accepted successfully.";
			} catch (SQLException e) {
				throw e;
			}
		}
		return response;
	}

	public String sendUnFriendRequest(int userID, int friend_id,
			boolean searchPending) throws Exception {
		ArrayList<FriendsObjects> userList = null;
		userList = getAllFriendList(userID, searchPending);

		String response = null;
		boolean isConnected = false;
		for (FriendsObjects userVO : userList) {
			if ((userVO.get_friendto_uid() == userID && userVO.get_uid() == friend_id)
					|| (userVO.get_friendto_uid() == friend_id && userVO
							.get_uid() == userID)) {
				isConnected = true;
				break;
			}
		}
		if (isConnected) {
			PreparedStatement ps;
			try {
				ps = connection
						.prepareStatement("DELETE friends WHERE (uid_fk=? AND friendto_uid=?) OR (uid_fk=? AND friendto_uid=?)");
				ps.setInt(1, userID);
				ps.setInt(2, friend_id);
				ps.setInt(3, friend_id);
				ps.setInt(4, userID);
				ps.executeUpdate();
				response = "Unfriended successfully.";
			} catch (SQLException e) {
				throw e;
			}
		} else {
			response = "You both are not friends";
		}
		return response;
	}

	public ArrayList<FriendsObjects> getAllFriendList(int userID,
			boolean searchPending) throws Exception {
		ArrayList<FriendsObjects> friendList = new ArrayList<FriendsObjects>();
		try {
			String status = null;
			if (searchPending) {
				status = "0";
			} else {
				status = "1";
			}
			PreparedStatement ps = connection
					.prepareStatement("SELECT * FROM friends f JOIN users u ON f.uid_fk = u.uid WHERE status=? AND (friendto_uid=? OR uid_fk=?)ORDER BY friendto_uid DESC");
			ps.setString(1, status);
			ps.setInt(2, userID);
			ps.setInt(3, userID);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				if (rs.getInt("uid") != userID) {
					FriendsObjects friendObject = new FriendsObjects();
					friendObject.set_friend_id(rs.getInt("friend_id"));
					friendObject.set_uid(rs.getInt("uid"));
					friendObject.set_firstname(rs.getString("firstname"));
					friendObject.set_lastname(rs.getString("lastname"));
					friendObject.set_username(rs.getString("username"));
					friendObject.set_email(rs.getString("email"));
					friendList.add(friendObject);
				}
			}
			return friendList;
		} catch (Exception e) {
			throw e;
		}
	}

	public ArrayList<FollowersObjects> getAllFollowerList(int userID)
			throws Exception {
		ArrayList<FollowersObjects> followerList = new ArrayList<FollowersObjects>();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT * FROM followers,users WHERE status = '1' AND following_uid=? ORDER BY following_uid DESC");
			ps.setInt(1, userID);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				FollowersObjects followerObject = new FollowersObjects();
				followerObject.set_follower_id(rs.getInt("follower_id"));
				followerObject.set_uid(rs.getInt("uid"));
				followerObject.set_firstname(rs.getString("firstname"));
				followerObject.set_lastname(rs.getString("lastname"));
				followerObject.set_username(rs.getString("username"));
				followerObject.set_email(rs.getString("email"));
				followerList.add(followerObject);
			}
			return followerList;
		} catch (Exception e) {
			throw e;
		}
	}

	// Users and Message Feed
	public UsersObjects registerUser(UsersObjects userInfo) throws Exception {
		String firstname = userInfo.get_firstname();
		String lastname = userInfo.get_lastname();
		String username = userInfo.get_username();
		String password = userInfo.get_password();
		String email = userInfo.get_email();

		// Insert into Users, followers and friends table
		PreparedStatement ps = null;
		try {
			ps = connection
					.prepareStatement("INSERT INTO users(firstname, lastname, username, password, email, friends_count, followers_count) VALUES (?, ?, ?, ?, ?, 0, 0)");
			ps.setString(1, firstname);
			ps.setString(2, lastname);
			ps.setString(3, username);
			ps.setString(4, password);
			ps.setString(5, email);
			int uid = ps.executeUpdate();
			if (uid > 0) {
				try {
					userInfo = GetUserInfoBy(username, password, email);
				} catch (Exception e) {
					throw e;
				}
				int userID = userInfo.get_uid();
				ps = connection
						.prepareStatement("INSERT INTO friends(uid_fk, friendto_uid,status) VALUES (?, ?,3)");
				ps.setInt(1, userID);
				ps.setInt(2, userID);
				ps.executeUpdate();

				ps = connection
						.prepareStatement("INSERT INTO followers(uid_fk, following_uid,status) VALUES (?, ?,3)");
				ps.setInt(1, userID);
				ps.setInt(2, userID);
				ps.executeUpdate();
			}
		} catch (SQLException e) {
			throw e;
		}

		return userInfo;
	}

	public UsersObjects GetUserInfoBy(String username, String password,
			String email) throws Exception {
		UsersObjects userData = new UsersObjects();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT * FROM users WHERE username=? AND password=? AND email=?");
			ps.setString(1, username);
			ps.setString(2, password);
			ps.setString(3, email);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				userData.set_uid(rs.getInt("uid"));
				userData.set_firstname(rs.getString("firstname"));
				userData.set_lastname(rs.getString("lastname"));
				userData.set_username(rs.getString("username"));
				userData.set_email(rs.getString("email"));
				userData.set_password(rs.getString("password"));
				userData.set_friends_count(rs.getInt("friends_count"));
				userData.set_followers_count(rs.getInt("followers_count"));
				userData.set_profile_img(rs.getString("profile_img"));
			}
			return userData;
		} catch (Exception e) {
			throw e;
		}
	}

	public UsersObjects GetUserInfoBy(String username, String password)
			throws Exception {
		UsersObjects userData = new UsersObjects();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT * FROM users WHERE username=? AND password=?");
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				userData.set_uid(rs.getInt("uid"));
				userData.set_firstname(rs.getString("firstname"));
				userData.set_lastname(rs.getString("lastname"));
				userData.set_username(rs.getString("username"));
				userData.set_email(rs.getString("email"));
				userData.set_password(rs.getString("password"));
				userData.set_followers_count(rs.getInt("followers_count"));
				userData.set_profile_img(rs.getString("profile_img"));
			}
			return userData;
		} catch (Exception e) {
			throw e;
		}
	}

	public ArrayList<UsersObjects> getAllUsers() throws Exception {
		ArrayList<UsersObjects> userList = new ArrayList<UsersObjects>();
		try {
			// String uname = request.getParameter("uname");
			PreparedStatement ps = connection
					.prepareStatement("SELECT * FROM users");
			// ps.setString(1,uname);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				UsersObjects uservo = new UsersObjects();
				uservo.set_uid(rs.getInt("uid"));
				uservo.set_username(rs.getString("username"));
				uservo.set_firstname(rs.getString("firstname"));
				uservo.set_lastname(rs.getString("lastname"));
				uservo.set_email(rs.getString("email"));
				uservo.set_password(rs.getString("password"));
				uservo.set_followers_count(rs.getInt("followers_count"));
				uservo.set_friends_count(rs.getInt("friends_count"));
				uservo.set_profile_img(rs.getString("profile_img"));
				uservo.set_isAuthorized(true);
				userList.add(uservo);
			}
			return userList;
		} catch (Exception e) {
			throw e;
		}
	}

	public ArrayList<MessageObjects> GetAllMessages() throws Exception {
		ArrayList<MessageObjects> messageData = new ArrayList<MessageObjects>();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT msg_id,message FROM messages ORDER BY msg_id DESC");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				MessageObjects messageObject = new MessageObjects();
				messageObject.set_msg_id(rs.getInt("msg_id"));
				messageObject.setMessage(rs.getString("message"));
				messageData.add(messageObject);
			}
			return messageData;
		} catch (Exception e) {
			throw e;
		}
	}

	public ArrayList<FeedObjects> GetFeedsByUserID(int uid) throws Exception {
		ArrayList<FeedObjects> feedData = new ArrayList<FeedObjects>();
		try {
			PreparedStatement ps = connection
					.prepareStatement("SELECT M.msg_id,M.message,M.uid_fk AS uid,M.ip,M.created AS msg_created, R.retweet_id,R.uid_fk AS retweet_uid,R.created AS retweet_created FROM messages M LEFT JOIN retweets R ON M.msg_id=R.msg_id_fk WHERE M.uid_fk=? ORDER BY M.msg_id DESC");
			ps.setInt(1, uid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				FeedObjects feedObject = new FeedObjects();
				feedObject.setMsg_id(rs.getInt("msg_id"));
				feedObject.setMessage(rs.getString("message"));
				feedObject.setUid(rs.getInt("uid"));
				feedObject.setIp(rs.getString("ip"));
				// feedObject.setMsg_created(rs.getInt("msg_created"));
				// feedObject.setRetweet_id(rs.getInt("retweet_id"));
				// feedObject.setRetweet_uid(rs.getInt("retweet_uid"));
				// feedObject.setRetweet_created(rs.getInt("retweet_created"));
				feedData.add(feedObject);
			}
			return feedData;
		} catch (Exception e) {
			throw e;
		}
	}
}
package webservices;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import transformer.JSONTansformer;
import model.DataModel;
import dto.FollowersObjects;
import dto.FriendsObjects;
import dto.RetweetObjects;

@Path("/friendandfollower")
public class FriendsandFollowersService {
	private DataModel dm = null;

	public FriendsandFollowersService() {
		dm = new DataModel();
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Friends and Followers";
	}

	// GET friendships/incoming Returns a collection of numeric IDs for every
	// user who has a pending request to follow the authenticating user.
	@GET
	@Path("/GetAllPendingIncomingRequests")
	@Produces("application/json")
	public String getAllPendingIncomingRequests(@QueryParam("uid") int userID)
			throws Exception {
		ArrayList<FriendsObjects> incomingUsers = new ArrayList<FriendsObjects>();
		String pendingIncoming = null;
		try {
			incomingUsers = dm.getPendingIncomingRequests(userID);
			pendingIncoming = JSONTansformer.ConvertToJSON(incomingUsers);
			pendingIncoming = "{\"PendingIncomingRequests\":" + pendingIncoming
					+ "}";

		} catch (Exception e) {
			throw e;
		}
		return pendingIncoming;
	}

	// GET friendships/outgoing Returns a collection of numeric IDs for every
	// protected user for whom the authenticating user has a pending follow
	// request.
	@GET
	@Path("/GetAllPendingOutgoingRequests")
	@Produces("application/json")
	public String getAllPendingOutgoingRequests(@QueryParam("uid") int userID)
			throws Exception {
		ArrayList<FriendsObjects> outgoingUsers = new ArrayList<FriendsObjects>();
		String pendingOutgoing = null;
		try {
			outgoingUsers = dm.getPendingOutgoingRequests(userID);
			pendingOutgoing = JSONTansformer.ConvertToJSON(outgoingUsers);
			pendingOutgoing = "{\"PendingOutgoingRequests\":" + pendingOutgoing
					+ "}";
		} catch (Exception e) {
			throw e;
		}
		return pendingOutgoing;
	}

	// POST Approve the incoming pending friend request
	@POST
	@Path("/ApproveFriendRequest")
	@Produces(MediaType.TEXT_PLAIN)
	public String acceptFriendRequest(@QueryParam("uid") int userID,
			@QueryParam("fuid") int friend_id) throws Exception {
		String response = dm.acceptFriendRequest(userID, friend_id);
		return response;

	}

	// POST Decline the incoming pending friend request
	@POST
	@Path("/DeclineFriendRequest")
	@Produces(MediaType.TEXT_PLAIN)
	public String declineFriendRequest(@QueryParam("uid") int userID,
			@QueryParam("fuid") int friend_id) throws Exception {
		String response = dm.declineFriendRequest(userID, friend_id);
		return response;

	}

	// POST friendships/create Allows the authenticating users to follow the
	// user specified in the ID parameter. Returns the befriended users id when
	// successful. Returns a string describing the failure condition when
	// unsuccessful. If you are already friends with the user a HTTP 403 may be
	// returned
	@POST
	@Path("/SendFriendRequest")
	@Produces(MediaType.TEXT_PLAIN)
	public String sendFriendRequest(@QueryParam("uid") int userID,
			@QueryParam("fuid") int friend_id) throws Exception {
		String response = dm.sendFriendRequest(userID, friend_id);
		return response;

	}

	// POST friendships/destroy Allows the authenticating user to unfollow the
	// user specified in the ID parameter. Returns the unfollowed user’s id when
	// successful. Returns a string describing the failure condition when
	// unsuccessful.
	@POST
	@Path("/SendUnFriendRequest")
	@Produces(MediaType.TEXT_PLAIN)
	public String sendUnFriendRequest(@QueryParam("uid") int userID,
			@QueryParam("fuid") int friend_id) throws Exception {
		String response = dm.sendUnFriendRequest(userID, friend_id);
		return response;

	}

	// GET friends/list Returns a cursored collection of user ids for every user
	// the specified user is following.
	@GET
	@Path("/GetAllFriends")
	@Produces("application/json")
	public String getAllFriends(@QueryParam("uid") int userID) throws Exception {
		ArrayList<FriendsObjects> friendList = new ArrayList<FriendsObjects>();
		String friends = null;
		try {
			friendList = dm.getAllFriendList(userID);
			friends = JSONTansformer.ConvertToJSON(friendList);
			friends = "{\"Friends\":" + friends + "}";
		} catch (Exception e) {
			throw e;
		}
		return friends;
	}

	// GET followers/list Returns a cursored collection of user objects for
	// users following the specified user.
	@GET
	@Path("/GetAllFollowers")
	@Produces("application/json")
	public String getAllFollowers(@QueryParam("uid") int userID)
			throws Exception {
		ArrayList<FollowersObjects> followerList = new ArrayList<FollowersObjects>();
		String followers = null;
		try {
			followerList = dm.getAllFollowerList(userID);
			followers = JSONTansformer.ConvertToJSON(followerList);
			followers = "{\"Followers\":" + followers + "}";
		} catch (Exception e) {
			throw e;
		}
		return followers;

	}

}

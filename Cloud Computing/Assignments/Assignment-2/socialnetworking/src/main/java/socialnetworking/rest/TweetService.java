package socialnetworking.rest;

import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import socialnetworking.library.DataModel;
import socialnetworking.library.FeedObjects;
import socialnetworking.library.JSONTansformer;
import socialnetworking.library.RetweetObjects;

@Path("/tweet")
public class TweetService {
	private DataModel dm = null;

	public TweetService() {
		dm = new DataModel();
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Tweet";
	}

	// POST tweet/tweet/:msg POSTS a new tweet, 128 characters max and returns a
	// unique tweet id for this message.
	@POST
	@Path("/PostMessage")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response postMessage(@FormParam("update") String tweet,
			@Context HttpServletRequest req) throws Exception {
		// message = request.getParameter("tweet");
		try {
			HttpSession session = req.getSession();
			if (session.getAttribute("userid") == null) {
				java.net.URI location = new java.net.URI(
						"../index.jsp?msg=error");
				return Response.seeOther(location).build();
			} else {
				int userID = (int) session.getAttribute("userid");
				dm.InsertMessage(tweet, userID);
				// GetFeedsByUserID(userID);
				java.net.URI location = new java.net.URI(
						"../home.jsp?msg=success");
				return Response.seeOther(location).build();
			}
		} catch (Exception e) {
			throw e;
		}
	}

	@GET
	@Path("/GetFeeds")
	@Produces("application/json")
	public String GetFeedsByUserID(@Context HttpServletRequest req)
			throws Exception {
		String feeds = null;
		ArrayList<FeedObjects> feed = new ArrayList<FeedObjects>();
		try {
			HttpSession session = req.getSession();
			int uid = (int) session.getAttribute("userid");
			feed = dm.GetFeedsByUserID(uid);
			feeds = JSONTansformer.ConvertToJSON(feed);
		} catch (Exception e) {
			throw e;
		}
		return feeds;
	}

	// GET tweet/show/:id Returns a single Tweet, specified by the id parameter.
	@GET
	@Path("/GetMessageDetails")
	@Produces(MediaType.TEXT_PLAIN)
	public String getMessageDetails(@QueryParam("msgid") int msg_id)
			throws Exception {
		String tweet = dm.getTweetDetailByID(msg_id);
		return tweet;
	}

	// POST tweet/destroy/:id Destroys the status specified by the required ID
	// parameter. The authenticating user must be the author of the specified
	// status. Returns the destroyed status if successful.
	@POST
	@Path("/DeleteMessage")
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteMessage(@QueryParam("msgid") int msg_id,
			@QueryParam("uid") int userID) throws SQLException {
		String tweet = dm.deleteTweet(msg_id, userID);
		return tweet;

	}

	// POST tweet/retweet/:id Retweets a tweet. Returns the original tweet with
	// retweet users id embedded.
	@POST
	@Path("/RetweetThisMessage")
	@Produces(MediaType.TEXT_PLAIN)
	public String doRetweetThisMessage(@QueryParam("msgid") int msg_id,
			@QueryParam("uid") int userID) throws Exception {
		RetweetObjects message = dm.doRetweet(msg_id, userID);
		String retweet = JSONTansformer.RetweetJSONInfo(message);
		retweet = "{\"Retweet\":" + retweet + "}";
		return retweet;

	}
}

package socialnetworking.queue;

import java.text.SimpleDateFormat;
import java.util.Date;

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

@Path("/tweet")
public class TweetService {
	private DataModel dm = null;
	private final static String queueName = "processing-queue";

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

				PostMessage request = new PostMessage(tweet, userID);
				int qId = 0;
				Date now = new Date();
				SimpleDateFormat formatNow = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");

				String startTime = formatNow.format(now);
				// Get current time
				long start = System.currentTimeMillis();
				TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
				if (queue != null) {
					queue.add(request);
					qId = dm.InsertQueue("PostMessage", startTime);
				}
				while (!request.isCompleted()) {
					Thread.currentThread();
					Thread.sleep(5);
				}
				// Get elapsed time in milliseconds
				long elapsedTimeMillis = System.currentTimeMillis() - start;

				dm.UpdateQueue(qId, elapsedTimeMillis);
				int tweetId = request.getResponse();

				// GetFeedsByUserID(userID);
				java.net.URI location = new java.net.URI(
						"../home.jsp?msg=success&tweetId=" + tweetId);
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
		try {
			HttpSession session = req.getSession();
			int uid = (int) session.getAttribute("userid");

			UserFeed request = new UserFeed(uid);
			int qId = 0;
			Date now = new Date();
			SimpleDateFormat formatNow = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");

			String startTime = formatNow.format(now);
			// Get current time
			long start = System.currentTimeMillis();
			TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
			if (queue != null) {
				queue.add(request);
				qId = dm.InsertQueue("GetMessageDetails", startTime);
			}
			while (!request.isCompleted()) {
				Thread.currentThread();
				Thread.sleep(5);
			}
			// Get elapsed time in milliseconds
			long elapsedTimeMillis = System.currentTimeMillis() - start;

			dm.UpdateQueue(qId, elapsedTimeMillis);

			feeds = request.getResponse();
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

		MessageDetails request = new MessageDetails(msg_id);
		int qId = 0;
		Date now = new Date();
		SimpleDateFormat formatNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String startTime = formatNow.format(now);
		// Get current time
		long start = System.currentTimeMillis();
		TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
		if (queue != null) {
			queue.add(request);
			qId = dm.InsertQueue("GetMessageDetails", startTime);
		}
		while (!request.isCompleted()) {
			Thread.currentThread();
			Thread.sleep(5);
		}
		// Get elapsed time in milliseconds
		long elapsedTimeMillis = System.currentTimeMillis() - start;

		dm.UpdateQueue(qId, elapsedTimeMillis);
		return request.getResponse();
	}

	// POST tweet/destroy/:id Destroys the status specified by the required ID
	// parameter. The authenticating user must be the author of the specified
	// status. Returns the destroyed status if successful.
	@POST
	@Path("/DeleteMessage")
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteMessage(@QueryParam("msgid") int msg_id,
			@QueryParam("uid") int userID) throws Exception {
		DeleteMessage request = new DeleteMessage(msg_id, userID);
		int qId = 0;
		Date now = new Date();
		SimpleDateFormat formatNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String startTime = formatNow.format(now);
		// Get current time
		long start = System.currentTimeMillis();
		TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
		if (queue != null) {
			queue.add(request);
			qId = dm.InsertQueue("DeleteMessage", startTime);
		}
		while (!request.isCompleted()) {
			Thread.currentThread();
			Thread.sleep(5);
		}
		// Get elapsed time in milliseconds
		long elapsedTimeMillis = System.currentTimeMillis() - start;

		dm.UpdateQueue(qId, elapsedTimeMillis);
		return request.getResponse();
	}

	// POST tweet/retweet/:id Retweets a tweet. Returns the original tweet with
	// retweet users id embedded.
	@POST
	@Path("/RetweetThisMessage")
	@Produces(MediaType.TEXT_PLAIN)
	public String doRetweetThisMessage(@QueryParam("msgid") int msg_id,
			@QueryParam("uid") int userID) throws Exception {
		RetweetMessage request = new RetweetMessage(msg_id, userID);
		int qId = 0;
		Date now = new Date();
		SimpleDateFormat formatNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		String startTime = formatNow.format(now);
		// Get current time
		long start = System.currentTimeMillis();
		TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
		if (queue != null) {
			queue.add(request);
			qId = dm.InsertQueue("RetweetThisMessage", startTime);
		}
		while (!request.isCompleted()) {
			Thread.currentThread();
			Thread.sleep(5);
		}
		// Get elapsed time in milliseconds
		long elapsedTimeMillis = System.currentTimeMillis() - start;

		dm.UpdateQueue(qId, elapsedTimeMillis);
		return request.getResponse();
	}
}

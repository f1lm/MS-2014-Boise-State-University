package socialnetworking.queue;

import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import socialnetworking.library.DataModel;
import socialnetworking.library.UsersObjects;

@Path("/user")
public class UsersService {
	DataModel dm = null;
	private final static String queueName = "processing-queue";

	public UsersService() {
		dm = new DataModel();
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Users";
	}

	// Register Users
	@POST
	@Path("/Register")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response userRegister(@FormParam("firstname") String firstname,
			@FormParam("lastname") String lastname,
			@FormParam("username") String username,
			@FormParam("email") String email,
			@FormParam("password") String password,
			@Context HttpServletRequest req) throws Exception {

		try {
			UsersObjects userInfo = new UsersObjects();
			userInfo.set_firstname(firstname);
			userInfo.set_lastname(lastname);
			userInfo.set_username(username);
			userInfo.set_email(email);
			userInfo.set_password(password);

			ArrayList<UsersObjects> userList = new ArrayList<UsersObjects>();
			userList = dm.getAllUsers();
			boolean isAuth = true;
			for (UsersObjects userVO : userList) {
				if (userVO.get_username().equals(username)) {
					if (userVO.get_email().equals(email)) {
						isAuth = false;
						java.net.URI location = new java.net.URI(
								"../index.jsp?error=nouser");
						return Response.seeOther(location).build();
					}
				}
			}
			if (isAuth) {

				UserRegister request = new UserRegister(userInfo);
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
					qId = dm.InsertQueue("Register", startTime);
				}
				while (!request.isCompleted()) {
					Thread.currentThread();
					Thread.sleep(5);
				}
				// Get elapsed time in milliseconds
				long elapsedTimeMillis = System.currentTimeMillis() - start;

				dm.UpdateQueue(qId, elapsedTimeMillis);
				UsersObjects user = request.getResponse();

				if (user != null) {
					setMySessionID(req, user.get_uid());
					java.net.URI location = new java.net.URI("../home.jsp");
					return Response.seeOther(location).build();
				} else {
					java.net.URI location = new java.net.URI(
							"../index.jsp?error=nouser");
					return Response.seeOther(location).build();
				}
			}

		} catch (Exception e) {
			return Response.status(403).type("text/plain").entity(e.getMessage()).build();
		}
		return null;
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response login(@FormParam("email") String email,
			@FormParam("password") String password,
			@Context HttpServletRequest req) {
		try {
			ArrayList<UsersObjects> userList = new ArrayList<UsersObjects>();
			DataModel dm = new DataModel();
			userList = dm.getAllUsers();

			boolean isFound = false;
			if (userList.size() != 0) {
				for (UsersObjects userVO : userList) {
					if (userVO.get_username().equals(email)
							|| userVO.get_email().equals(email)) {
						if (userVO.get_password().equals(password)) {
							isFound = true;

							UserLogin request = new UserLogin();
							int qId = 0;
							Date now = new Date();
							SimpleDateFormat formatNow = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss");

							String startTime = formatNow.format(now);
							// Get current time
							long start = System.currentTimeMillis();

							TaskQueue queue = ProcessingFactory
									.getTaskQueue(queueName);
							if (queue != null) {
								queue.add(request);
								qId = dm.InsertQueue("Login", startTime);
							}
							while (!request.isCompleted()) {
								Thread.currentThread();
								Thread.sleep(5);
							}
							// Get elapsed time in milliseconds
							long elapsedTimeMillis = System.currentTimeMillis()
									- start;

							dm.UpdateQueue(qId, elapsedTimeMillis);
							setMySessionID(req, userVO.get_uid());

							java.net.URI location = new java.net.URI(
									"../home.jsp");
							return Response.seeOther(location).build();
						} else {
							java.net.URI location = new java.net.URI(
									"../index.jsp?msg=error");
							return Response.seeOther(location).build();
						}
					}
				}
			} else {
				java.net.URI location = new java.net.URI(
						"../index.jsp?msg=error");
				return Response.seeOther(location).build();
			}
			if (!isFound) {
				java.net.URI location = new java.net.URI(
						"../index.jsp?msg=error");
				return Response.seeOther(location).build();
			}
		} catch (Exception e) {
			return Response.status(403).type("text/plain").entity(e.getMessage()).build();
		}
		// return
		// Response.status(403).type("text/plain").entity(message).build();
		return null;
	}

	private void setMySessionID(@Context HttpServletRequest req, int uid) {
		try {
			if (req == null) {
				System.out.println("Null request in context");
			}
			HttpSession session = req.getSession();
			if (session.getAttribute("userid") == null) {
				// id = System.currentTimeMillis();
				session.setAttribute("userid", uid);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	// Logout users
	@GET
	@Path("/Logout")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response logout(@Context HttpServletRequest req) throws Exception {
		if (req == null) {
			System.out.println("Null request in context");
		}
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			// session.setAttribute("userid", null);

			UserLogOut request = new UserLogOut();
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
				qId = dm.InsertQueue("LogOut", startTime);
			}
			while (!request.isCompleted()) {
				Thread.currentThread();
				Thread.sleep(5);
			}
			// Get elapsed time in milliseconds
			long elapsedTimeMillis = System.currentTimeMillis() - start;

			dm.UpdateQueue(qId, elapsedTimeMillis);

			session.removeAttribute("userid");
			session.invalidate();
			java.net.URI location = null;
			try {
				location = new java.net.URI("../index.jsp");
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
			return Response.seeOther(location).build();
		}
		return null;
	}

	public int getMySessionId(@Context HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			return (int) session.getAttribute("userid");
		}
		return 0;
	}

	@GET
	@Path("/GetUserID")
	@Produces(MediaType.TEXT_PLAIN)
	public String getMyUserId(@Context HttpServletRequest req) throws Exception {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			UserDetail request = new UserDetail();
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
				qId = dm.InsertQueue("GetUserID", startTime);
			}
			while (!request.isCompleted()) {
				Thread.currentThread();
				Thread.sleep(5);
			}
			// Get elapsed time in milliseconds
			long elapsedTimeMillis = System.currentTimeMillis() - start;

			dm.UpdateQueue(qId, elapsedTimeMillis);

			return session.getAttribute("userid").toString();
		}
		return "0";
	}
}

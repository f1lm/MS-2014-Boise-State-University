package socialnetworking.rest;

import java.net.URISyntaxException;
import java.util.ArrayList;

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
				UsersObjects user = dm.registerUser(userInfo);
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
			throw e;
		}
		// return
		// Response.status(403).type("text/plain").entity(message).build();
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
			System.out.println("error");
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
	public Response logout(@Context HttpServletRequest req) {
		if (req == null) {
			System.out.println("Null request in context");
		}
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			// session.setAttribute("userid", null);
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
	public String getMyUserId(@Context HttpServletRequest req) {
		HttpSession session = req.getSession();
		if (session.getAttribute("userid") != null) {
			return session.getAttribute("userid").toString();
		}
		return "0";
	}
}

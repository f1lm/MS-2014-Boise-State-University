package socialnetworking.queue;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import socialnetworking.library.DataModel;
import socialnetworking.library.HTTPCodeObjects;
import socialnetworking.library.JSONTansformer;
import socialnetworking.library.MessagesListObjects;
import socialnetworking.library.ProcessingTimeObjects;
import socialnetworking.rest.App;

@Path("/monitor")
public class MonitorService {

	private DataModel dm = null;
	private final static String queueName = "processing-queue";

	public MonitorService() {
		dm = new DataModel();
	}

	/**
	 * Root resource (exposed at "myresource" path)
	 */
	@Path("colo")
	public class HelloWorld {

		/**
		 * Method handling HTTP GET requests. The returned object will be sent
		 * to the client as "text/plain" media type.
		 * 
		 * @return String that will be returned as a text/plain response.
		 */
		@GET
		@Produces(MediaType.TEXT_PLAIN)
		public String serveRequest() {
			return "Request was served by : " + App.BASE_URI + "colo/";
		}
	}

	@GET
	@Path("/processingtime")
	@Produces("application/json")
	public String getProcessingTime() {
		ArrayList<ProcessingTimeObjects> processingTime = new ArrayList<ProcessingTimeObjects>();
		String processingTimes = null;
		try {
			processingTime = dm.GetProcessingTime();
			processingTimes = JSONTansformer.ConvertToJSON(processingTime);
		} catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return processingTimes;
	}

	@GET
	@Path("/queuedepth")
	@Produces("application/json")
	public String getQueueDepth() {
		String queueDepth = "0";
		try {
			queueDepth = dm.GetQueueDepth();
		}

		catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return queueDepth;
	}

	@GET
	@Path("/qps")
	@Produces("application/json")
	public String getQueueProcessService(
			@QueryParam("resolutionQPS") String resolutionQPS,
			@QueryParam("resoultion") String resoultion) {
		ArrayList<MessagesListObjects> messageList = new ArrayList<MessagesListObjects>();
		String messages = null;
		try {
			messageList = dm.GetMessagePerResolution(resolutionQPS, resoultion);
			messages = JSONTansformer.ConvertToJSON(messageList);
		}

		catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return messages;
	}

	@GET
	@Path("/errors")
	@Produces("application/json")
	public String getMessageWithError(@QueryParam("type") int type) {
		ArrayList<HTTPCodeObjects> codeList = new ArrayList<HTTPCodeObjects>();
		String messages = null;
		try {
			codeList = dm.GetMessagesByErrorCode(type);
			messages = JSONTansformer.ConvertToJSON(codeList);
			// SocialNetworkDataBase.addCode("404");
			// return
			// Response.status(Status.NOT_FOUND).header("Access-Control-Allow-Origin",
			// "*").build();
		} catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return messages;
	}
}
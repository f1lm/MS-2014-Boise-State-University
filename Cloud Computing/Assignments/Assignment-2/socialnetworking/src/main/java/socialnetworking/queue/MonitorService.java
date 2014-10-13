package socialnetworking.queue;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import socialnetworking.rest.App;

@Path("/monitor")
public class MonitorService {

	private final static String queueName = "processing-queue";

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
		String processingTime = null;
		try {
			TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
			queue.getDepth();
		} catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return processingTime;
	}

	@GET
	@Path("/queuedepth")
	@Produces("application/json")
	public String getQueueDepth() {
		String depth = null;
		try {
			TaskQueue queue = ProcessingFactory.getTaskQueue(queueName);
			depth = Long.toString(queue.getDepth());
		}

		catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return depth;
	}

	@GET
	@Path("/qps")
	@Produces("application/json")
	public String getQueueProcessService(
			@QueryParam("resoultion") String resoultion) {
		try {
			switch (resoultion) {
			case "Hours":

				break;
			case "Days":

				break;
			case "Months":

				break;

			default: // Minutes
				break;
			}
			return resoultion;
		}

		catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return null;
	}

	@GET
	@Path("/errors")
	@Produces("application/json")
	public String getMessageWithError(@QueryParam("type") String type) {
		try {
			return type;
		}

		catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return null;
	}
}
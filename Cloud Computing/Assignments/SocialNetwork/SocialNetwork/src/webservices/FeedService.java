package webservices;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import model.DataModel;

import com.google.gson.Gson;

import dto.FeedObjects;

@Path("/WebService")
public class FeedService {
	@GET
	@Path("/GetFeeds")
	@Produces("application/json")
	public String feed() {
		String feeds = null;
		try {
			ArrayList<?> feedData = null;
			DataModel dm = new DataModel();
			feedData = dm.GetFeedsByUserID(1);
			Gson gson = new Gson();
			System.out.println(gson.toJson(feedData));
			feeds = gson.toJson(feedData);
		}

		catch (Exception e) {
			System.out.println("Exception Error"); // Console
		}
		return feeds;
	}
}

package transformer;

import java.util.ArrayList;

import com.google.gson.Gson;

import dto.FriendsObjects;
import dto.RetweetObjects;

public class JSONTansformer {
	public static String ConvertToJSON(ArrayList<?> feedData) {
		String feeds = null;
		Gson gson = new Gson();
		feeds = gson.toJson(feedData);
		return feeds;
	}

	public static String RetweetJSONInfo(RetweetObjects messageData) {
		String retweet = null;
		Gson gson = new Gson();
		retweet = gson.toJson(messageData);
		return retweet;
	}
}

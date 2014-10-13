package socialnetworking.library;

public class FeedObjects {
	private int msg_id;
	private String message;
	private int uid;
	private String ip;
	private int msg_created;
	private int retweet_id;
	private int retweet_uid;
	private int retweet_created;

	public int getMsg_id() {
		return msg_id;
	}

	public void setMsg_id(int msg_id) {
		this.msg_id = msg_id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getMsg_created() {
		return msg_created;
	}

	public void setMsg_created(int msg_created) {
		this.msg_created = msg_created;
	}

	public int getRetweet_id() {
		return retweet_id;
	}

	public void setRetweet_id(int retweet_id) {
		this.retweet_id = retweet_id;
	}

	public int getRetweet_uid() {
		return retweet_uid;
	}

	public void setRetweet_uid(int retweet_uid) {
		this.retweet_uid = retweet_uid;
	}

	public int getRetweet_created() {
		return retweet_created;
	}

	public void setRetweet_created(int retweet_created) {
		this.retweet_created = retweet_created;
	}

}

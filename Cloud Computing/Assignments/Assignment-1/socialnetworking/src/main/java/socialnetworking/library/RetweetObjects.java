package socialnetworking.library;

public class RetweetObjects extends MessageObjects {
	private int _retweet_id;
	private int _retweet_uid;
	private String _retweet_ip;
	private int _retweet_created;

	public int get_retweet_id() {
		return _retweet_id;
	}

	public void set_retweet_id(int _retweet_id) {
		this._retweet_id = _retweet_id;
	}

	public int get_retweet_uid() {
		return _retweet_uid;
	}

	public void set_retweet_uid(int _retweet_uid) {
		this._retweet_uid = _retweet_uid;
	}

	public String get_retweet_ip() {
		return _retweet_ip;
	}

	public void set_retweet_ip(String _retweet_ip) {
		this._retweet_ip = _retweet_ip;
	}

	public int get_retweet_created() {
		return _retweet_created;
	}

	public void set_retweet_created(int _retweet_created) {
		this._retweet_created = _retweet_created;
	}

}

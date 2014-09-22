package dto;

public class RetweetObjects extends MessageObjects {
	private int _retweet_id;
	private int _uid;
	private String _ip;
	private int _created;

	public int get_retweet_id() {
		return _retweet_id;
	}

	public void set_retweet_id(int _retweet_id) {
		this._retweet_id = _retweet_id;
	}

	public int get_uid() {
		return _uid;
	}

	public void set_uid(int _uid) {
		this._uid = _uid;
	}

	public String get_ip() {
		return _ip;
	}

	public void set_ip(String _ip) {
		this._ip = _ip;
	}

	public int get_created() {
		return _created;
	}

	public void set_created(int _created) {
		this._created = _created;
	}

}

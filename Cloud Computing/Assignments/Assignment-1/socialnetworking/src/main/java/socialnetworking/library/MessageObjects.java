package socialnetworking.library;

public class MessageObjects {
	private int _msg_id;
	private String _message;
	private int _uid;
	private String _ip;
	private int _created;

	public int get_msg_id() {
		return _msg_id;
	}

	public void set_msg_id(int _msg_id) {
		this._msg_id = _msg_id;
	}

	public String get_message() {
		return _message;
	}

	public void set_message(String _message) {
		this._message = _message;
	}

	public int get_uid_fk() {
		return _uid;
	}

	public void set_uid_fk(int _uid_fk) {
		this._uid = _uid_fk;
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

	public String getMessage() {
		return _message;
	}

	public void setMessage(String message) {
		this._message = message;
	}
}

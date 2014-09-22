package dto;

public class CommentsObjects extends MessageObjects {
	private int _comment_id;
	private String comment;
	private int _msg_id;
	private int _uid;
	private String _ip;
	private int _created;

	public int get_comment_id() {
		return _comment_id;
	}

	public void set_comment_id(int _comment_id) {
		this._comment_id = _comment_id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int get_msg_id() {
		return _msg_id;
	}

	public void set_msg_id(int _msg_id) {
		this._msg_id = _msg_id;
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

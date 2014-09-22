package dto;

public class FollowersObjects extends UsersObjects {
	private int _follower_id;
	private int _following_uid;
	private Status _status;

	public int get_follower_id() {
		return _follower_id;
	}

	public void set_follower_id(int _follower_id) {
		this._follower_id = _follower_id;
	}

	public int get_following_uid() {
		return _following_uid;
	}

	public void set_following_uid(int _following_uid) {
		this._following_uid = _following_uid;
	}

	public Status get_status() {
		return _status;
	}

	public void set_status(Status _status) {
		this._status = _status;
	}
}

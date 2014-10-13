package socialnetworking.library;

public class FriendsObjects extends UsersObjects {
	private int _friend_id;

	public int get_friend_id() {
		return _friend_id;
	}

	public void set_friend_id(int _friend_id) {
		this._friend_id = _friend_id;
	}

	public int get_friendto_uid() {
		return _friendto_uid;
	}

	public void set_friendto_uid(int _friendto_uid) {
		this._friendto_uid = _friendto_uid;
	}

	public Status get_status() {
		return _status;
	}

	public void set_status(Status _status) {
		this._status = _status;
	}

	private int _friendto_uid;
	private Status _status;
}

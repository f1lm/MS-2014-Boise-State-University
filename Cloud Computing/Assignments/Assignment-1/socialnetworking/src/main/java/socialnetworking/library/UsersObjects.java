package socialnetworking.library;

public class UsersObjects {
	private int _uid;
	private String _firstname;
	private String _lastname;
	private String _username;
	private String _password;
	private String _email;
	private int _friends_count;
	private int _followers_count;
	private String _profile_img;

	public String get_firstname() {
		return _firstname;
	}

	public void set_firstname(String _firstname) {
		this._firstname = _firstname;
	}

	public String get_lastname() {
		return _lastname;
	}

	public void set_lastname(String _lastname) {
		this._lastname = _lastname;
	}

	private boolean _isAuthorized = false;

	public boolean is_isAuthorized() {
		return _isAuthorized;
	}

	public void set_isAuthorized(boolean _isAuthorized) {
		this._isAuthorized = _isAuthorized;
	}

	public int get_uid() {
		return _uid;
	}

	public void set_uid(int _uid) {
		this._uid = _uid;
	}

	public String get_username() {
		return _username;
	}

	public void set_username(String _username) {
		this._username = _username;
	}

	public String get_password() {
		return _password;
	}

	public void set_password(String _password) {
		this._password = _password;
	}

	public String get_email() {
		return _email;
	}

	public void set_email(String _email) {
		this._email = _email;
	}

	public int get_friends_count() {
		return _friends_count;
	}

	public void set_friends_count(int _friends_count) {
		this._friends_count = _friends_count;
	}

	public int get_followers_count() {
		return _followers_count;
	}

	public void set_followers_count(int _followers_count) {
		this._followers_count = _followers_count;
	}

	public String get_profile_img() {
		return _profile_img;
	}

	public void set_profile_img(String _profile_img) {
		this._profile_img = _profile_img;
	}

}

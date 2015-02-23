package src;


/**
 * Represents information about a song.
 * 
 * @author amit
 * 
 */
public class Song {
	private String title;
	private String artist;
	private int playTime; // in seconds
	private String fileName;

	/**
	 * Constructor: build a song using the given parameters.
	 * 
	 * @param title
	 *            song's title
	 * @param artist
	 *            song's artist
	 * @param playTime
	 *            song's length in seconds
	 * @param fileName
	 *            song file to load
	 */
	public Song(String title, String artist, int playTime, String fileName) {
		this.title = title;
		this.artist = artist;
		this.playTime = playTime;
		this.fileName = fileName;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @return the artist
	 */
	public String getArtist() {
		return artist;
	}

	/**
	 * @return the playTime
	 */
	public int getPlayTime() {
		return playTime;
	}

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format("%-20s %-20s %-25s %10s", title, artist, fileName,
				playTime);
	}

}

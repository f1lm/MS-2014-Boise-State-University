import java.util.Scanner;

/**
 * 
 * @author ypariyar
 * 
 */
public class Playlist {

	/**
	 * 
	 * @param main
	 */
	public static void main(String[] main) {

		Song firstSong = null;
		Song secondSong = null;
		Song thirdSong = null;
		Song CompareSong;
		Scanner getInput = new Scanner(System.in);
		/*
		 * get user input
		 */
		for (int i = 0; i < 3; i++) {
			System.out.println("Enter Song Details: ");
			System.out.print("Enter Song Title: ");
			String songTitle = getInput.nextLine();
			System.out.print("Enter Artist: ");
			String artist = getInput.nextLine();
			System.out.print("Enter Length (mm:ss): ");
			String length = getInput.nextLine();
			System.out.print("Enter Filepath: ");
			String file = getInput.nextLine();

			int minutes;
			int seconds;
			int indexOfColon;
			int totalSeconds;

			indexOfColon = length.indexOf(":");
			minutes = Integer.parseInt(length.substring(0, indexOfColon));
			seconds = Integer.parseInt(length.substring(indexOfColon + 1));

			totalSeconds = (minutes * 60) + seconds;
			if (i == 0) {
				firstSong = new Song(songTitle, artist, totalSeconds, file);
			} else if (i == 1) {
				secondSong = new Song(songTitle, artist, totalSeconds, file);
			} else {
				thirdSong = new Song(songTitle, artist, totalSeconds, file);
			}
		}
		/*
		 * calculate the average play time of songs
		 */
		System.out
				.print("\nAverageplaytime = "
						+ (float) (firstSong.getPlayTime()
								+ secondSong.getPlayTime() + thirdSong
									.getPlayTime()) / 3);
		/*
		 * get the nearest playlist time to 240
		 */
		if (Math.abs(240 - firstSong.getPlayTime()) < Math.abs(240 - secondSong
				.getPlayTime())
				&& Math.abs(240 - firstSong.getPlayTime()) < Math
						.abs(240 - thirdSong.getPlayTime())) {
			System.out.println("\nSong with playtime closest to 240 secs is:"
					+ firstSong.getTitle());
		} else if (Math.abs(240 - secondSong.getPlayTime()) < Math
				.abs(240 - firstSong.getPlayTime())
				&& Math.abs(240 - secondSong.getPlayTime()) < Math
						.abs(240 - thirdSong.getPlayTime())) {
			System.out.println("\nSong with playtime closest to 240 secs is:"
					+ secondSong.getTitle());
		} else {
			System.out.println("\nSong with playtime closest to 240 secs is:"
					+ thirdSong.getTitle());
		}
		// formating the string
		System.out
				.println("==================================================================================");
		String header = String.format("%-20s %-20s %-25s %10s", "title",
				"artist", "fileName", "playTime");

		System.out.println(header);
		System.out
				.println("==================================================================================");
		/*
		 * get the compare playtime of songs
		 */
		if (firstSong.getPlayTime() < secondSong.getPlayTime()
				&& firstSong.getPlayTime() < thirdSong.getPlayTime()) {
			System.out.println(firstSong.toString());
			if (secondSong.getPlayTime() < thirdSong.getPlayTime()) {
				System.out.println(firstSong.toString());
				System.out.println(thirdSong.toString());
			} else {
				System.out.println(thirdSong.toString());
				System.out.println(secondSong.toString());
			}
		}

		if (secondSong.getPlayTime() < firstSong.getPlayTime()
				&& secondSong.getPlayTime() < thirdSong.getPlayTime()) {
			System.out.println(secondSong.toString());
			if (firstSong.getPlayTime() < thirdSong.getPlayTime()) {
				System.out.println(firstSong.toString());
				System.out.println(thirdSong.toString());
			} else {
				System.out.println(thirdSong.toString());
				System.out.println(firstSong.toString());
			}
		}
		if (thirdSong.getPlayTime() < firstSong.getPlayTime()
				&& thirdSong.getPlayTime() < secondSong.getPlayTime()) {
			System.out.println(thirdSong.toString());
			if (firstSong.getPlayTime() < secondSong.getPlayTime()) {
				System.out.println(firstSong.toString());
				System.out.println(secondSong.toString());
			} else {
				System.out.println(secondSong.toString());
				System.out.println(firstSong.toString());
			}

		}
	}
}

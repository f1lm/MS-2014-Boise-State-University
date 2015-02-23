package socialnetworking.rest;

import java.io.IOException;

/**
 * App class.
 * 
 */
public class App {
	// Base URI the Grizzly HTTP server will listen on
	public static String BASE_URI = null;

	/**
	 * Main method.
	 * 
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		if (args.length < 1) {
			System.out.println("Usage: App [port]");
			System.exit(-1);
		}
		int port = Integer.parseInt(args[0]);
		App.BASE_URI = "http://localhost:" + port + "/RESTQ/";

		System.out.println(String.format(
				"Jersey app started with WADL available at "
						+ "%sapplication.wadl\nHit enter to stop it...",
				BASE_URI));
		System.in.read();
	}
}

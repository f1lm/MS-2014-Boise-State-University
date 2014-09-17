package FileHandling;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class ReadNetworkFile {

	public static void main(String[] args) {

		// URL
		// InputStream for the URL openStream
		// BufferedStream
		// StringBuilder
		// While true and feed = buf.read() feed=-1 --> END of feed

		StringBuilder sb = new StringBuilder();

		try {
			URL url = new URL("http://rss.allrecipes.com/daily.aspx?hubID=80");
			InputStream in = url.openStream();
			BufferedInputStream buf = new BufferedInputStream(in);

			while (true) {
				int feed = buf.read();
				if (feed == -1) {
					break;
				} else {
					sb.append((char) feed);
				}
			}
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(sb);

	}
}

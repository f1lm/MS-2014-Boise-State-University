package FileHandling;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.commons.io.FileUtils;

public class CopyFile {

	public static void main(String[] args) {
		// File

		// InputStream OutputStream

		// buf, len

		// while len = input.read(buf) > 0

		// output.write(buf)

		// close

		// File input = new File("test.txt");
		// File output = new File("target.txt");
		//
		// try {
		// InputStream in = new FileInputStream(input);
		// OutputStream out = new FileOutputStream(output);
		//
		// byte[] buf = new byte[1024];
		// while ((in.read(buf)) > 0) {
		// out.write(buf);
		// }
		//
		// in.close();
		// out.close();
		// } catch (FileNotFoundException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// } catch (IOException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		//
		// System.out.println("File Copied!");

		// Using util commons.apache.org
		// File input = new File("test.txt");
		// File output = new File("target.txt");
		//
		// try {
		// FileUtils.copyFile(input, output);
		// } catch (IOException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		//
		// System.out.println("File Copied!");

		File input = new File("test.txt");
		File output = new File("target.txt");

		try {
			FileUtils.copyFile(input, output);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("File Copied!");
	}
}

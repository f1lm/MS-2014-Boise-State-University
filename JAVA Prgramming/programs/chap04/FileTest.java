import java.io.File;
import java.io.IOException;

/**
 * Shows how to create a File object for given filename and to check if it
 * exists. Note that we can create a File object for a filename that doesn't
 * exist.
 * 
 * @author amit
 */
public class FileTest
{
	/**
	 * Create and return a File object for given filename.
	 * 
	 * @param a
	 *            string representing a filename.
	 * @return a File object.
	 */
	public static File createFile(String name) throws IOException
	{
		File file = new File(name);
		if (file.exists())
			System.out.println(file + " found!");
		else
			System.out.println(file + " not found!");

		return file;
	}

	/**
	 */
	public static void main(String[] args) throws IOException
	{
		String name = "Photos/img1.jpg";
		@SuppressWarnings("unused")
		File file = createFile(name);

		name = "FileTest.class";
		file = createFile(name);
	}
}

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * An example of reading a text file line by line.
 * @author amit
 *
 */
public class FileReading
{
	public static void main(String[] args) throws FileNotFoundException 
	{

		File file = new File("in.data");
		Scanner fileScan = new Scanner(file);

		int count = 0;
		while (fileScan.hasNext()) {
			String line = fileScan.nextLine();
			System.out.printf("line %3d: %s\n", count, line);
			count++;
		}

	}
}

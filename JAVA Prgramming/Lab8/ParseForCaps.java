import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ParseForCaps {

	 public static void main (String[] args){
		 
		Scanner scan=new Scanner(System.in);
		System.out.print("Enter a filename: ");
		String filename = scan.nextLine().trim();
		File file = new File(filename);
		try {
			Scanner fileScan = new Scanner(file);
			while (fileScan.hasNextLine()) {
				//read one line
				String line = fileScan.nextLine();
				Scanner wordScan=new Scanner(line);
				while(wordScan.hasNext()){
					String word=wordScan.next();
					if(word.charAt(0) < 97)	{
						System.out.println(word.charAt(0));
					}
				}
				
				
				
				
				
			}
			
		} catch (FileNotFoundException fnfe) {
			System.err.println(fnfe);
		}
		
		
	 }

}

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ParseAndRewarp {

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		System.out.print("Enter a filename: ");
		String filename = scan.nextLine();
		File file = new File(filename);
		System.out.print("Enter the maximum number of character in a single line: ");
		int maxNumber=scan.nextInt();
		String line2 = "";
		int max=0;
		int min=maxNumber;
				
		try {
			Scanner fileScan = new Scanner(file);
			while (fileScan.hasNextLine()) {
				// read one line
				String line = fileScan.nextLine();
				Scanner wordScan = new Scanner(line);
				while (wordScan.hasNext()) {
   
					String word = wordScan.next();
					
					if((line2.length()+word.length() + 1)<=maxNumber){
						line2 += word + " ";
					} else if((line2.length()+word.length())<=maxNumber){
						line2 += word;
					} else{
						if(line2.length()>max){
							max=line2.length();
						}
						if(line2.length()<min){
							min=line2.length();
						}
						
						System.out.println(line2);
						line2=word+" " ;
					}
				}
			}
			
			System.out.println(line2);
			if(line2.length()>max){
				max=line2.length();
			}
			if(line2.length()<min){
				min=line2.length();
			}
		
			System.out.println("longest line:" +max + " Shortest line:"+ min);

		}

		catch (FileNotFoundException fnfe) {
			System.err.println(fnfe);
		}

	}

}

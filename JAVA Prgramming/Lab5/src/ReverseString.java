import java.util.Scanner;

public class ReverseString {
	public static void main(String[] main) {
		
		String reverse = "";
		Scanner scan = new Scanner(System.in);
		System.out.println("Enter the string that you want to reverse");
		String word = scan.nextLine();
		
		reverse = reverseIt(word);
		//System.out.print(word.charAt(j));
		System.out.println(reverse);     
}

	private static String reverseIt(String word) {
		String reverse = "";
		int i = word.length();
		for (int j = i - 1; j >= 0; j--) {
			reverse= reverse +word.charAt(j);
			
		}
		return reverse;
	}
}

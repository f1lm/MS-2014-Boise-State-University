import java.util.StringTokenizer;


public class UseStringTokenizer {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String text = "Twinkle, twinkle, little star,\n" +
			"How I wonder what you are!\n" +
			"Up above the world so high,\n" +
			"Like a diamond in the sky!";
		System.out.println("---------- default ----------");
		tokenizeSimple( text);
		System.out.println("---------- with delimiter string ----------");
		tokenizeWithDelims( text, " \t\n!,.");
		System.out.println("---------- ---------- ----------\n");
	}
	
	public static void tokenizeSimple( String text) {
		StringTokenizer tokenizer = new StringTokenizer( text);
		System.out.println( "The string has " + tokenizer.countTokens()
				+ " tokens");
		while (tokenizer.hasMoreTokens())
			System.out.println( "\t" + tokenizer.nextToken());
		System.out.println();
	}

	public static void tokenizeWithDelims( String text, String delimiters) {
		StringTokenizer tokenizer = new StringTokenizer( text, delimiters);
		System.out.println( "The string has " + tokenizer.countTokens()
				+ " tokens");
		while (tokenizer.hasMoreTokens())
			System.out.println( "\t" + tokenizer.nextToken());
		System.out.println();
	}

}

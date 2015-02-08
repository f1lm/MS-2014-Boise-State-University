import java.util.*;

public class Scanner {

	private String program;
	private int pos;
	private Token token;
	private Set<String> whitespace=new HashSet<String>();
	private Set<String> digits=new HashSet<String>();
	private Set<String> letters=new HashSet<String>();
	private Set<String> legits=new HashSet<String>();
	private Set<String> keywords=new HashSet<String>();
	private Set<String> operators=new HashSet<String>();
	private Set<String> comments=new HashSet<String>();

	/**
	 * Fill s with all characters between lo and hi.
	 * @param s
	 * @param lo
	 * @param hi
	 */
	private void fill(Set<String> s, char lo, char hi) {
		for (char c=lo; c<=hi; c++)
			s.add(c+"");
	}    

	/**
	 * Fill s with the different whitespace characters.
	 * @param s
	 */
	private void initWhitespace(Set<String> s) {
		s.add(" ");
		s.add("\n");
		s.add("\t");
	}

	/**
	 * Fill s with the different numeric characters.
	 * @param s
	 */
	private void initDigits(Set<String> s) {
		fill(s,'0','9');
		s.add(".");
	}

	/**
	 * Fill s with all possible alphabetical characters.
	 * @param s
	 */
	private void initLetters(Set<String> s) {
		fill(s,'A','Z');
		fill(s,'a','z');
	}

	/**
	 * Combine letters and digits into a single set, s.
	 * @param s
	 */
	private void initLegits(Set<String> s) {
		s.addAll(letters);
		s.addAll(digits);
	}

	/**
	 * Fill s with all possible operators.
	 * @param s
	 */
	private void initOperators(Set<String> s) {
		s.add("=");
		s.add("+");
		s.add("-");
		s.add("*");
		s.add("/");
		s.add("(");
		s.add(")");
        s.add(";");
		s.add("<");
        s.add("<=");
        s.add(">");
        s.add(">=");
        s.add("<>");
        s.add("==");
	}
	
	private void initComments(Set<String> s) {
		s.add("#");
	}

	/**
	 * Fill s with specific keywords.
	 * @param s
	 */
	private void initKeywords(Set<String> s) {
            s.add("rd");
            s.add("wr");
            s.add("if");
            s.add("then");
            s.add("else");
            s.add("while");
            s.add("do");
            s.add("begin");
            s.add("end");
	}

	/**
	 * Initialize new Scanner with passed in program.
	 * @param program
	 */
	public Scanner(String program) {
		this.program=program;
		pos=0;
		token=null;
		initWhitespace(whitespace);
		initDigits(digits);
		initLetters(letters);
		initLegits(legits);
		initKeywords(keywords);
		initOperators(operators);
		initComments(comments);
	}

	/**
	 * Check scanner to see if position pointer is past last element of program.
	 * @return Boolean
	 */
	public boolean done() {
		return pos>=program.length();
	}
	
	/**
	 * Increment the position counter so the program will finish after next done() check.
	 */
	public void finish() {
		pos = program.length();
	}
	
	/**
	 * Increment pos until s does not contain char at pos.
	 * @param s
	 */
	private void many(Set<String> s) {
		while (!done() && s.contains(program.charAt(pos)+""))
			pos++;
	}

	/**
	 * Increment pos until char at pos is 1 past the last matching char to c.
	 * @param c
	 */
	private void past(char c) {
		while (!done() && c!=program.charAt(pos))
			pos++;
		if (!done() && c==program.charAt(pos))
			pos++;
	}

	/**
	 * Get next number out of program and assign to token.
	 */
	private void nextNumber() {
		int old=pos;
		many(digits);
		token=new Token("num",program.substring(old,pos));
	}

	/**
	 * Get next lexeme out of program and assign to token.
	 */
	private void nextKwId() {
		int old=pos;
		many(letters);
		many(legits);
		String lexeme=program.substring(old,pos);
		token=new Token((keywords.contains(lexeme) ? lexeme : "id"),lexeme);
	}
	
	/**
	 * Get next operator out of program and assign to token.
	 */
	private void nextOp() {
		int old=pos;
		pos=old+2;
		if (!done()) {
			String lexeme=program.substring(old,pos);
			if (operators.contains(lexeme)) {
				token=new Token(lexeme);
				return;
			}
		}
		pos=old+1;
		String lexeme=program.substring(old,pos);
		token=new Token(lexeme);
	}

	/**
	 * Gets the next whole Token from program.
	 * @return true if valid token obtained, false if no more tokens.
	 */
	public boolean next() {
		if (done())
			return false;
		many(whitespace);
		String c=program.charAt(pos)+"";
		if (digits.contains(c))
			nextNumber();
		else if (letters.contains(c))
			nextKwId();
		else if (operators.contains(c))
			nextOp();
		else if (comments.contains(c)) {
			finish();
			return next();
		}
		else {
			System.err.println("illegal character at position "+pos);
			pos++;
			return next();
		}
		return true;
	}

	/**
	 * If passed in token, t, equals current token, process next token.
	 * @param t
	 * @throws SyntaxException
	 */
	public void match(Token t) throws SyntaxException {
		if (!t.equals(curr()))
			throw new SyntaxException(pos,t,curr());
		next();
	}

	/**
	 * Return current token if not null.
	 * @return token
	 * @throws SyntaxException
	 */
	public Token curr() throws SyntaxException {
		if (token==null)
			throw new SyntaxException(pos,new Token("ANY"),new Token("EMPTY"));
		return token;
	}

	/**
	 * Return pos attribute.
	 * @return pos
	 */
	public int pos() { return pos; }
	
	/**
	 * Main method for scanner used for testing the scanner class.
	 * @param args
	 */
	/*public static void main(String[] args) {
		try {
			Scanner scanner=new Scanner(args[0]);
			while (scanner.next())
				System.out.println(scanner.curr());
		} catch (SyntaxException e) {
			System.err.println(e);
		}
	}*/

}

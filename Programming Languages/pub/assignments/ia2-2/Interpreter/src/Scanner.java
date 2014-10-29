import java.util.HashSet;
import java.util.Set;

/**
 * @author MilsonMunakami
 *
 */
public class Scanner {

	private String program;
	private int pos;
	private Token token;
	private Set<String> whitespace = new HashSet<String>();
	private Set<String> digits = new HashSet<String>();
	private Set<String> letters = new HashSet<String>();
	private Set<String> legits = new HashSet<String>();
	private Set<String> keywords = new HashSet<String>();
	private Set<String> operators = new HashSet<String>();
	private Set<String> comments = new HashSet<String>();

	private void fill(Set<String> s, char lo, char hi) {
		for (char c = lo; c <= hi; c++)
			s.add(c + "");
	}

	private void initWhitespace(Set<String> s) {
		s.add(" ");
		s.add("\n");
		s.add("\t");
	}

	private void initDigits(Set<String> s) {
		fill(s, '0', '9');
		s.add(".");
	}

	private void initLetters(Set<String> s) {
		fill(s, 'A', 'Z');
		fill(s, 'a', 'z');
	}

	private void initLegits(Set<String> s) {
		s.addAll(letters);
		s.addAll(digits);
	}

	private void initOperators(Set<String> s) {
		s.add("=");
		s.add("+");
		s.add("-");
		s.add("*");
		s.add("/");
		s.add("(");
		s.add(")");
		s.add(";");
		// relational operators.
		s.add("<");
		s.add("<=");
		s.add(">");
		s.add(">=");
		s.add("<>");
		s.add("==");
	}

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

	private void initComments(Set<String> s) {
		s.add("[");
	}

	/**
	 * Scanner Constructor Scan all the incoming arguments and create a Set of
	 * each type i.e. Digits, Letters, etc.
	 * 
	 * @param program
	 */
	public Scanner(String program) {
		this.program = program;
		pos = 0;
		token = null;
		initWhitespace(whitespace);
		initDigits(digits);
		initLetters(letters);
		initLegits(legits);
		initKeywords(keywords);
		initOperators(operators);
		initComments(comments);
	}

	public boolean done() {
		return pos >= program.length();
	}

	/**
	 * Check for specific type of Token and increment the position if found
	 * 
	 * @param s
	 */
	private void many(Set<String> s) {
		while (!done() && s.contains(program.charAt(pos) + ""))
			pos++;
	}

	private void past(char c) {
		while (!done() && c != program.charAt(pos))
			pos++;
		if (!done() && c == program.charAt(pos))
			pos++;
	}

	/**
	 * Find the next digit character and set the token value
	 */
	private void nextNumber() {
		int old = pos;
		many(digits);
		token = new Token("num", program.substring(old, pos));
	}

	/**
	 * Find the next keyword character and set the token value
	 */
	private void nextKwId() {
		int old = pos;
		many(letters);
		many(legits);
		String lexeme = program.substring(old, pos);
		token = new Token((keywords.contains(lexeme) ? lexeme : "id"), lexeme);
	}

	/**
	 * Find the next operator character and set the token value
	 */
	private void nextOp() {
		int old = pos;
		pos = old + 2;
		if (!done()) {
			String lexeme = program.substring(old, pos);
			if (operators.contains(lexeme)) {
				token = new Token(lexeme);
				return;
			}
		}
		pos = old + 1;
		String lexeme = program.substring(old, pos);
		token = new Token(lexeme);
	}

	/**
	 * Scan each character to find any digits, keywords, operators, etc.
	 * 
	 * @return whether scanning is done or not
	 */
	public boolean next() {
		if (done())
			return false;
		many(whitespace);
		String c = program.charAt(pos) + "";
		if (digits.contains(c))
			nextNumber();
		else if (letters.contains(c))
			nextKwId();
		else if (operators.contains(c))
			nextOp();
		else if (comments.contains(c))
			nextComment();
		else {
			System.err.println("illegal character at position " + pos);
			pos++;
			return next();
		}
		return true;
	}
	
	/**
	 * Find the end of the comment and assign to a token comment
	 */
	private void nextComment() {
		int old = pos();
		past(']');
		token = new Token("comment", program.substring(old, pos));
	}

	/**
	 * match the token with the character
	 * 
	 * @param t
	 * @throws SyntaxException
	 */
	public void match(Token t) throws SyntaxException {
		if (!t.equals(curr()))
			throw new SyntaxException(pos, t, curr());
		next();
	}

	/**
	 * get current Token value
	 * 
	 * @return Token
	 * @throws SyntaxException
	 */
	public Token curr() throws SyntaxException {
		if (token == null)
			throw new SyntaxException(pos, new Token("ANY"), new Token("EMPTY"));
		return token;
	}

	public int pos() {
		return pos;
	}

	public static void main(String[] args) {
		String str = ""; //get the arguments
		for (String stmt : args) {
			str += " ";
			str += stmt;
		}
		try {
			Scanner scanner = new Scanner(str);//new Scanner(args[0]);
			while (scanner.next())
				System.out.println(scanner.curr());
		} catch (SyntaxException e) {
			System.err.println(e);
		}
	}
	
	/**
	 * Fetch up to the end of comment
	 * @throws SyntaxException
	 */
	public void skipComment() throws SyntaxException {
		while (curr().equals(new Token("comment")))
			next();
	}

}

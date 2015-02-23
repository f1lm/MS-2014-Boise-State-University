public class Token {

	private String token;
	private String lexeme;

	/**
	 * Constructor for Token class.
	 * @param token
	 * @param lexeme
	 */
	public Token(String token, String lexeme) {
		this.token=token;
		this.lexeme=lexeme;
	}

	/**
	 * Constructor for Token class.
	 * @param token
	 */
	public Token(String token) {
		this(token,token);
	}

	
	public String tok() { return token; } 
	public String lex() { return lexeme; }

	/**
	 * Checks for equality between token t and this.
	 * @param t
	 * @return boolean
	 */
	public boolean equals(Token t) {
		return token.equals(t.token);
	}

	/**
	 * Returns string representation of this.
	 */
	public String toString() {
		return "<"+tok()+","+lex()+">";
	}

}

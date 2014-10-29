/**
 * @author MilsonMunakami
 *
 */
public class Parser {

	private Scanner scanner;

	/**
	 * match the charater with pre-defined Tokens
	 * 
	 * @param s
	 * @throws SyntaxException
	 */
	private void match(String s) throws SyntaxException {
		scanner.match(new Token(s));
	}

	private Token curr() throws SyntaxException {
		return scanner.curr();
	}

	private int pos() {
		return scanner.pos();
	}

	/**
	 * Parse multiply/division expression
	 * 
	 * @return
	 * @throws SyntaxException
	 */
	private NodeMulop parseMulop() throws SyntaxException {
		if (curr().equals(new Token("*"))) {
			match("*");
			return new NodeMulop(pos(), "*");
		}
		if (curr().equals(new Token("/"))) {
			match("/");
			return new NodeMulop(pos(), "/");
		}
		return null;
	}

	/**
	 * Parse add/subtract expression
	 * 
	 * @return
	 * @throws SyntaxException
	 */
	private NodeAddop parseAddop() throws SyntaxException {
		if (curr().equals(new Token("+"))) {
			match("+");
			return new NodeAddop(pos(), "+");
		}
		if (curr().equals(new Token("-"))) {
			match("-");
			return new NodeAddop(pos(), "-");
		}
		return null;
	}

	/**
	 * Parse the fact expression
	 * @return
	 * @throws SyntaxException
	 */
	private NodeFact parseFact() throws SyntaxException {
		if (curr().equals(new Token("-"))) {
			match("-");
			if (curr().equals(new Token("("))) {
				match("(");
				NodeExpr expr = parseExpr();
				match(")");
				return new NodeFactExpr(expr, true);
			}
			if (curr().equals(new Token("id"))) {
				Token id = curr();
				match("id");
				return new NodeFactId(pos(), id.lex(), true);
			}
			Token num = curr();
			match("num");
			return new NodeFactNum(num.lex(), true);
		} else {
			if (curr().equals(new Token("("))) {
				match("(");
				NodeExpr expr = parseExpr();
				match(")");
				return new NodeFactExpr(expr);
			}
			if (curr().equals(new Token("id"))) {
				Token id = curr();
				match("id");
				return new NodeFactId(pos(), id.lex());
			}
			Token num = curr();
			match("num");
			return new NodeFactNum(num.lex());
		}
	}

	/**
	 * Parse Term
	 * 
	 * @return
	 * @throws SyntaxException
	 */
	private NodeTerm parseTerm() throws SyntaxException {
		NodeFact fact = parseFact();
		NodeMulop mulop = parseMulop();
		if (mulop == null)
			return new NodeTerm(fact, null, null);
		NodeTerm term = parseTerm();
		term.append(new NodeTerm(fact, mulop, null));
		return term;
	}

	/**
	 * Parse expression statement
	 * 
	 * @return
	 * @throws SyntaxException
	 */
	private NodeExpr parseExpr() throws SyntaxException {
		NodeTerm term = parseTerm();
		NodeAddop addop = parseAddop();
		if (addop == null)
			return new NodeExpr(term, null, null);
		NodeExpr expr = parseExpr();
		expr.append(new NodeExpr(term, addop, null));
		return expr;
	}

	/**
	 * Parse assignment statement
	 * 
	 * @return
	 * @throws SyntaxException
	 */
	private NodeAssn parseAssn() throws SyntaxException {
		scanner.skipComment();
		Token id = curr();
		match("id");
		scanner.skipComment();
		match("=");
		scanner.skipComment();
		NodeExpr expr = parseExpr();
		NodeAssn assn = new NodeAssn(id.lex(), expr);
		return assn;
	}

	/**
	 * Ended with ; it return the Node NodeStmt
	 * 
	 * @return parsed statement
	 * @throws SyntaxException
	 */
	private NodeStmt parseStmt() throws SyntaxException {
		NodeAssn assn = parseAssn();
		scanner.skipComment();
		match(";");
		NodeStmt stmt = new NodeStmt(assn);
		return stmt;
	}

	/**
	 * Parse the input argument
	 * 
	 * @param argument
	 *            statement
	 * @return Node
	 * @throws SyntaxException
	 */
	public Node parse(String program) throws SyntaxException {
		scanner = new Scanner(program);
		scanner.next();
		return parseStmt();
	}

}

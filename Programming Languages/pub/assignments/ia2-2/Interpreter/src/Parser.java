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
	 * Try to parse relational operator
	 * 
	 * @return
	 * @throws SyntaxException
	 */
	private NodeRelop parseRelop() throws SyntaxException {
		if (curr().equals(new Token("<"))) {
			match("<");
			return new NodeRelop(pos(), "<");
		}
		if (curr().equals(new Token("<="))) {
			match("<=");
			return new NodeRelop(pos(), "<=");
		}
		if (curr().equals(new Token(">"))) {
			match(">");
			return new NodeRelop(pos(), ">");
		}
		if (curr().equals(new Token(">="))) {
			match(">=");
			return new NodeRelop(pos(), ">=");
		}
		if (curr().equals(new Token("<>"))) {
			match("<>");
			return new NodeRelop(pos(), "<>");
		}
		if (curr().equals(new Token("=="))) {
			match("==");
			return new NodeRelop(pos(), "==");
		}
		return null;
	}

	/**
	 * Parse the fact expression
	 * 
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
	 * Parse a boolean expression.
	 * 
	 * @return
	 */
	private NodeBoolExpr parseBoolexpr() throws SyntaxException {
		NodeExpr expr1 = parseExpr();
		scanner.skipComment();
		NodeRelop relop = parseRelop();
		scanner.skipComment();
		NodeExpr expr2 = parseExpr();
		return new NodeBoolExpr(relop, expr1, expr2);
	}

	/**
	 * Parse assignment statement
	 * 
	 * @return
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
	private NodeStmt parseStmt(java.util.Scanner scan) throws SyntaxException {
		scanner.skipComment();
		// rd id -- from stdin
		if (curr().equals(new Token("rd"))) {
			match("rd");
			Token id = curr();
			match("id");
			String value = scan.next();
			NodeFactNum factNum = new NodeFactNum(value);
			NodeTerm term = new NodeTerm(factNum, null, null);
			NodeExpr expr = new NodeExpr(term, null, null);
			NodeAssn assn = new NodeAssn(id.lex(), expr);
			return new NodeStmtAssn(assn);
		}
		// wr expr
		if (curr().equals(new Token("wr"))) {
			match("wr");
			scanner.skipComment();
			NodeExpr expr = parseExpr();
			scanner.skipComment();
			return new NodeStmtWrite(expr);
		}

		// if boolexpr then stmt else stmt
		if (curr().equals(new Token("if"))) {
			match("if");
			scanner.skipComment();
			NodeBoolExpr boolexpr = parseBoolexpr();
			scanner.skipComment();
			match("then");
			scanner.skipComment();
			NodeStmt stmt1 = parseStmt(scan);
			scanner.skipComment();
			if (scanner.done())
				return new NodeIfBlock(boolexpr, stmt1, null);
			if (curr().equals(new Token("else"))) {
				match("else");
				NodeStmt stmt2 = parseStmt(scan);
				return new NodeIfBlock(boolexpr, stmt1, stmt2);
			} else
				return new NodeIfBlock(boolexpr, stmt1, null);
		}

		// while boolexpr do stmt
		if (curr().equals(new Token("while"))) {
			match("while");
			scanner.skipComment();
			NodeBoolExpr boolexpr = parseBoolexpr();
			scanner.skipComment();
			match("do");
			scanner.skipComment();
			NodeStmt stmt = parseStmt(scan);
			scanner.skipComment();
			return new NodeWhileDo(boolexpr, stmt);
		}

		// begin block end
		if (curr().equals(new Token("begin"))) {
			match("begin");
			scanner.skipComment();
			NodeBlock block = parseBlock(scan);
			scanner.skipComment();
			match("end");
			return new NodeBeginEnd(block);
		}
		// assn
		NodeAssn assn = parseAssn();
		scanner.skipComment();
		// match(";");
		NodeStmt stmt = new NodeStmtAssn(assn);
		return stmt;
	}

	/**
	 * Parse a Block node.
	 * 
	 * @param input
	 * @return
	 * @throws SyntaxException
	 */
	private NodeBlock parseBlock(java.util.Scanner scan) throws SyntaxException {
		scanner.skipComment();
		// stmt
		NodeStmt stmt = parseStmt(scan);
		if (scanner.done())
			return new NodeBlock(stmt, null);
		// stmt ';' block
		scanner.skipComment();
		match(";");
		scanner.skipComment();
		NodeBlock block = parseBlock(scan);
		return new NodeBlock(stmt, block);
	}

	/**
	 * Parse a program Node.
	 * 
	 * @param input
	 * @return
	 * @throws SyntaxExcetion
	 */
	private NodeProg parseProg(java.util.Scanner input) throws SyntaxException {
		scanner.skipComment();
		NodeBlock block = parseBlock(input);
		scanner.skipComment();
		NodeProg prog = new NodeProg(block);
		return prog;
	}

	/**
	 * Parse the input argument
	 * 
	 * @param program
	 * @param input
	 * @return Node
	 * @throws SyntaxException
	 */
	public Node parse(String program, java.util.Scanner scan)
			throws SyntaxException {
		scanner = new Scanner(program);
		scanner.next();
		return parseProg(scan);
	}

}

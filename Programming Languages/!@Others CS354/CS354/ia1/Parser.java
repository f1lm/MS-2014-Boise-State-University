import java.util.*;

public class Parser {

	private Scanner scanner;

	/**
	 * Call scanner.match on token object of s.
	 * @param s : desired string to match to current token.
	 * @throws SyntaxException
	 */
	private void match(String s) throws SyntaxException {
		scanner.match(new Token(s));
	}
	/**
	 * Returns the current token from the scanner.
	 * @return token
	 * @throws SyntaxException
	 */
	private Token curr() throws SyntaxException {
		return scanner.curr();
	}

	/**
	 * Returns current postion in the scanner.
	 * @return pos
	 */
	private int pos() {
		return scanner.pos();
	}

	/**
	 * Creates NodeMulop object from current token if valid, else returns null.
	 * @return NodeMulop object or null.
	 * @throws SyntaxException
	 */
	private NodeMulop parseMulop() throws SyntaxException {
		if (curr().equals(new Token("*"))) {
			match("*");
			return new NodeMulop(pos(),"*");
		}
		if (curr().equals(new Token("/"))) {
			match("/");
			return new NodeMulop(pos(),"/");
		}
		return null;
	}

	/**
	 * Creates NodeAddop object from current token if valid, else returns null.
	 * @return NodeAddop
	 * @throws SyntaxException
	 */
	private NodeAddop parseAddop() throws SyntaxException {
		if (curr().equals(new Token("+"))) {
			match("+");
			return new NodeAddop(pos(),"+");
		}
		if (curr().equals(new Token("-"))) {
			match("-");
			return new NodeAddop(pos(),"-");
		}
		return null;
	}

	/**
	 * Creates NodeFactId object from valid id token, NodeFactExpr from valid expr token, or
	 * NodeFactNum from valid number token.
	 * @return NodeFact
	 * @throws SyntaxException
	 */
	private NodeFact parseFact() throws SyntaxException {
		if (curr().equals(new Token("("))) {
			match("(");
			NodeExpr expr=parseExpr();	//get expression inside the surrounding ()
			match(")");
			return new NodeFactExpr(expr);
		}
		if (curr().equals(new Token("id"))) {
			Token id=curr();
			match("id");
			return new NodeFactId(pos(),id.lex());
		}
		Token num=curr();
		match("num");
		return new NodeFactNum(num.lex());
	}

	/**
	 * Creates a NodeTerm object from the parsed facts and multops.
	 * @return term
	 * @throws SyntaxException
	 */
	private NodeTerm parseTerm() throws SyntaxException {
		if (curr().equals(new Token("-"))) {
			NodeFactNum nodeFactNum = new NodeFactNum("-1");
			NodeMulop nodeMulop = new NodeMulop(scanner.pos(), "*");
			NodeTerm Uterm = new NodeTerm(nodeFactNum, nodeMulop, null);
			match("-");
			NodeTerm term = parseTerm();
			term.append(Uterm);
			return term;
		}
		NodeFact fact=parseFact();
		NodeMulop mulop=parseMulop();
		if (mulop==null)
			return new NodeTerm(fact,null,null);
		NodeTerm term=parseTerm();
		term.append(new NodeTerm(fact,mulop,null));
		return term;
	}

	/**
	 * Creates a NodeExpr object from the parsed terms and addops.
	 * @return expr
	 * @throws SyntaxException
	 */
	private NodeExpr parseExpr() throws SyntaxException {
		NodeTerm term=parseTerm();
		NodeAddop addop=parseAddop();
		if (addop==null)
			return new NodeExpr(term,null,null);
		NodeExpr expr=parseExpr();
		expr.append(new NodeExpr(term,addop,null));
		return expr;
	}

	/**
	 * Creates a NodeAssn object from the parsed expr.
	 * @return assn : 
	 * @throws SyntaxException
	 */
	private NodeAssn parseAssn() throws SyntaxException {
		Token id=curr();
		match("id");
		match("=");
		NodeExpr expr=parseExpr();
		NodeAssn assn=new NodeAssn(id.lex(),expr);
		return assn;
	}

	/**
	 * Create NodeStmt object from the parsed assn.
	 * @return stmt
	 * @throws SyntaxException
	 */
	private NodeStmt parseStmt() throws SyntaxException {
		NodeAssn assn=parseAssn();
		match(";");
		NodeStmt stmt=new NodeStmt(assn);
		return stmt;
	}

	/**
	 * Parses the stmt.
	 * @param program
	 * @return 
	 * @throws SyntaxException
	 */
	public Node parse(String program) throws SyntaxException {
		scanner=new Scanner(program);
		if(!scanner.next()) return new NodeBlank();	//done.
		return parseStmt();
	}

}

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

    private NodeRelop parseRelop() throws SyntaxException {
        if (curr().equals(new Token("<"))) {
            match("<");
            return new NodeRelop(pos(), "<");
        }
        else if (curr().equals(new Token("<="))) {
            match("<=");
            return new NodeRelop(pos(), "<=");
        }
        else if (curr().equals(new Token(">"))) {
            match(">");
            return new NodeRelop(pos(), ">");
        }
        else if (curr().equals(new Token(">="))) {
            match(">=");
            return new NodeRelop(pos(), ">=");
        }
        else if (curr().equals(new Token("<>"))) {
            match("<>");
            return new NodeRelop(pos(), "<>");
        }
        else if (curr().equals(new Token("=="))) {
            match("==");
            return new NodeRelop(pos(), "==");
        }
        else
            throw new SyntaxException(pos(), new Token("Incorrect symbol"), curr());
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
     *
     * @return
     * @throws SyntaxException
     */
    private NodeBoolExpr parseBoolExpr() throws SyntaxException {
        NodeExpr leftExpr = parseExpr();
        NodeRelop relop = parseRelop();
        NodeExpr rightExpr = parseExpr();
        NodeBoolExpr boolExpr = new NodeBoolExpr(leftExpr, relop, rightExpr);
        return boolExpr;
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
        if (curr().equals(new Token("rd"))) {
            match("rd");
            NodeStmtId stmtId = new NodeStmtId(parseFact());
            return stmtId;
        }
        else if (curr().equals(new Token("wr"))) {
            match("wr");
            NodeStmtExpr stmtExpr = new NodeStmtExpr(parseExpr());
            return stmtExpr;
        }
        else if (curr().equals(new Token("if"))) {
            match("if");
            NodeBoolExpr boolExpr = parseBoolExpr();
            match("then");
            NodeStmt thenStmt = parseStmt();
            if(curr().equals(new Token("else"))) {
                match("else");
                NodeStmt elseStmt = parseStmt();
                return new NodeStmtIf(boolExpr, thenStmt, elseStmt);
            }
            else {
                return new NodeStmtIf(boolExpr, thenStmt);
            }
        }
        else if (curr().equals(new Token("while"))) {
            match("while");
            NodeBoolExpr boolExpr = parseBoolExpr();
            match("do");
            NodeStmt doStmt = parseStmt();
            return new NodeStmtWhile(boolExpr, doStmt);
        }
        else if (curr().equals(new Token("begin"))) {
            match("begin");
            NodeStmtBegin begin = new NodeStmtBegin(parseBlock());
            match("end");
            return begin;
        }
        else {
            NodeAssn assn=parseAssn();
            NodeStmtAssn stmt=new NodeStmtAssn(assn);
            return stmt;
        }
	}
        
        private NodeBlock parseBlock() throws SyntaxException {
            NodeStmt stmt = parseStmt();
            if(curr().equals(new Token(";"))) {
                match(";");
                NodeBlock block = parseBlock();
                return new NodeBlock(stmt, block);
            }
            else {
                return new NodeBlock(stmt);
            }
        }
        
        private NodeProg parseProg() throws SyntaxException {
            NodeProg prog = new NodeProg(parseBlock());
            return prog;
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
		return parseProg();
	}

}

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

    private void fill(Set<String> s, char lo, char hi) {
	for (char c=lo; c<=hi; c++)
	    s.add(c+"");
    }    

    private void initWhitespace(Set<String> s) {
	s.add(" ");
	s.add("\n");
	s.add("\t");
    }

    private void initDigits(Set<String> s) {
	fill(s,'0','9');
    }

    private void initLetters(Set<String> s) {
	fill(s,'A','Z');
	fill(s,'a','z');
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
    }

    private void initKeywords(Set<String> s) {
    }

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
    }

    public boolean done() {
	return pos>=program.length();
    }

    private void many(Set<String> s) {
	while (!done() && s.contains(program.charAt(pos)+""))
	    pos++;
    }
    
    private void past(char c) {
	while (!done() && c!=program.charAt(pos))
	    pos++;
	if (!done() && c==program.charAt(pos))
	    pos++;
    }

    private void nextNumber() {
	int old=pos;
	many(digits);
	token=new Token("num",program.substring(old,pos));
    }

    private void nextKwId() {
	int old=pos;
	many(letters);
	many(legits);
	String lexeme=program.substring(old,pos);
	token=new Token((keywords.contains(lexeme) ? lexeme : "id"),lexeme);
    }

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
	else {
	    System.err.println("illegal character at position "+pos);
	    pos++;
	    return next();
	}
	return true;
    }

    public void match(Token t) throws SyntaxException {
	if (!t.equals(curr()))
	    throw new SyntaxException(pos,t,curr());
	next();
    }

    public Token curr() throws SyntaxException {
	if (token==null)
	    throw new SyntaxException(pos,new Token("ANY"),new Token("EMPTY"));
	return token;
    }

    public int pos() { return pos; }

    public static void main(String[] args) {
	try {
	    Scanner scanner=new Scanner(args[0]);
	    while (scanner.next())
		System.out.println(scanner.curr());
	} catch (SyntaxException e) {
	    System.err.println(e);
	}
    }

}

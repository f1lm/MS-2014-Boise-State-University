
import java.util.*;

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
    private Set<String> reloperators = new HashSet<String>();
    private boolean noTokensFound;

    /**
     * Helper function to fill in chars/digits within a certain range
     */
    private void fill(Set<String> s, char lo, char hi)
    {
        for (char c = lo; c <= hi; c++)
        {
            s.add(c + "");
        }
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid
     * whitespace characters
     */
    private void initWhitespace(Set<String> s)
    {
        s.add(" ");
        s.add("\n");
        s.add("\t");
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid digits
     */
    private void initDigits(Set<String> s)
    {
        fill(s, '0', '9');
        s.add(".");
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid letters
     */
    private void initLetters(Set<String> s)
    {
        fill(s, 'A', 'Z');
        fill(s, 'a', 'z');
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid operands
     */
    private void initLegits(Set<String> s)
    {
        s.addAll(letters);
        s.addAll(digits);
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid
     * operators
     */
    private void initOperators(Set<String> s)
    {
        s.add("=");
        s.add("+");
        s.add("-");
        s.add("*");
        s.add("/");
        s.add("(");
        s.add(")");
        s.add(";");
        s.add(">");
        s.add("<");
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid
     * relational operators
     *
     * @param s - the set to fill
     */
    private void initRelOps(Set<String> s)
    {
        s.add("<");
        s.add(">");
        s.add("<=");
        s.add(">=");
        s.add("<>");
        s.add("==");
    }

    /**
     * Fills the set that is utilized by the scanner to determine valid keywords
     *
     * @param s - the set to fill
     */
    private void initKeywords(Set<String> s)
    {
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
     * Takes the input program to scan through and to generate tokens from,
     * utilizes a position counter to determine its location while scanning
     */
    public Scanner(String program)
    {
        this.program = program;
        pos = 0;
        token = null;
        initWhitespace(whitespace);
        initDigits(digits);
        initLetters(letters);
        initLegits(legits);
        initKeywords(keywords);
        initOperators(operators);
        initRelOps(reloperators);
    }

    /**
     * Helper function to notify the scanner if it has scanned through the whole
     * program
     *
     * @return
     */
    public boolean done()
    {
        return pos >= program.length();
    }

    /**
     * Attempts to form the largest, valid, meaningful token by incrementing the
     * position counter of the scanner until a new, unknown character has been
     * found.
     *
     * @param s - the set to check
     */
    private void many(Set<String> s)
    {
        while (!done() && s.contains(program.charAt(pos) + ""))
        {
            pos++;
        }
    }

    /**
     * Determines whether we have gone past a char
     *
     * @param c - the char to check if we have passed
     */
    private void past(char c)
    {
        while (!done() && c != program.charAt(pos))
        {
            pos++;
        }
        if (!done() && c == program.charAt(pos))
        {
            pos++;
        }
    }

    /**
     * Scans the next number regardless of its length and creates a token out of
     * it
     */
    private void nextNumber()
    {
        int old = pos;
        many(digits);
        token = new Token("digit", program.substring(old, pos));
    }

    /**
     * Endeavors to make the largest meaningful id out of letters and digits and
     * creates a token out of it
     */
    private void nextKwId()
    {
        int old = pos;
        many(letters);
        many(legits);
        String lexeme = program.substring(old, pos);
        token = new Token((keywords.contains(lexeme) ? lexeme : "id"), lexeme);
    }

    /**
     * Creates a token out of the next operator whether it be a two character or
     * one operator
     */
    private void nextOp()
    {
        int old = pos;
        pos = old + 2;
        //this checks for two character operators?
        if (!done())
        {
            String lexeme = program.substring(old, pos);
            if (operators.contains(lexeme) || reloperators.contains(lexeme))
            {
                token = new Token(lexeme);
                return;
            }
        }
        pos = old + 1;
        String lexeme = program.substring(old, pos);
        token = new Token(lexeme);
    }

    /**
     * Passes over any comments of the form "#...#"
     */
    private void ignoreComments()
    {
        ++pos;
        while (!(program.charAt(pos) + "").equals("#"))
        {
            pos++;
        }
        ++pos;
        if (!done())
        {
            next();
        }
        else
        {
            noTokensFound = true;
        }
    }

    /**
     * Gives the parser access to know whether a program was simply comments or
     * had meaningful tokens
     *
     * @return - true if there were no tokens, false if there was
     */
    boolean getNoTokensFound()
    {
        return this.noTokensFound;
    }

    /**
     * This function scans through each character in the input program and
     * classifies it accordingly
     *
     * @return - returns false when the scanner is done scanning through the
     * input program
     */
    public boolean next()
    {
        if (done())
        {
            return false;
        }
        many(whitespace);
        String c = program.charAt(pos) + "";
        if (digits.contains(c))
        {
            nextNumber();
        }
        else if (letters.contains(c))
        {
            nextKwId();
        }
        else if (operators.contains(c))
        {
            nextOp();
        }
        else if (c.equals("#"))
        {
            ignoreComments();
        }
        else
        {
            System.err.println("illegal character at position " + pos);
            pos++;
            return next();
        }
        return true;
    }

    /**
     * Matches the current token that is being parsed and then prepares the next
     * token to operate on
     *
     * @param t
     * @throws SyntaxException
     */
    public void match(Token t) throws SyntaxException
    {
        if (!t.equals(curr()))
        {
            throw new SyntaxException(pos, t, curr());
        }
        next();
    }

    /**
     * @return - the current token
     */
    public Token curr()
    {
        return token;
    }

    /**
     * @return - the current position of the scanner
     */
    public int pos()
    {
        return pos;
    }

    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(args[0]);
        while (scanner.next())
        {
            System.out.println(scanner.curr());
        }
    }
}

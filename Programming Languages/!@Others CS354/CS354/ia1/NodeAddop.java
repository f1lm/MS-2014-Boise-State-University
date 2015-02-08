/**
 * 
 * Class that extends the Node class and adds functionality for addition operations.
 *
 */
public class NodeAddop extends Node {

    private String addop;

    /**
     * Constructor for NodeAddop
     * @param pos : current pos in the program string.
     * @param mulop : assigned addop.
     */
    public NodeAddop(int pos, String addop) {
	this.pos=pos;
	this.addop=addop;
    }

    /**
     * Evaluate the addition operator on two passed in ints.
     * @param o1 : first integer
     * @param o2 : second integer
     * @return result of addition operation.
     * @throws EvalException
     */
    public double op(double o1, double o2) throws EvalException {
	if (addop.equals("+"))
	    return o1+o2;
	if (addop.equals("-"))
	    return o1-o2;
	throw new EvalException(pos,"bogus addop: "+addop);
    }

}

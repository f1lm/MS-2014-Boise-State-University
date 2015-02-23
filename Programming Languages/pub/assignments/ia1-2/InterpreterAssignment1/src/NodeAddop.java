public class NodeAddop extends Node {

    private String addop;

    public NodeAddop(int pos, String addop) {
	this.pos=pos;
	this.addop=addop;
    }

    public double op(double d, double o2) throws EvalException {
	if (addop.equals("+"))
	    return d+o2;
	if (addop.equals("-"))
	    return d-o2;
	throw new EvalException(pos,"bogus addop: "+addop);
    }

}

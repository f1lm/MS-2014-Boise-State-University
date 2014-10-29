public class NodeRelop extends Node {

    private String relop;

    public NodeRelop(int pos, String relop) {
		this.pos=pos;
		this.relop=relop;
    }

    /**
     * Return the evaluation of the relational operation. return boolean values
     * as double values.
     * @param d1
     * @param d2
     * @return d1<d2 or d1<=d2 or d1>d2 or d1>=d2 or d1<>d2 or d1==d2
     * compare 1.0 for true and 0.0 for false
     */
    public double op(double d1, double d2) throws EvalException {
		if (relop.equals("<"))
		    return d1<d2 ? 1.0 : 0.0;
		if (relop.equals("<="))
			return d1<=d2 ? 1.0 : 0.0;
		if (relop.equals(">"))
		    return d1>d2 ? 1.0 : 0.0;
		if (relop.equals(">="))
			return d1>=d2 ? 1.0 : 0.0;
		if (relop.equals("<>"))
		    return d1!=d2 ? 1.0 : 0.0;
		if (relop.equals("=="))
			return d1==d2 ? 1.0 : 0.0;
		throw new EvalException(pos, "bogus relop: " + relop);
    }

}

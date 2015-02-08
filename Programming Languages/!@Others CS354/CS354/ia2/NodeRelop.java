/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Chad
 */
public class NodeRelop extends Node{
    private String relop;
    
    public NodeRelop(int pos, String relop) {
	this.pos=pos;
	this.relop=relop;
    }
    
    public double op(double o1, double o2) throws EvalException {
	if (relop.equals("<"))
        return (o1 < o2)==true ? 1.0 : 0.0;
    else if (relop.equals("<="))
        return (o1 <= o2)==true ? 1.0 : 0.0;
    else if (relop.equals(">"))
        return (o1 > o2)==true ? 1.0 : 0.0;
    else if (relop.equals(">="))
        return (o1 >= o2)==true ? 1.0 : 0.0;
    else if (relop.equals("<>"))
        return (o1 != o2)==true ? 1.0 : 0.0;
    else if (relop.equals("=="))
        return (o1 == o2)==true ? 1.0 : 0.0;
	else
            throw new EvalException(pos,"bogus relop: "+relop);
    }
}

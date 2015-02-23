/**
 * 
 *  * Class that extends the Node class and adds functionality for addition operations.
 *
 */
public class NodeMulop extends Node {

	private String mulop;

	/**
	 * Constructor for NodeMulop
	 * @param pos : current pos in the program string.
	 * @param mulop : assigned mulop.
	 */
	public NodeMulop(int pos, String mulop) {
		this.pos=pos;
		this.mulop=mulop;
	}

	/**
	 * Evaluate the multiplication operator on two passed in ints.
	 * @param o1 : first integer
	 * @param o2 : second integer
	 * @return result of multiplication operation.
	 * @throws EvalException
	 */
	public double op(double o1, double o2) throws EvalException {
		if (mulop.equals("*"))
			return o1*o2;
		if (mulop.equals("/"))
			return o1/o2;
		throw new EvalException(pos,"bogus mulop: "+mulop);
	}

}


/**
 * An node for and addop terminal, it will contain a plus or minus sign as its field value
 * @author buff
 */
public class NodeAddop extends Node
{

	private String addop;

	public NodeAddop(int pos, String addop)
	{
		this.pos = pos;
		this.addop = addop;
	}

	/**
	 * Performs either an addition or a subtraction depending on the field value
	 * @param o1 - a number contained in a fact
	 * @param o2 - a number contained in a fact
	 * @return - the sum or difference of the numbers
	 * @throws EvalException 
	 */
	public double op(double o1, double o2) throws EvalException
	{
		if (addop.equals("+"))
		{
			return o1 + o2;
		}
		if (addop.equals("-"))
		{
			return o1 - o2;
		}
		throw new EvalException(pos, "bogus addop: " + addop);
	}
}

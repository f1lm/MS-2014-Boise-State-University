
/**
 * An node for a mulop terminal, it will contain a * or a / sign as its field value
 * @author buff
 */
public class NodeMulop extends Node
{

	private String mulop;

	public NodeMulop(int pos, String mulop)
	{
		this.pos = pos;
		this.mulop = mulop;
	}

	/**
	 * Performs a multiplication or a division
	 * @param o1 - a number contained in a fact
	 * @param o2 - a number contained in a fact
	 * @return - the product or quotient of the numbers
	 * @throws EvalException 
	 */
	public double op(double o1, double o2) throws EvalException
	{
		if (mulop.equals("*"))
		{
			return o1 * o2;
		}
		if (mulop.equals("/"))
		{
			return o1 / o2;
		}
		throw new EvalException(pos, "bogus mulop: " + mulop);
	}
}

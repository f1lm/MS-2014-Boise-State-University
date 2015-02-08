/**
 * A node for storing numbers, when I made this I thought it was going to be more useful than it was...
 * @author reuben
 */
public class NodeNum extends Node
{
	private String digit;
	NodeUnary unary;
	
	public NodeNum(String digit)
	{
		this.digit=digit;
	}
	
	/**
	 * Evaluates the nodeNum by transforming it into a positive or negative number
	 * @param env
	 * @return
	 * @throws EvalException 
	 */
	@Override
	public Double eval(Environment env) throws EvalException
	{
		return Double.parseDouble(unary == null ? digit : "-"+digit);
	}

	/**
	 * If a unary is applicable it can be set here
	 * @param unary 
	 */
	public void setUnary(NodeUnary unary)
	{
		this.unary=unary;
	}
}

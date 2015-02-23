/**
 * Node containing a unary value, this node only needs to be constructed if there is a unary minus involved, unary plus handled via null
 * @author reuben
 */
public class NodeUnary extends Node
{
	private String unaryMinus;

	public NodeUnary(String unaryMinus)
	{
		this.unaryMinus = unaryMinus;
	}

	/**
	 * Simply for the abstract implementation's sake
	 * @param env
	 * @return
	 * @throws EvalException 
	 */
	@Override
	public Double eval(Environment env) throws EvalException
	{
		return env.put(unaryMinus, pos);
	}
}

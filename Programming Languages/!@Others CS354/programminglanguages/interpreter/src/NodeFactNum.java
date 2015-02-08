
/**
 * A "fact" terminal containing a number
 * @author buff
 */
public class NodeFactNum extends NodeFact
{

	private NodeNum num;

	public NodeFactNum(NodeNum num)
	{
		this.num = num;
	}	

	/**
	 * Evaluates the fact number by obtaining its integer value
	 * @param env - the environment being
	 * @return
	 * @throws EvalException 
	 */
	public Double eval(Environment env) throws EvalException
	{
		return num.eval(env);
	}
}

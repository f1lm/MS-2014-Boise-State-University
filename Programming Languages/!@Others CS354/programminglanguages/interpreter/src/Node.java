/**
 * The base class for all the nodes parsed by the parser
 * @author buff
 */
public abstract class Node {

    protected int pos=0;

	/**
	 * The function which all other nodes implement to perform whatever evaluation is necessary for their type
	 * @param env - the stored variables and such
	 * @return - the value of the evaluation, a double in our math language
	 * @throws EvalException 
	 */
    public Double eval(Environment env) throws EvalException {
	throw new EvalException(pos,"cannot eval() node!");
    }
}

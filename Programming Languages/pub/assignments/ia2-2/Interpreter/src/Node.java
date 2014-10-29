public abstract class Node {

	protected int pos = 0; //position

  	/**
     * Throw an error message at a position
     * @param env
     * @return
     * @throws EvalException
     */
	public double eval(Environment env) throws EvalException {
		throw new EvalException(pos, "cannot eval() node!");
	}

}

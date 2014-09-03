public abstract class Node {

    protected int pos=0;

    public int eval(Environment env) throws EvalException {
	throw new EvalException(pos,"cannot eval() node!");
    }

}

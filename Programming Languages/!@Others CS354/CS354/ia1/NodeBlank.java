/**
 * 
 * Blank node class.
 *
 */
public class NodeBlank extends Node {

	public double eval(Environment env) throws EvalException {
		throw new EvalException(-1,"Comment Detected!");
	}
}

public class NodeBeginEnd extends NodeStmt {

	private NodeBlock block;
	
	/**
	 * Constructor
	 * @param block
	 */
	public NodeBeginEnd(NodeBlock block) {
		this.block = block;
	}
	
	/**
	 * Evaluate the begin-end Statement.
	 */
	public double eval(Environment env) throws EvalException {
		return block.eval(env);
	}
	
}

public class NodeBlock extends Node {

    private NodeStmt stmt;
    private NodeBlock block;
	
    /**
     * Constructor.
     * @param stmt
	 * @param block
     */
    public NodeBlock(NodeStmt stmt, NodeBlock block) { 
    	this.stmt = stmt;
    	this.block = block;
    }
	
	/**
	 * Evaluate the Block
	 */
	public double eval(Environment env) throws EvalException {
		stmt.eval(env);
		if (block!=null)
			return block.eval(env);
		return 0.0;
	}
	
}

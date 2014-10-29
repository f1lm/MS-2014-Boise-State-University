public class NodeProg extends Node {
	
	private NodeBlock block;

    /**
     * Constructor
     * @param block
     */
    public NodeProg(NodeBlock block) {
    	this.block=block;
    }

    /**
     * Evaluate the Statement
     */
    public double eval(Environment env) throws EvalException {
    	if(block==null)
    		return 0;
    	return block.eval(env);
    }
	
}

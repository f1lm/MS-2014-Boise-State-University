public class NodeWhileDo extends NodeStmt {

	private NodeBoolExpr boolexpr;
	private NodeStmt stmt;
	

	public NodeWhileDo(NodeBoolExpr boolexpr, NodeStmt stmt) {
		this.boolexpr = boolexpr;
		this.stmt = stmt;
	}
	
	/**
	 * Evaluate the while boolexpr do stmt block.
	 */
	public double eval(Environment env) throws EvalException {
		while(boolexpr.eval(env)==1.0)
			stmt.eval(env);
		return 0;
	}
	
}

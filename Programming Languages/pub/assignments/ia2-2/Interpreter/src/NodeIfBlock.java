public class NodeIfBlock extends NodeStmt {

	private NodeBoolExpr boolexpr;
	private NodeStmt stmt1;
	private NodeStmt stmt2;
	
	public NodeIfBlock(NodeBoolExpr boolexpr, NodeStmt stmt1, NodeStmt stmt2) {
		this.boolexpr = boolexpr;
		this.stmt1 = stmt1;
		this.stmt2 = stmt2;
	}
	
	/**
	 * Evaluate if-then-else
	 */
	public double eval(Environment env) throws EvalException {
		if (boolexpr.eval(env)==1.0)
			return stmt1.eval(env);
		if (stmt2!=null)
			return stmt2.eval(env);
		return 0;
	}
	
}

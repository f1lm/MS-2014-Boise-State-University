public class NodeStmtWrite extends NodeStmt {

	private NodeExpr expr;
	
	public NodeStmtWrite(NodeExpr expr) {
		this.expr = expr;
	}
	
	public double eval(Environment env) throws EvalException {
		System.out.println(expr.eval(env));
		return 0;
	}

}

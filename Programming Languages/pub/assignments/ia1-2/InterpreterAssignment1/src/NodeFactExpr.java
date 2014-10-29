public class NodeFactExpr extends NodeFact {

	private NodeExpr expr;
	private boolean negative = false;

	public NodeFactExpr(NodeExpr expr) {
		this.expr = expr;
	}

	public NodeFactExpr(NodeExpr expr2, boolean b) {
		this.expr = expr2;
		this.negative = b;
	}

	public double eval(Environment env) throws EvalException {
		if (negative) {
			return - expr.eval(env);
		}
		return expr.eval(env);
	}

}

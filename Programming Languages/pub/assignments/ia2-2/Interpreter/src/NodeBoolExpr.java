public class NodeBoolExpr {

    private NodeRelop relop;
    private NodeExpr expr1;
    private NodeExpr expr2;
	
	public NodeBoolExpr(NodeRelop relop, NodeExpr expr1, NodeExpr expr2) {
		this.relop = relop;
		this.expr1 = expr1;
		this.expr2 = expr2;
	}

    /**
     * Evaluate the boolean expr
     */
    public double eval(Environment env) throws EvalException {
		return relop.op(expr1.eval(env), expr2.eval(env));
    }
	
}

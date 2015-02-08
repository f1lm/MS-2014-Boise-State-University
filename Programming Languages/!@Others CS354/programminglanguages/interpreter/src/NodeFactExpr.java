/**
 * A node for the "fact" terminal of the grammar containing an expression
 * @author reuben
 */
public class NodeFactExpr extends NodeFact {

    private NodeExpr expr;
	private NodeUnary unary;

    public NodeFactExpr(NodeExpr expr) {
	this.expr=expr;
    }

	public NodeFactExpr(NodeExpr expr, NodeUnary unary)
	{
		this.expr=expr;
		this.unary=unary;
	}

	/**
	 * Evaluates the fact expression in the same way typical expressions are evaluated
	 * @param env - the environment that is being operated on
	 * @return - either the value of the term or the value of whatever may be contained in it: an id, number or expression 
	 * @throws EvalException 
	 */
    public Double eval(Environment env) throws EvalException {
		return unary == null? expr.eval(env) : -1*expr.eval(env);
    }

}


/**
 * The "expr" terminal node. This node is one of the higher level data types in
 * the grammar which contains terms, addops and exprs
 *
 * @author buff
 */
public class NodeExpr extends Node {

    private NodeTerm term;
    private NodeAddop addop;
    private NodeExpr expr;

    public NodeExpr(NodeTerm term, NodeAddop addop, NodeExpr expr)
    {
        this.term = term;
        this.addop = addop;
        this.expr = expr;
    }

    /**
     * This function allows an expression to contain another expression
     *
     * @param expr - the expression to combine with the called expression
     */
    public void append(NodeExpr expr)
    {
        if (this.expr == null)
        {
            this.addop = expr.addop;
            this.expr = expr;
            expr.addop = null;
        }
        else
        {
            this.expr.append(expr);
        }
    }

    /**
     * Evaluates the expression
     *
     * @param env - the environment that is being operated on
     * @return - either the value of the term or the value of whatever may be
     * contained in it: an id, number or expression
     * @throws EvalException
     */
    @Override
    public Double eval(Environment env) throws EvalException
    {
        return expr == null
            ? term.eval(env)
            : addop.op(expr.eval(env), term.eval(env));
    }
}

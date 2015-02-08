
/**
 * A node for storing assignments that are found in statements
 *
 * @author buff
 */
public class NodeAssn extends Node {

    private String id;
    private NodeExpr expr;

    public NodeAssn(String id, NodeExpr expr)
    {
        this.id = id;
        this.expr = expr;
    }
    
    public String getId()
    {
        return this.id;
    }

    /**
     * Evaluates the given assignment
     *
     * @param env - the environment which contains the variables being operated
     * on
     * @return - perhaps some kind of id from the environment
     * @throws EvalException
     */
    public Double eval(Environment env) throws EvalException
    {
        env.put(id, expr.eval(env));
        return null;
    }
}


/**
 * A node containing the assignment terminal inside of a statement of the grammar
 *
 * @author buff
 */
public class NodeStmtAssn extends NodeStmt {

    private NodeAssn assn;
    private boolean terminated;

    public NodeStmtAssn(NodeAssn assn)
    {
        this.assn = assn;
    }

    /**
     * Evaluates the contained assignment
     *
     * @param env - the environment which contains the variables being operated
     * on
     * @return - perhaps some kind of id from the environment
     * @throws EvalException
     */
    public Double eval(Environment env) throws EvalException
    {
         assn.eval(env);
         return null;
    }
}

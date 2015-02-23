/**
 * A node for a while statement
 * @author reuben
 */
public class NodeStmtWhile extends NodeStmt {
    private BoolExpr boolExpr;
    private NodeStmt stmt;

    public NodeStmtWhile(BoolExpr boolExpr, NodeStmt stmt)
    {
        this.boolExpr = boolExpr;
        this.stmt = stmt;
    }
    
    /**
     * Evaluates the while statement
     * @param env
     * @return - nothing, this evaluation simply performs the stmt it was created with
     * @throws EvalException 
     */
    public Double eval(Environment env) throws EvalException
    {
        while (boolExpr.eval(env))
        {
            stmt.eval(env);
        }
        return null;
    }
}

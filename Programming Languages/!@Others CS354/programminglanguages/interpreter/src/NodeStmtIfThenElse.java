/**
 * A node for if then else statements
 * @author reuben
 */
public class NodeStmtIfThenElse extends NodeStmt {
    private BoolExpr bexpr;
    private NodeStmt ifThenStmt;
    private NodeStmt elseStmt;
    
    public NodeStmtIfThenElse(BoolExpr bexpr, NodeStmt ifThenStmt, NodeStmt elseStmt)
    {
        this.bexpr = bexpr;
        this.ifThenStmt = ifThenStmt;
        this.elseStmt = elseStmt;
    }
    
    /**
     * Evaluates the if then else statement
     * @param env
     * @return the evaluation of either the if or the else
     * @throws EvalException 
     */
    public Double eval(Environment env) throws EvalException
    {
        if (bexpr.eval(env))
        {
            return ifThenStmt.eval(env);
        } 
        else
        {
            return elseStmt.eval(env);
        }
    }
}

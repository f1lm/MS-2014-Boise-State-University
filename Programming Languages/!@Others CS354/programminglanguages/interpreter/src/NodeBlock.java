
import java.util.LinkedList;
import java.util.List;

/**
 * A node representing a block which contains a series of ; separated statements followed by a non ; terminated statement
 * @author reuben
 */
class NodeBlock extends NodeStmt {
    List<NodeStmt> statements = new LinkedList<NodeStmt>();
    
    public NodeBlock(List<NodeStmt> statements)
    {
        this.statements = statements;
    }
    
    /**
     * Evaluates the contain statements sequentially
     * @param env - the environment which contains the variables being operated on
     * @throws EvalException 
     */
    public Double eval(Environment env) throws EvalException
    {
        for (NodeStmt nodeStmt : statements)
        {
            nodeStmt.eval(env);
        }
        return null;
    }
}

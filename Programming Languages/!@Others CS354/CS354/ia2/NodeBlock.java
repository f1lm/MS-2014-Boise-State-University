/**
 *
 * @author Chad
 */

public class NodeBlock extends Node{
    private NodeStmt stmt;
    private NodeBlock block;

    public NodeBlock(NodeStmt stmt) {
	    this.stmt=stmt;
    }

    public NodeBlock(NodeStmt stmt, NodeBlock block) {
        this.stmt = stmt;
        this.block = block;
    }

    public double eval(Environment env) throws EvalException {
        if (block == null) {
            return stmt.eval(env);
        }
        else {
            stmt.eval(env);
            return block.eval(env);
        }
    }
}

/**
 * Created with IntelliJ IDEA.
 * User: chadweigle
 * Date: 10/30/13
 * Time: 1:08 PM
 * To change this template use File | Settings | File Templates.
 */
public class NodeStmtBegin extends NodeStmt {
    private NodeBlock block;

    public NodeStmtBegin(NodeBlock block) {
        this.block=block;
    }

    public double eval(Environment env) throws EvalException {
        return block.eval(env);
    }
}

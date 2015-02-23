/**
 * Created with IntelliJ IDEA.
 * User: chadweigle
 * Date: 10/30/13
 * Time: 11:10 AM
 * To change this template use File | Settings | File Templates.
 */
public class NodeStmtAssn extends NodeStmt{
    private NodeAssn assn;

    public NodeStmtAssn(NodeAssn assn) {
        this.assn=assn;
    }

    public double eval(Environment env) throws EvalException {
        return assn.eval(env);
    }
}

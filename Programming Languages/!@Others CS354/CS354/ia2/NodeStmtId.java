/**
 * Created with IntelliJ IDEA.
 * User: chadweigle
 * Date: 10/30/13
 * Time: 1:45 PM
 * To change this template use File | Settings | File Templates.
 */
public class NodeStmtId extends NodeStmt {
    private NodeFact id;

    public NodeStmtId(NodeFact id) {
        this.id = id;
    }

    public double eval(Environment env) throws EvalException {
        System.out.println(id.eval(env));
        return id.eval(env);
    }
}

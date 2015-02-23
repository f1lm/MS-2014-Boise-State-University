/**
 * Created with IntelliJ IDEA.
 * User: chadweigle
 * Date: 10/30/13
 * Time: 4:13 PM
 * To change this template use File | Settings | File Templates.
 */
public class NodeStmtWhile extends NodeStmt {
    private NodeBoolExpr boolExpr;
    private NodeStmt doStmt;

    public NodeStmtWhile(NodeBoolExpr boolExpr, NodeStmt doStmt) {
        this.boolExpr = boolExpr;
        this.doStmt = doStmt;
    }

    public double eval(Environment env) throws EvalException {
        while(boolExpr.eval(env) == 1) {
            doStmt.eval(env);
        }
        return 0;
    }

}

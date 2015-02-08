/**
 * Created with IntelliJ IDEA.
 * User: chadweigle
 * Date: 10/30/13
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */
public class NodeStmtIf extends NodeStmt {
    private NodeBoolExpr boolExpr;
    private NodeStmt thenStmt;
    private NodeStmt elseStmt;

    public NodeStmtIf(NodeBoolExpr boolExpr, NodeStmt thenStmt, NodeStmt elseStmt) {
        this.boolExpr = boolExpr;
        this.thenStmt = thenStmt;
        this.elseStmt = elseStmt;
    }

    public NodeStmtIf(NodeBoolExpr boolExpr, NodeStmt thenStmt) {
        this.boolExpr = boolExpr;
        this.thenStmt = thenStmt;
    }

    public double eval(Environment env) throws EvalException {
        if(boolExpr.eval(env) == 1) {
            return thenStmt.eval(env);
        }
        else {
            if (this.elseStmt != null) {
                return elseStmt.eval(env);
            }
            else {
                return 0;
            }
        }
    }
}

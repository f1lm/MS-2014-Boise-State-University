/**
 * Created with IntelliJ IDEA.
 * User: chadweigle
 * Date: 10/30/13
 * Time: 10:59 AM
 * To change this template use File | Settings | File Templates.
 */
public class NodeStmtExpr extends NodeStmt {
    private NodeExpr expr;

    public NodeStmtExpr(NodeExpr expr) {
        this.expr=expr;
    }

    public double eval(Environment env) throws EvalException {
        System.out.println(expr.eval(env));
        return expr.eval(env);
    }
}

/**
 * NodeBoolExpr.java
 * @author Chad Weigle
 */
public class NodeBoolExpr extends NodeStmt {
    private NodeExpr leftExpr;
    private NodeRelop relop;
    private NodeExpr rightExpr;
    
    public NodeBoolExpr(NodeExpr leftExpr, NodeRelop relop, NodeExpr rightExpr) {
	this.leftExpr = leftExpr;
	this.relop=relop;
	this.rightExpr=rightExpr;
    }

    public double eval(Environment env) throws EvalException {
        if(leftExpr == null || rightExpr == null || relop == null) {
            throw new EvalException(pos, "Cannot eval() bool statement with null expr/relop.");
        }
        else {
            return relop.op(leftExpr.eval(env), rightExpr.eval(env));
        }
    }
    
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Chad
 */
public class NodeProg extends Node{
    private NodeBlock block;

    public NodeProg(NodeBlock block) {
	this.block=block;
    }

    public double eval(Environment env) throws EvalException {
	return block.eval(env);
    }
}


/**
 * The "term" terminal node. This node is one of the higher level data types in
 * the grammar which contains facts, mulops and terms
 *
 * @author buff
 */
public class NodeTerm extends Node {

    private final NodeFact fact;
    private NodeMulop mulop;
    private NodeTerm term;

    public NodeTerm(NodeFact fact, NodeMulop mulop, NodeTerm term)
    {
        this.fact = fact;
        this.mulop = mulop;
        this.term = term;
    }

    /**
     * This function allows a term to contain another term
     *
     * @param term - the term to combine with the called term
     */
    public void append(NodeTerm term)
    {
        if (this.term == null)
        {
            this.mulop = term.mulop;
            this.term = term;
            term.mulop = null;
        }
        else
        {
            this.term.append(term);
        }
    }

    /**
     * Performs the multiplication or division
     *
     * @param env - the environment being operated on
     * @return - the value of the operation
     * @throws EvalException
     */
    @Override
    public Double eval(Environment env) throws EvalException
    {
        return term == null
            ? fact.eval(env)
            : mulop.op(term.eval(env), fact.eval(env));
    }

}

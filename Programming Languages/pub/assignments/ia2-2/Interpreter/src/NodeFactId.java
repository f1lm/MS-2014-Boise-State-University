public class NodeFactId extends NodeFact {

	private String id;
	private boolean negative = false;

	public NodeFactId(int pos, String id) {
		this.pos = pos;
		this.id = id;
	}

	public NodeFactId(int pos, String lex, boolean b) {
		this.pos = pos;
		this.id = lex;
		this.negative = b;
	}

	public double eval(Environment env) throws EvalException {
		if (negative) {
			return - env.get(pos, id);
		}
		return env.get(pos, id);
	}

}

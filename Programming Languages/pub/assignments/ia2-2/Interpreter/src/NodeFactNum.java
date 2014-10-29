public class NodeFactNum extends NodeFact {

	private String num;
	private boolean negative = false;

	public NodeFactNum(String num) {
		this.num = num;
	}

	public NodeFactNum(String lex, boolean b) {
		this.num = lex;
		this.negative = b;
	}

	public double eval(Environment env) throws EvalException {
		if (negative) {
			return - Double.parseDouble(num);
		}
		return Double.parseDouble(num);
	}

}

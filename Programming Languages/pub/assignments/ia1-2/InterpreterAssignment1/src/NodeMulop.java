public class NodeMulop extends Node {

	private String mulop;

	public NodeMulop(int pos, String mulop) {
		this.pos = pos;
		this.mulop = mulop;
	}

	public double op(double d, double e) throws EvalException {
		if (mulop.equals("*"))
			return d * e;
		if (mulop.equals("/"))
			return d / e;
		throw new EvalException(pos, "bogus mulop: " + mulop);
	}

}

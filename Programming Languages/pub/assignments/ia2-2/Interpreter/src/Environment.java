import java.util.HashMap;

public class Environment {

	HashMap<String, Double> valueMap = new HashMap<String, Double>();

	public double put(String var, double d) {
		valueMap.put(var, d);
		return d;
	}

	public double get(int pos, String var) throws EvalException {
		Double val = valueMap.get(var);
		if (val != null) {
			return val;
		} else {
			throw new EvalException(pos, "eval error pos= " + pos + ", " + var
					+ " is not defined");
		}
	}

}

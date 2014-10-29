public class Interpreter {

	public static void main(String[] args) {
		Parser parser = new Parser();
		Environment env = new Environment();
		for (String stmt : args)
			try {
				System.out.println(parser.parse(stmt).eval(env));
			} catch (SyntaxException e) {
				System.err.println(e);
			} catch (EvalException e) {
				System.err.println(e);
			}
	}

}

public class Interpreter {

	public static void main(String[] args) {
		Parser parser = new Parser();
    	Environment env=new Environment();
    	String str = ""; 
		for (String prog : args){
			if (!(prog.startsWith("[")&&prog.endsWith("]"))) {
    			str += " ";
    			str += prog;
    		}
		}
		java.util.Scanner scan = new java.util.Scanner(System.in);
			try {
			NodeProg node = (NodeProg) (parser.parse(str.trim(), scan));
			if (node!=null) {
				node.eval(env);
				//System.out.println(parser.parse(stmt).eval(env));
			}
			} catch (SyntaxException e) {
				System.err.println(e);
			} catch (EvalException e) {
				System.err.println(e);
		}
		scan.close();
	}

}

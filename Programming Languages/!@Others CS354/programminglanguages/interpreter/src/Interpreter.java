
/**
 * The driver class for running the interpreter on an input program
 *
 * @author buff
 */
public class Interpreter {

    /**
     * The driver function
     *
     * @param args - the source program broken up
     */
    public static void main(String[] args)
    {
        Parser parser = new Parser();
        Environment env = new Environment();
        for (String prog : args)
        {
            try
            {
                Node node = parser.parse(prog);
                Double evaluation;
                System.out.print(node == null ? "" : (evaluation= node.eval(env)) == null ? "" : evaluation + "\n");
            }
            catch (EvalException | SyntaxException e)
            {
                System.err.println(e);
            }
        }
    }
}

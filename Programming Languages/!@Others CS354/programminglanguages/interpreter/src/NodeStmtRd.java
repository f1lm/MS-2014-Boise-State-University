
import java.util.Scanner;

/**
 * A node for a read statement
 * @author reuben
 */
public class NodeStmtRd extends NodeStmt {
    private String id;

    public NodeStmtRd(String id)
    {
        this.id = id;
    }
    
    /**
     * Evaluates the read statement. The read only accepts double values into the variable.
     *
     * @param env - the environment which contains the variables being operated on
     * @return - previous value of variable being read, returns 0 if variable is new
     * @throws EvalException
     */
    @Override
    public Double eval(Environment env) throws EvalException
    {
        Scanner scanner = new Scanner(System.in);
        Double value = null;
        while (value == null)
        {
            try
            {
                System.out.println(String.format("Enter value to store in %s: ", id));
                value = Double.parseDouble(scanner.nextLine());
            }
            catch(NumberFormatException e)
            {
                System.out.println("The value you entered could not be parsed as a double, please try again");
            }
        }
        return env.put(id, value);
    }
}

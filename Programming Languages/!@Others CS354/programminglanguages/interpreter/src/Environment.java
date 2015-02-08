
import java.util.HashMap;
import java.util.Map;

/**
 * A stubbed class that will probably store assigned variables and such in the future
 * @author reuben
 */
public class Environment {
    private Map<String, Double> symbolTable = new HashMap<>();
    /**
     * Put a variable into the environment
     * @param var - the var
     * @param val - it's value
     * @return - ?
     */
    public double put(String var, double val) 
    {
        Double prevVal = symbolTable.put(var, val);
        return prevVal == null ? 0 : prevVal;
    }
    /**
     * Gets a variable from the environment
     * @param pos - the position of the scanner/parser where the variable should be
     * @param var - the variable name
     * @return - probably the variable
     * @throws EvalException 
     */
    public double get(int pos, String var) throws EvalException 
    {
        return symbolTable.get(var);
    }

}

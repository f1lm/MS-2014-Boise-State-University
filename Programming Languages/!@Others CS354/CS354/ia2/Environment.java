import java.util.ArrayList;

public class Environment {
    private ArrayList<String> varNames= new ArrayList<String>();
    private ArrayList<Double> varValues= new ArrayList<Double>();

    public double put(String var, double val) {
        int index;
        if((index = varNames.indexOf(var)) >= 0) {
            varValues.set(index, val);
        }
        else {
            varNames.add(var);
            varValues.add(val);
        }
        return val;
    }
    public double get(int pos, String var) throws EvalException {
        if(varNames.indexOf(var) < 0) {
            throw new EvalException(pos, "Variable not found: " + var);
        }
        return varValues.get(varNames.indexOf(var));
    }

}

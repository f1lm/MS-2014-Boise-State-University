// javac Excep.java && java Excep

class ArgsException extends Exception {
    private String msg;
    public ArgsException(String msg) { this.msg=msg; }
    public String toString()         { return msg; }
}

public class Excep {

    static void foo(int i) throws ArgsException {
	if (i<1)
	    throw new ArgsException("too few args");
	// much more code
	System.err.println("foo() done");
    }

    public static void main(String[] args) {
	try {
	    foo(args.length);
	    // much more code
	    System.err.println("ok");
	} catch (ArgsException e) {
	    System.err.println("not ok: "+e);
	}
    }

}

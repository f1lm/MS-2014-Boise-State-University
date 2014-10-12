// Example 6.14
// Will compile without error with the "-source 1.3" option to javac.

import java.io.*;
import java.util.Hashtable;

public class Wrap {

public static void main(String args[])
{
    Hashtable ht = new Hashtable();

    Integer N = new Integer(13);        // Integer is a "wrapper" class
    ht.put(N, new Integer(31));
    Integer M = (Integer) ht.get(N);
    int m = M.intValue();

    System.out.println(m);              // prints 31
}

};

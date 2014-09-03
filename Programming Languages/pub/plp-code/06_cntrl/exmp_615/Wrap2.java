// Example 6.15

import java.io.*;
import java.util.Hashtable;

public class Wrap2 {

public static void main(String args[])
{
    Hashtable ht = new Hashtable();
        // In Java 5 all library collections (containers) are generic,
        // and must hold objects of only one type (or its descendants).
        // Variable ht, however, is declared without generic arguments
        // so the compiler doesn't know what that type is.  In Java 5
        // terminology, ht has a "raw" type.

    ht.put(13, 31);
        // This statement produces an "unchecked" warning.  Because the
        // compiler does not know the type of objects held in ht, it can't
        // tell whether the Integers we're passing in are of the correct
        // type.  The program does, however, perform correctly.
    int m = (Integer) ht.get(13);

    System.out.println(m);              // prints 31
}
};

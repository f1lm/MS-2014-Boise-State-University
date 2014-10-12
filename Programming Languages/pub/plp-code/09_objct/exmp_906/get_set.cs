// Example 9.06

using System;

class list_node {
    // ...
    int val;                // val (lower case 'v') is private
    public int Val {
        get {               // presence of get accessor and optional
            return val;     // set accessor means that Val is a property
        }
        set {
            val = value;    // value is a keyword: argument to set
        }
    }
    // ...
}

public class get_set {
    public static void Main(string[] args) {
        list_node ln = new list_node();
        ln.Val = 3;
        Console.WriteLine(ln.Val);
    }
}

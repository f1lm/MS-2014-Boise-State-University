// Exercise 7.32

using System;
using System.Collections.Generic;

public class Csharp_types {
    public static void Main(string[] args) {
        var i = 123;        // equivalent to int i = 123;
        Console.WriteLine(i);
        var map = new Dictionary<int, string>();
            // equivalent to Dictionary<int, string> map
            //  = new Dictionary<int, string>();
        map.Add(3, "foo");
        string s = null;
        map.TryGetValue(3, out s);
        Console.WriteLine(s);
    }
}

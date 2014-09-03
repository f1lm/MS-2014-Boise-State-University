// Example 12.9

// Under Mono 2.2, this needs to be compiled with 
//      gmcs -r:System.Threading.dll parfor.cs
// It has been tested with the version of System.Threading from the 2008
// Google Summer of Code.

using System;
using System.Threading;

public class ParFor {
    public static void Main(string[] args) {
        Parallel.For(0, 3, i => {
            Console.WriteLine("Thread " + i + " here");
        });
    }
}

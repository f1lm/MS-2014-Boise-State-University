// Example 12.49

// Under Mono 2.2, this needs to be compiled with 
//      gmcs -r:System.Threading.dll parfor.cs
// It has been tested with the version of System.Threading from the 2008
// Google Summer of Code.

using System;
using System.Threading.Tasks;

class Product {
    string name;
    int count;

    public Product(string n, int c) { name = n; count = c; }

    string GetDescription() { return name; }
    int GetInventory() { return count; }

    public void PrintInfo() {
        var description = Future.Create(() => GetDescription());
        var numberInStock = Future.Create(() => GetInventory());

        Console.WriteLine("We have " + numberInStock.Value
            + " copies of " + description.Value + " in stock");
    }
}

public class Futures {
    
    public static void Main(string[] args) {
        Product myProduct = new Product("foo", 3);
        myProduct.PrintInfo();
    }
}

// Example 15.4

using System;

class Node<T> {
    public T val;
    public Node<T> next;
}

public class Reflect {
    public static void Main(string[] args) {
        Node<int> n = new Node<int>();

        Console.WriteLine(n.GetType().ToString());
    }
}

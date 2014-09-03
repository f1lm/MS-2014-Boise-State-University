// Example 7.42

class T {
    public int j;
}

class S {
    public int i;
    public T n;
}

public class Nested {
    public static void main(String[] args) {
        S s1 = new S();
        s1.n = new T();                 // fields initialized to 0
        S s2 = s1;
        s2.n.j = 7;
        System.out.println(s1.n.j);     // prints 7
    }
}

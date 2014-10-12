// CD Examples 3.51 and 3.52
// compile with javac -classpath . bar3.java

import foo.*;
public class bar3 {
    public static void main(String[] args) {
        foo_type_1 my_first_obj = new foo_type_1();
        System.out.println(my_first_obj.n + 3);
    }
}

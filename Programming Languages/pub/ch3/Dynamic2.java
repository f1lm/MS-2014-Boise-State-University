public class Dynamic2 {

    private static int i=1;

    private static void f() {
	i=2;
    }

    private static void g() {
	int i;
	f();
    }

    public static void main(String[] args) {
	g();
	System.out.println(i);	// 1
	f();
	System.out.println(i);	// 2
    }

}

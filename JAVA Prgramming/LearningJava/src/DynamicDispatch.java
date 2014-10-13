public class DynamicDispatch {

	public static void main(String args[]) {
		A obj1 = new A();
		B obj2 = new B();
		A r;
		r = obj1;
		r.display();
		r = obj2;
		r.display();
	}
}
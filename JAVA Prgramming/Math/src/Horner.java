import java.util.Scanner;

//http://mathfaculty.fullerton.edu/mathews/n2003/HornerMod.html
public class Horner {
	private int sum;

	/** constructor **/
	public Horner(int[] cof, int x) {
		sum = 0;
		calcSum(cof, x, cof.length - 1);
		display();
	}

	/** Calculate sum **/
	private void calcSum(int[] cof, int x, int N) {
		sum = cof[N] * x;
		for (int i = N - 1; i >= 1; i--)
			sum = (sum + cof[i]) * x;
		sum += cof[0];
	}

	public void display() {
		System.out.println("Evaluated sum = " + sum);
	}

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		System.out.println("Horner Algorithm Test");
		System.out.println("Enter highest power : ");
		int n = input.nextInt();
		int[] arr = new int[n + 1];
		System.out.println("Enter " + (n + 1)
				+ " coefficients in increasing order");
		for (int i = 0; i <= n; i++) {
			arr[i] = input.nextInt();
		}
		System.out.println("Enter x : ");
		int x = input.nextInt();
		Horner h = new Horner(arr, x);
	}
}

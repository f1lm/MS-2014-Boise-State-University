package Largest;

import java.util.Scanner;

public class App {

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		System.out.println("Enter array size : ");
		int n = input.nextInt();
		int a[] = new int[n];
		System.out.println("Enter the values of array : ");
		for (int i = 0; i < n; i++) {
			a[i] = input.nextInt();
		}
		int i, big, small;
		big = a[0];
		for (i = 1; i < n; i++) {
			if (big < a[i])
				big = a[i];
		}
		System.out.println("Largest element: " + big);
		small = a[0];
		for (i = 1; i < n; i++) {
			if (small > a[i])
				small = a[i];
		}
		System.out.println("Smallest element: " + small);
	}
}

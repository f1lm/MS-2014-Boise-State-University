import java.util.Scanner;

public class MoodyMenu {

	public static void main(String[] args) {

		
		
		int m=0;
		while (m >= 0) {

			System.out
					.println("{Please choose your current mood by number or -1 to exit");
			for (Mood mood : Mood.values()) {

				System.out.println(mood.ordinal() + ") " + mood);
			}
			Scanner scan = new Scanner(System.in);
			System.out.println("Enter Mood number = ");
			m = scan.nextInt();
			switch (m) {
			case 0:
				System.out.println("It's when my program works correctly! ");
				break;
			case 1:
				System.out.println("It is a exicement to do this code");
				break;
			case 2:
				System.out.println("It is a dispair");
				break;
			case 3:
				System.out.println("Confusion comes along");
				break;
			case 4:
				System.out.println("Watch out Muggles! I am learning to code!");
				break;
			case 5:
				System.out.println("It is bore to make repition");
				break;
			case 6:
				System.out.println("wow awesome");
				break;
			case -1:
				System.out.println("Stop!");
				break;

			default:
				System.out.println("Invalid choice! Please try again.");
			}
		}
	}
}

public class MyNameIs {
	public static void main(String[] args)

{
		Scanner scan= new Scanner(System.in);
		
		String firstName;
        System.out.println("Please enter your first name :");
        firstName=scan.next();
        
        String lastName;
        System.out.println("Please enter your last name :");
        lastName=scan.next();
        
        double number;
        System.out.println("Please enter a number:");
        number=scan.nextDouble();
        
        double number2;
        DecimalFormat df= new DecimalFormat("#.##");
        System.out.println("Please a number between 0 and 1 :");
        number2=scan.nextDouble();
        
        System.out.println("Hi, my name is " + firstName+" "+ lastName);
        System.out.println("You'll find me under " +"\"" + lastName + " , " + firstName +"\".");
        
        NumberFormat fmt1=NumberFormat.getPercentInstance();
        
        System.out.println("I know that " + fmt1.format(number2) + " of " + number + " is " + df.format(number2*number));
        System.out.println("I also know that "+number+" raise to the power of "+number2+" is "+df.format(Math.pow(number,number2)));
	
}	
}

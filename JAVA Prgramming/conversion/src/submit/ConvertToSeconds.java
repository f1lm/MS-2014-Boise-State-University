package submit;

import java.util.Scanner;

/*
 * Converting hours and minutes to seconds
 */
public class ConvertToSeconds {
public static void main(String[] args)
{
    Scanner scan=new Scanner(System.in);
    System.out.println("hours");
    int hours=scan.nextInt();  //defining hours
    
    System.out.println("minutes");
    int minutes = scan.nextInt(); //defining minutes
    
    System.out.println("seconds");
    int seconds = scan.nextInt();//defining seconds
    
   
    final int CONVERSION_FACTOR = 3600 ;
    
    int hoursToseconds = hours * CONVERSION_FACTOR ;
    
    final int CONVERSION_FACTOR1 = 60 ;
    
    int minutesToseconds = minutes* CONVERSION_FACTOR1 ;
    
     System.out.println(hoursToseconds+minutesToseconds+seconds);
     
     
    
    
    
    
    
    
    
	
	

}
}

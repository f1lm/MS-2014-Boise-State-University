import java.util.Scanner;

/*
 * Convert Seconds to hours, minute and seconds
 */
public class convertSeconds {

	public static void main(String[] args) 
	{
		Scanner scan=new Scanner(System.in);
		System.out.println("seconds");
	    int secondsleft = scan.nextInt();//defining seconds
	    double hoursdecimal=(double)secondsleft/3600;   
//	    final int CONVERSION_FACTOR = 1%3600 ;
	    int hours = ( secondsleft / 3600);
	    
	    secondsleft = secondsleft - hours*3600;
	    
        // final int CONVERSION_FACTOR1 = 1%60 ;
	     int minutes = (secondsleft/60);
	     
	     int seconds = secondsleft-minutes*60;
	     
	     System.out.println("hours="+ hours);
	     System.out.println("minute="+minutes);
	     System.out.println("seconds"+seconds);
	 
	     System.out.println("hours="+ hoursdecimal);
		
	}

}

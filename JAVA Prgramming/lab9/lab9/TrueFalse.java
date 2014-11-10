package lab9;

import java.io.File;
import java.util.Scanner;

public class TrueFalse {
	public static void main(String[] args) {
		
		System.out.println("plug in the number :");
		 Scanner scan=new Scanner(System.in);
		 int number = scan.nextInt();
			boolean[] flags=new boolean[number] ;
		 for(int i=0;i<number;i++){
			 //flags[i]=true;]
			 if((number%2)==0){
				 flags[i]=true;
			 }
			
			System.out.println(flags[i]) ;
		 }
		
		 
	
		
	}

}

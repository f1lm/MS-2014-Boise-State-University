import java.util.Scanner;


public class DiceRoller {
	  public static void main (String[] args)
	   {
		  int player1Win=0;
		 
		 int player2Win=0;
			 
			 int tie=0;
		  String yes="y";
		  while(yes.equals("y")){
		 PairOfDice idie = new PairOfDice(6);
		 
		 int player1= idie.roll();
		 
		 System.out.print("Your roll: "+ idie.toString());
		 int player2= idie.roll();
		 
		 System.out.print("\n"+ "Opponent's roll: "+ idie.toString());
		 if(player1>player2){
			 System.out.print("\n"+"You win");
			 player1Win++;
		 }
		 if( player1 < player2){
			 System.out.print("\n"+"You loose");
			 player2Win++;
		 }
		 else if (player1==player2){
			 System.out.print("\n"+"Draw");
			 tie++;
		 }
		 System.out.print("\n" + " You win:"+ player1Win + " Opponent wins: "+player2Win + " Ties: "+tie);
		
		/* if(player1>player2){
			 System.out.print("\n" + " You win:"+ win + " Opponent wins: "+win2 + " Ties: "+tie);
		 }
		 if( player1 < player2){
			 System.out.print("\n" + "You win:  "+win + " Opponent wins: "+win2 + " Ties: "+tie);
		 }
		 else if (player1==player2){
			 System.out.print("\n" + "You win: "+win + " Opponent wins: "+win2 + " Ties:"+tie);
		 }*/
		
		 
		 Scanner scan=new Scanner(System.in);
		  System.out.println("\n"+"Do you want to roll angain? (Y)es to continue else to quit.");
		  yes =scan.nextLine();
		  }
		 System.out.println("Thanks for playing!");
	   }
	  


}

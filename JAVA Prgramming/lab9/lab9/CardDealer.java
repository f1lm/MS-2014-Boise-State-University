package lab9;

public class CardDealer {

	public static void main(String[] args) {
		DeckOfCards deck=new DeckOfCards();
		System.out.println(deck);
		deck.shuffle();
		System.out.println("SHUFFLED:\n");
		System.out.println(deck);
		
		Card card1=deck.draw();
		Card card2=deck.draw();
		System.out.println("You got: "+card1);
		System.out.println("Other player got: "+card2);
		int result=card1.compareTo(card2);
		if (result==1) {
			System.out.println("You Win");
		} else if (result==-1) {
			System.out.println("You Loose");
		}
		else{
			System.out.println("Draw");
		}
	}
	}



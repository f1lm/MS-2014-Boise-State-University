package lab9;

import java.util.Arrays;
import java.util.Random;

public class DeckOfCards implements DeckOfCardsInterface{

	private Card[] deck=new Card[52];
	private int nextCard;
	private int numOfCardsLeft;
	
	public DeckOfCards(){
		restoreDeck();
	}
	@Override
	public void shuffle() {
		 Random generator = new Random();
		 
		    // attempt to swap each card with a random card in the deck
		    // this isn't a perfect shuffle but it is a simple one
		    // a better shuffle requires a more complex algorithm
		 
		    for (int i=0; i<deck.length; i++) {
		        int j = generator.nextInt(deck.length);
		        Card temp = deck[i];
		        deck[i] = deck[j];
		        deck[j] = temp;
		    }
		 
		    //don't forget to reset any variables you're using
		    // to keep track of dealt and remaining cards
		    numOfCardsLeft = deck.length;
		    nextCard = 0;
		
	}
	@Override
	public Card draw() {
		nextCard++;
		if(nextCard>=52){
			return null;
		}
		return deck[nextCard-1];
		
	}
	@Override
	public void restoreDeck() {
		int index=0;
		for(Suit suit :Suit.values()){
			for(FaceValue face: FaceValue.values()){
				deck[index]=new Card(suit,face);
				index++;
			}
		}
		nextCard = 0;
		
	}
	@Override
	public int numCardsRemaining() {
		return 52-nextCard;
		
	}
	@Override
	public int numCardsDealt() {
		return nextCard;
		
	}
	@Override
	public Card[] dealtCards() {
		
		if(nextCard>=52){
			return null;
		}
		Card[] dealt = new Card[numCardsDealt()];
		for(int i = 0; i < nextCard; i++){
			dealt[i]=deck[i];
		}
		
		return dealt;
	}
	@Override
	public Card[] remainingCards() {
		
		if(nextCard>=52){
			return null;
		}
		Card[] remaining=new Card[numCardsRemaining()];
		for(int i = 0; i < numCardsRemaining(); i++){
			remaining[i]=deck[i+nextCard];
		}
		return remaining;
	}
	public String toString(){
		return Arrays.toString(deck);
	}
}

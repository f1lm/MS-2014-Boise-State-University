package lab9;

/**
 * Represents a card from a deck of standard playing cards
 * 
 * @author mvail
 */
public class Card implements Comparable<Card> {
	private Suit suit;
	private FaceValue face;

	/**
	 * Card constructor.
	 * 
	 * @param s Card's suit.
	 * @param v Card's face value.
	 */
	public Card(Suit s, FaceValue v) {
		suit = s;
		face = v;
	}

	/**
	 * Getter for Card's suit.
	 * 
	 * @return card suit
	 */
	public Suit getSuit() {
		return suit;
	}

	/**
	 * Getter for Card's face value.
	 * 
	 * @return face value
	 */
	public FaceValue getFaceValue() {
		return face;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return face + " of " + suit;
	}

	/**
	 * Return relative rank of this Card as compared to other Card.
	 * 
	 * @param other Card to compare to this Card for relative rank
	 * @return -1 if this Card is less than other Card, +1 if this Card is
	 *         greater than other Card, 0 if Card values are equal
	 */
	@Override
	public int compareTo(Card other) {
		if (this.face.getRank() < other.face.getRank()) {
			return -1;
		} else if (this.face.getRank() > other.face.getRank()) {
			return 1;
		}
		return 0;
	}
	
	/**
	 * Compare Cards for matching suit and face value
	 * 
	 * @param other Card to compare
	 * @return true if Cards are equivalent, else false
	 */
	public boolean equals(Card other) {
		return (this.suit == other.suit && this.face == other.face);
	}
}
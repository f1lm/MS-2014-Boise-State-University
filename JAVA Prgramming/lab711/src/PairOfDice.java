

public class PairOfDice {
	Die die1;
	Die die2;
	
	

	public PairOfDice(int numSides) {
		die1 = new Die(numSides);
		die2 = new Die(numSides);
	}

	public int roll() {
		die1.roll();
		die2.roll();
		
		return die1.getFaceValue() + die2.getFaceValue();
	}
	public int getTotal(){
		int total=die1.getFaceValue()+die2.getFaceValue();
		return total;
	}
	public int getFaceValue1(){
		int faceValue1=die1.getFaceValue() ;
		return faceValue1;
	}
	public int getFaceValue2(){
		int faceValue2=die2.getFaceValue();
		return faceValue2;
	}
public String toString(){
		
		return ((die1.getFaceValue() + die2.getFaceValue()) + "(" +  die1.getFaceValue()+" + " +  die2.getFaceValue() + ")");
	}
	
}

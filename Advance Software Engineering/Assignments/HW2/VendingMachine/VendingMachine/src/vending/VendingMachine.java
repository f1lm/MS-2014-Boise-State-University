package vending;

public class VendingMachine {
	
	public static final String COFFEE = "Coffee";
	public static final String JUICE = "Juice";
	public static final String SODA = "Soda";
	
	private int deposit;
	private int change;
	
	private Drink coffee;
	private Drink juice;
	private Drink soda;
	
	public VendingMachine(){
		deposit = 0;
		change = 0 ;
		coffee = new Drink(COFFEE, 0, 0);
		juice = new Drink(JUICE, 0, 0);
		soda = new Drink(SODA, 0, 0);
	}
	
	public Drink getCoffee(){
		return coffee;
	}
	
	public Drink getJuice(){
		return juice;
	} 
	
	public Drink getSoda(){
		return soda;
	} 
	
	public void setDrink(String drink, int newPrice, int newCount){
		if (drink.equalsIgnoreCase(COFFEE)){
			coffee.setPrice(newPrice);
			coffee.setCount(newCount);
		}
		else 
		if (drink.equalsIgnoreCase(JUICE)){
			juice.setPrice(newPrice);
			juice.setCount(newCount);
		}
		else 
		if (drink.equalsIgnoreCase(SODA)){
			soda.setPrice(newPrice);
			soda.setCount(newCount);
		}
	}
		
	private void calculateChange(int price) {
		change = deposit - price;
		deposit = 0;
	}

	public void insertCoin(Coin coin){
		deposit += coin.value();
	}

	public int getDeposit(){
		return deposit;
	}

	public int getChange(){
		return change;
	}

	public void returnCoins(){
		deposit = 0 ;
	}

	public boolean purchase(String drink){
		if (drink.equalsIgnoreCase(COFFEE)){
			if (coffee.getCount()>0 && deposit>=coffee.getPrice()) {
				coffee.sell();
				calculateChange(coffee.getPrice());
				return true;
			}
		} else
		if (drink.equalsIgnoreCase(JUICE)){
			if (juice.getCount()>0 && deposit>=juice.getPrice()) {
				juice.sell();
				calculateChange(juice.getPrice());
				return true;
			}
		} else
		if (drink.equalsIgnoreCase(SODA)){
			if (soda.getCount()>0 && deposit>=soda.getPrice()) {
				soda.sell();
				calculateChange(soda.getPrice());
				return true;
			}
		}
		return false;
	} 
	
}


package vending;

public class Drink {
	
	private String name;
	private int price;
	private int count;
	
	public Drink(String name, int price, int count){
		this.name = name;
		this.price = price;
		this.count = count;
	}

	public String getName(){
		return name;
	}
	
	public int getPrice(){
		return price;
	}
	
	public void setPrice(int newPrice){
		if (newPrice>0)
			price = newPrice;
	}

	public int getCount(){
		return count;
	}

	public void setCount(int newCount){
		if (newCount>0)
			count = newCount;
	}
	
	public void sell(){
		count--;
	}
	
	public String toString(){
		return name+"["+count + "]: "+price +" cents"; 
	}
}

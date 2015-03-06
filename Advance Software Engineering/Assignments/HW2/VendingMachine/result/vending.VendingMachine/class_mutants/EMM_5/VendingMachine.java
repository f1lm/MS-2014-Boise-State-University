// This is mutant program.
// Author : ysma

package vending;


public class VendingMachine
{

    public static final java.lang.String COFFEE = "Coffee";

    public static final java.lang.String JUICE = "Juice";

    public static final java.lang.String SODA = "Soda";

    private int deposit;

    private int change;

    private vending.Drink coffee;

    private vending.Drink juice;

    private vending.Drink soda;

    public VendingMachine()
    {
        deposit = 0;
        change = 0;
        coffee = new vending.Drink( COFFEE, 0, 0 );
        juice = new vending.Drink( JUICE, 0, 0 );
        soda = new vending.Drink( SODA, 0, 0 );
    }

    public vending.Drink getCoffee()
    {
        return coffee;
    }

    public vending.Drink getJuice()
    {
        return juice;
    }

    public vending.Drink getSoda()
    {
        return soda;
    }

    public void setDrink( java.lang.String drink, int newPrice, int newCount )
    {
        if (drink.equalsIgnoreCase( COFFEE )) {
            coffee.setPrice( newPrice );
            coffee.setCount( newCount );
        } else {
            if (drink.equalsIgnoreCase( JUICE )) {
                juice.setPrice( newPrice );
                juice.setCount( newCount );
            } else {
                if (drink.equalsIgnoreCase( SODA )) {
                    soda.setCount( newPrice );
                    soda.setCount( newCount );
                }
            }
        }
    }

    private void calculateChange( int price )
    {
        change = deposit - price;
        deposit = 0;
    }

    public void insertCoin( vending.Coin coin )
    {
        deposit += coin.value();
    }

    public int getDeposit()
    {
        return deposit;
    }

    public int getChange()
    {
        return change;
    }

    public void returnCoins()
    {
        deposit = 0;
    }

    public boolean purchase( java.lang.String drink )
    {
        if (drink.equalsIgnoreCase( COFFEE )) {
            if (coffee.getCount() > 0 && deposit >= coffee.getPrice()) {
                coffee.sell();
                calculateChange( coffee.getPrice() );
                return true;
            }
        } else {
            if (drink.equalsIgnoreCase( JUICE )) {
                if (juice.getCount() > 0 && deposit >= juice.getPrice()) {
                    juice.sell();
                    calculateChange( juice.getPrice() );
                    return true;
                }
            } else {
                if (drink.equalsIgnoreCase( SODA )) {
                    if (soda.getCount() > 0 && deposit >= soda.getPrice()) {
                        soda.sell();
                        calculateChange( soda.getPrice() );
                        return true;
                    }
                }
            }
        }
        return false;
    }

}

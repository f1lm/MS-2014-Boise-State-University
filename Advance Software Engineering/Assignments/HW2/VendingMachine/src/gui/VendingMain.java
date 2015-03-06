package gui;

public class VendingMain {
	
    private static void startGUI() {
		VendingGUI window = new VendingGUI();
		window.pack();
		window.setVisible(true);
   }

    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                startGUI();
            }
        });
    }
    
    /* 
    //non-gui test
    
	public static void main(String[] args){
		VendingMachine vending;
		vending = new VendingMachine();
		vending.setCoffee(85, 10);
		vending.setOrangeJuice(60, 20);
		vending.setSoda(115, 15);
		vending.insertCoin(Coin.DOLLAR);
		vending.insertCoin(Coin.QUARTER);
		vending.purchase(DRINKTYPE.SODA);	
		System.out.println("Change: "+ vending.getChange());
	}
	*/
}

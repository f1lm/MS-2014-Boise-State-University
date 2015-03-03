package gui;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

import vending.Coin;
import vending.VendingMachine;

public class VendingGUI extends JFrame implements ActionListener {

	private static final long serialVersionUID = 1L;
	
	private JRadioButton nickelButton, dimeButton, quarterButton, dollarButton;
	private JRadioButton coffeeButton, juiceButton, sodaButton;
	private JButton insertCoinButton, returnCoinsButton, purchaseButton;
	private JTextField depositTextField, infoTextField;

	private VendingMachine vendingmachine;
	
	public VendingGUI(){
		initializeVendingMachine();
		createContentPane();
	}

	private void initializeVendingMachine(){
		vendingmachine = new VendingMachine();
		vendingmachine.setDrink(VendingMachine.COFFEE, 85, 3);
		vendingmachine.setDrink(VendingMachine.JUICE, 60, 2);
		vendingmachine.setDrink(VendingMachine.SODA, 115, 2);
	}
	
	private void createContentPane() { 
		JPanel mainPanel = new JPanel();
		mainPanel.add(createInfoPanel());
		mainPanel.setLayout(new GridLayout(4,1));
		mainPanel.add(createCoinPanel());
		mainPanel.add(createDepositAmountPanel());
		mainPanel.add(createPurchasePanel());
		setContentPane(mainPanel);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
	
	private JPanel createCoinPanel(){	
		insertCoinButton = new JButton("Insert Coin");
		insertCoinButton.addActionListener(this);
		JPanel panel = new JPanel();
		panel.add(insertCoinButton);
		panel.add(createCoinRadioGroup());
		return panel;
	}
	
	private JPanel createCoinRadioGroup(){
		nickelButton = new JRadioButton(Coin.NICKEL.name());
		nickelButton.setSelected(false);
		dimeButton = new JRadioButton(Coin.DIME.name());
		dimeButton.setSelected(false);
		quarterButton = new JRadioButton(Coin.QUARTER.name());
		quarterButton.setSelected(true);
		dollarButton = new JRadioButton(Coin.DOLLAR.name());
		dollarButton.setSelected(false);
		
		ButtonGroup coinRadioGroup = new ButtonGroup();
		coinRadioGroup.add(nickelButton);
		coinRadioGroup.add(dimeButton);
		coinRadioGroup.add(quarterButton);
		coinRadioGroup.add(dollarButton);

		JPanel coinRadioPanel = new JPanel(); 
		coinRadioPanel.add(nickelButton);
		coinRadioPanel.add(dimeButton);
		coinRadioPanel.add(quarterButton);
		coinRadioPanel.add(dollarButton);
		
		return coinRadioPanel;
	}
	
	private JPanel createDepositAmountPanel(){
		JLabel depositLabel = new JLabel("Deposit");
		depositTextField = new JTextField(6);
		depositTextField.setEditable(false);
		depositTextField.setText("0 cents");
		
		JPanel depositPanel = new JPanel(); 
		depositPanel.add(depositLabel);
		depositPanel.add(depositTextField);
		depositPanel.add(createReturnCoinsPanel());
		return depositPanel;
	}

	private JPanel createReturnCoinsPanel(){
		returnCoinsButton = new JButton("Return Coins");
		returnCoinsButton.addActionListener(this);
		JPanel panel = new JPanel();
		panel.add(returnCoinsButton);
		return panel;
	}

	private JPanel createPurchasePanel(){	
		purchaseButton = new JButton("Purchase");
		purchaseButton.addActionListener(this);
		JPanel panel = new JPanel();
		panel.add(purchaseButton);
		panel.add(createDrinkRadioGroup());
		return panel;
	}
		
	private JPanel createDrinkRadioGroup(){
		coffeeButton = new JRadioButton(vendingmachine.getCoffee().toString());
		coffeeButton.setSelected(true);
		juiceButton = new JRadioButton(vendingmachine.getJuice().toString());
		juiceButton.setSelected(false);
		sodaButton = new JRadioButton(vendingmachine.getSoda().toString());
		sodaButton.setSelected(false);
		
		ButtonGroup drinkRadioGroup = new ButtonGroup();
		drinkRadioGroup.add(coffeeButton);
		drinkRadioGroup.add(juiceButton);
		drinkRadioGroup.add(sodaButton);

		JPanel drinkRadioPanel = new JPanel(); 
		drinkRadioPanel.add(coffeeButton);
		drinkRadioPanel.add(juiceButton);
		drinkRadioPanel.add(sodaButton);
		
		return drinkRadioPanel;
	}

	private JPanel createInfoPanel(){
		infoTextField = new JTextField(30);
		infoTextField.setText("Welcome! ");
		infoTextField.setEditable(false);
		JPanel infoPanel = new JPanel(); 
		infoPanel.add(infoTextField);
		return infoPanel;
	}

	private void updateDepositTextField(int amount){
		depositTextField.setText(amount+" cents");
	}
	
	private void updateInformation(String info){
		infoTextField.setText(info);
	}
	
	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == insertCoinButton) {
			if (nickelButton.isSelected())
				vendingmachine.insertCoin(Coin.NICKEL);
			else
			if (dimeButton.isSelected())
				vendingmachine.insertCoin(Coin.DIME);
			else
			if (quarterButton.isSelected())
				vendingmachine.insertCoin(Coin.QUARTER);
			else
			if (dollarButton.isSelected())
				vendingmachine.insertCoin(Coin.DOLLAR);
			updateDepositTextField(vendingmachine.getDeposit());
			updateInformation("Welcome!");
		} else
		if (e.getSource() == purchaseButton) {
			boolean isPurchaseSuccessful = false; 
			if (coffeeButton.isSelected()) {
				isPurchaseSuccessful = vendingmachine.purchase(VendingMachine.COFFEE);
				if (isPurchaseSuccessful)
					coffeeButton.setText(vendingmachine.getCoffee().toString());
				else {
					if (vendingmachine.getCoffee().getCount()==0)
						updateInformation("Sorry, coffee is sold out.");
					else
						updateInformation("Your deposit is not enough.");
				}
			}
			else
			if (juiceButton.isSelected()) {
				isPurchaseSuccessful = vendingmachine.purchase(VendingMachine.JUICE);
				if (isPurchaseSuccessful)
					juiceButton.setText(vendingmachine.getJuice().toString());
				else {
					if (vendingmachine.getJuice().getCount()==0)
						updateInformation("Sorry, juice is sold out.");
					else
						updateInformation("Your deposit is not enough.");
				}
			}
			else
			if (sodaButton.isSelected()){
				isPurchaseSuccessful = vendingmachine.purchase(VendingMachine.SODA);
				if (isPurchaseSuccessful)
					sodaButton.setText(vendingmachine.getSoda().toString());
				else {
					if (vendingmachine.getSoda().getCount()==0)
						updateInformation("Sorry, soda is sold out.");
					else
						updateInformation("Your deposit is not enough.");
				}
			}
			
			if (isPurchaseSuccessful) {
				updateDepositTextField(vendingmachine.getDeposit());
				if (vendingmachine.getChange()>0)
					updateInformation("Your change is "+vendingmachine.getChange()+ " cents. Thank you for your business.");
				else
					updateInformation("Thank you for your business.");					
			}				
		} else
		if (e.getSource() == returnCoinsButton) {
			if (vendingmachine.getDeposit()>0) {
				vendingmachine.returnCoins();
				updateDepositTextField(vendingmachine.getDeposit());
				updateInformation("Coins are returned.");
			}
		}  
	}
}

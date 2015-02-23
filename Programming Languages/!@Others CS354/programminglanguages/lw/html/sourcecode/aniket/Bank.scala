/*

Bank Program
@author: Aniket Sur
file name: bank.scala

To run this program put all contents of this file into a file called bank.scala
Then Type the following without the $ into Terminal:
$ scalac bank.scala
$ scala Main

This file contains the definitions for the Customer, CheckingAccount, SavingsAccount, and Bank classes. It also contains the definitions for the Account trait and the Main singleton object. The Main object has the main method that runs the Bank program.

The Bank Program simulates having a checking account and a savings account.
You can withdraw cash from your account using the withdraw method.
You can deposit cash to your account using the deposit method.

The main method in the Main object creates a CheckingAccount and a SavingsAccount for two people. It then adds all the accounts to the Bank.
The main method prints out the account information for all bank accounts then calls Bank's accrue method with a rate of 0.02. It then prints out all the account information for all bank accounts a second time.

*/



//class definition for the Customer class
class Customer(n: String) { //The constructor is the class definition.
  private var name :String = n //name is an instance variable that gets the 			       //parameterized value n.
  
  override def toString() :String = {
    name   //in Scala the last expression gets returned. We don't need a 
		//return keyword before the returned value.
  }
  
}

//definition for trait. Traits are like Java Interfaces but you can
//define some methods.
trait Account {

  protected var number :String       //no values given for these variables
  protected var customer :Customer   //since Account is a Trait
  protected var balance :Double

  def accrue(rate: Double) :Unit    //abstract method that needs to be
					//defined by child classes

  def getBalance : Double = balance  //defined methods that can be
					//invoked by all child classes

  def deposit(amount: Double) :Unit = balance += amount

  def withdraw(amount: Double) :Unit = balance -= amount

  override def toString() :String = {    //toString method gives String
					//representation of Account objects
   number + ":" + customer + ":" + balance;
  }
}

//class definition for CheckingAccount. we use the extends keyword when
// created a subclass or implementing a Trait.
class CheckingAccount(n: String, c: Customer, b: Double) extends Account {
  var number = n;     //The class definition is the Constructor.
  var customer = c;   // n, c, b, give values to number, customer, and 				//balance instance variables.
  var balance = b;
  
  override def accrue(rate: Double) :Unit = {} //empty method
				              //because we don't want the
					     //accrue method to do   					//anything. But we still need to define it 				//since Account was extended

}

//class definition for SavingsAccount
class SavingsAccount(n: String, c: Customer, b: Double) extends Account {
  var number = n;
  var customer = c;
  var balance = b;
  
  private var interest :Double = 0; //new instance variable interest
					//initially initialized to 0.
  
//the accrue method takes a rate like .09 and calculates interest on the //balance. Then adds interest to balance.
  override def accrue(rate: Double) :Unit = { //we need to add override before
			                    //def because we are overriding Account's accrue method.
    interest = balance * rate
    balance += interest
  }
}

import scala.collection.mutable.Queue //import statement to get pre-defined class from Scala.

//class definition for Bank class
class Bank {
	//creates collection variable Queue.
  private var accounts : Queue[Account] = new Queue[Account]
 
  def add(account: Account){ //adds an Account to the Queue
    accounts.enqueue(account)
  }
  
  def accrue(rate: Double){
    for(account <- accounts)  //for every account in accounts
      account.accrue(rate)    // call accrue with the given rate.
  }
  

  override def toString() :String = { //print account info about all bank accounts in the Bank.
    var r :String = ""
    for (account <- accounts)
      r += account + "\n"
    r
  }
  
}

//definiton for the singleton object Main
object Main {

  /**
   * @param args the command line arguments
   */
  def main(args: Array[String]): Unit = { //main method that runs the program.
    
    var bank :Bank = new Bank()
    var c :Customer = new Customer("Ann")
    bank.add(new CheckingAccount("01001",c,100.00))
    bank.add(new SavingsAccount("01002",c,200.00))
    var c2 :Customer = new Customer("Bob")
    bank.add(new CheckingAccount("01003",c2,1023.00))
    bank.add(new SavingsAccount("01004",c2,1234849.00))
    println(bank)
    bank.accrue(0.02)
    println(bank)
  }
}

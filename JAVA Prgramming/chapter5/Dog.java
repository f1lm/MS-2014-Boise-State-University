
public class Dog {

	//instance data / properties / all together = "state"
	private String name;
	private int age;
	
	//constructor
	public Dog(String name, int age)
	{
		this.name = name;
		this.age = age;
	}
	
	//getters
	public String getName()
	{
		return name;
	}
	
	public int getAge()
	{
		return age;
	}
	
	//setters
	public void setName(String newName)
	{
		name = newName;
	}
	
	public void setAge(int newAge)
	{
		age = newAge;
	}
	
	//getDogYears()
	public int getDogYears()
	{
		return age * 7;
	}
	
	//toString()
	public String toString()
	{
		return "Dog: [name: " + name + " age: " + age + "]";
	}
}

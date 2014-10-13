/**
 * 
 */

/**
 * @author amit
 *
 */
public class Penguin
{
	private long id;
	private double height;
	private double weight;
	/**
	 * @return the height
	 */
	public double getHeight()
	{
		return height;
	}
	/**
	 * @param height the height to set
	 */
	public void setHeight(double height)
	{
		this.height = height;
	}
	/**
	 * @return the weight
	 */
	public double getWeight()
	{
		return weight;
	}
	/**
	 * @param weight the weight to set
	 */
	public void setWeight(double weight)
	{
		this.weight = weight;
	}
	/**
	 * @return the id
	 */
	public long getId()
	{
		return id;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString()
	{
		return "Penguin [id=" + id + ", height=" + height + ", weight="
				+ weight + "]";
	}
	

}

//********************************************************************
//  Die.java       Java Foundations
//
//  Represents one die (singular of dice) with faces showing values
//  between 1 and 6.
//********************************************************************

public class Die
{
   private int maxSide;  // maximum face value

   private int faceValue;
  // current value showing on the die

   //-----------------------------------------------------------------
   //  Constructor: Sets the initial face value of this die.
   //-----------------------------------------------------------------
   public Die(int numSides){
	   maxSide = numSides;
	   faceValue= 1;
   }
   public Die()
   {
	   maxSide = 6;
      faceValue = 1;
   }

   //-----------------------------------------------------------------
   //  Computes a new face value for this die and returns the result.
   //-----------------------------------------------------------------
   public int roll()
   {
//	  int faceValue = 5; //hides the instance variable!
      faceValue = (int)(Math.random() * maxSide) + 1;

      return faceValue;
   }

   //-----------------------------------------------------------------
   //  Face value mutator. The face value is not modified if the
   //  specified value is not valid.
   //-----------------------------------------------------------------
   public void setFaceValue (int value)
   {
      if (value > 0 && value <= maxSide)
         faceValue = value;
   }

   //-----------------------------------------------------------------
   //  Face value accessor.
   //-----------------------------------------------------------------
   public int getFaceValue()
   {
	   return faceValue;
   }

   //-----------------------------------------------------------------
   //  Returns a string representation of this die.
   //-----------------------------------------------------------------
   public String toString()
   {
      String result = Integer.toString(faceValue);
//	   String result = "Die: [faceValue = " + faceValue + "]";

      return result;
   }
}

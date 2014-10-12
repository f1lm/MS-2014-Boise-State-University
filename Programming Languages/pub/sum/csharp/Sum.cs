// C# sum program

using System;

class Sum {

    public static int sum(int[] seq) {
	int s=0;
	for (int i=0; i<seq.Length; i++)
	    s+=seq[i];
	return s;
    }

    public static void Main() {
	int[] seq=new int[] {5,6,1,8,3,7};
	Console.WriteLine(sum(seq));
    }

}

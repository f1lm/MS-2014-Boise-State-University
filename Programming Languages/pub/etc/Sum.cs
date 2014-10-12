// C# sum program

using System;

class Sum {

    private int s;

    public Sum() {
	init();
    }

    public void init() {
	s=0;
    }

    public int sum(int[] seq) {
	for (int i=0; i<seq.Length; i++)
	    s+=seq[i];
	return s;
    }

    public static void Main() {
	int[] seq=new int[] {5,6,1,8,3,7};
	Sum sum=new Sum();
	Console.WriteLine(sum.sum(seq));
    }

}

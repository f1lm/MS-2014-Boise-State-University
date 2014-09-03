// Java OO sum program

public class Sum {

    private int s;

    public Sum() {
	init();
    }

    public void init() {
	s=0;
    }

    public int sum(int[] seq) {
	for (int i=0; i<seq.length; i++)
	    s+=seq[i];
	return s;
    }

    public static void main(String[] args) {
	int[] seq={5,6,1,8,3,7};
	Sum sum=new Sum();
	System.out.println(sum.sum(seq));
    }

}


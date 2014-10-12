// Java sum program

import java.util.*;

public class SumIter {

    public static int sum(Set<Integer> seq) {
	int s=0;
	for (Integer v: seq)
	    s+=v;
	return s;
    }

    public static void main(String[] args) {
	Integer[] ints={5,6,1,8,3,7};
	Set<Integer> seq=new HashSet<Integer>();
	Collections.addAll(seq,ints);
	System.out.println(sum(seq));
    }

}


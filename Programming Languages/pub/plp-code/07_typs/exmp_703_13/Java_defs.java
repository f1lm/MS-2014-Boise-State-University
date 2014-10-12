// Example 7.7

public class Java_defs {

enum mips_special_regs { gp(28), fp(30), sp(29), ra(31);
    private final int register;
    mips_special_regs(int r) {register = r;}
    public int reg() {return register;}
}

public static void main(String args[])
{
    int n = mips_special_regs.fp.reg();
    System.out.println(n);
}
}

#! /usr/bin/perl
# Example 13.41 (Figure 13.19)

sub outer($) {                      # must be called with scalar arg
    my $sub_A = sub {
        print "sub_A  $lex, $dyn\n";
    };
    my $lex = $_[0];                # static local initialized to first arg
    local $dyn = $_[0];             # dynamic local initialized to first arg
    my $sub_B = sub {
        print "sub_B  $lex, $dyn\n";
    };
    print "outer  $lex, $dyn\n";
    $sub_A->();
    $sub_B->();
}

$lex = 1; $dyn = 1;
print "main   $lex, $dyn\n";
outer(2);
print "main   $lex, $dyn\n";

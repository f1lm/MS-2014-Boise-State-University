#! /usr/bin/perl
# Example 6.75

sub consume_char($) {
    print $_[0];
}

outer: while (<>) {                 # iterate over lines of input 
    foreach $c (split //) {         # iterate over remaining chars 
        last outer if ($c =~ '\$');  # exit main loop if we see a $ sign 
        consume_char($c); 
    } 
} 

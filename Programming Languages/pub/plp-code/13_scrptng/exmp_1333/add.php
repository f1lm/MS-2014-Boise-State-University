<!-- Example 13.33 (Figure 13.15)

    To work, this file must be installed in a directory accessible to a
    web server, and the server must have PHP enabled.
    The companion file, adder2.html, must be in the same directory.
-->

<HTML><HEAD><TITLE>Sum</TITLE></HEAD><BODY><P>
<?php
    $argA = $_REQUEST['argA']; $argB = $_REQUEST['argB'];
    $sum = $argA + $argB;
    echo "$argA plus $argB is $sum\n";
?>
</BODY></HTML>

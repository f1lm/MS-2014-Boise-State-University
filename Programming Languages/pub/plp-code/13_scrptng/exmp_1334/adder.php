<!-- Example 13.34 (Figure 13.15)

    To work, this file must be installed in a directory accessible to a
    web server, and the server must have PHP enabled.
-->

<?php
    $argA = $_REQUEST['argA'];  $argB = $_REQUEST['argB'];
    if (!isset($_REQUEST['argA']) || $argA == "" || $argB == "") {
?>
        <HTML><HEAD><TITLE>Adder</TITLE></HEAD><BODY>
        <FORM ACTION="adder.php" METHOD=POST>
        <P><INPUT NAME="argA" SIZE=3> First addend<BR>
           <INPUT NAME="argB" SIZE=3> Second addend
        <P><INPUT TYPE=SUBMIT>
        </FORM></BODY></HTML>
<?php
    } else {
?>
        <HTML><HEAD><TITLE>Sum</TITLE></HEAD><BODY><P>
<?php
        $sum = $argA + $argB;
        echo "$argA plus $argB is $sum\n";
?>
        </BODY></HTML>
<?php
    }
?>

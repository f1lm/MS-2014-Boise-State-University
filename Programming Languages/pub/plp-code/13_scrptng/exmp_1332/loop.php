<!-- Example 13.32 (Figure 13.14)

    To work, this file must be installed in a directory accessible to a
    web server, and the server must have PHP enabled.
-->

<HTML><BODY><P>
<?php
            for ($i = 0; $i < 20; $i++) {
                if ($i % 2) { ?>
<B><?php
                    echo " $i"; ?>
</B><?php
                } else echo " $i";
            }
 ?>
</BODY></HTML>

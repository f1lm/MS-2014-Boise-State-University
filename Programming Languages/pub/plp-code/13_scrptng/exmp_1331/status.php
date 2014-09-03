<!-- Example 13.31 (Figure 13.13)

    To work, this file must be installed in a directory accessible to a
    web server, and the server must have PHP enabled.
-->

<HTML>
<HEAD>
<TITLE>Status of <?php echo $host = chop(`hostname`) ?></TITLE>
</HEAD>
<BODY>
<H1><?php echo $host ?></H1>
<PRE>
<?php echo `uptime`, "\n", `who` ?>
</PRE>
</BODY>
</HTML>

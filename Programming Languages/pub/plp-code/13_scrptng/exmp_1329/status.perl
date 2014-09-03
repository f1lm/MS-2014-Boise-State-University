#! /usr/bin/perl
# Example 13.29 (Figure 13.10)

# To work, this file must be placed in a special directory known to the
# local web server, typically named "cgi-bin".  Generally this directory
# is writable only by privileged users, and the programs it contains run
# with the (very limited) privileges of the web server.  You may therefore
# have difficulty testing this code on a shared machine.  On a mac (where
# I tested this), the directory is /Library/WebServer/CGI-Executables,
# which is writable only by users with administrator access.

print "Content-type: text/html\n\n";

$host = `hostname`; chop $host;
print "<HTML>\n<HEAD>\n<TITLE>Status of ", $host,
      "</TITLE>\n</HEAD>\n<BODY>\n";
print "<H1>", $host, "</H1>\n";
print "<PRE>\n", `uptime`, "\n", `who`;
print "</PRE>\n</BODY>\n</HTML>\n";

#!/bin/awk -f

# Awk convert CSV to HTML program

BEGIN {  printf("<html><head><title>Ada County building-permit information</title></head><body>") }

BEGIN {  printf("<h1>Ada County building-permit information</h1>") }

BEGIN {
    FPAT = "([^,]*)|(\"[^\"]+\")"
}

BEGIN { printf("<table>") }
{	
    for (i = 1; i <= NF; i++) {				
		if (substr($i, 1, 1) == "\"") {
			len = length($i)
			$i = substr($i, 2, len - 2)    # Get text within the two quotes
		}			
	}
	
	if (NR==1){
		print "<tr><th> "$1" </th><th> "$5" </th><th> "$6" </th><th> "$7" </th><th> "$8" </th></tr>"
	}
	
	IGNORECASE = 1
	if ($3=="Single Family Dwelling") {		
		if (NR!=1){
			print "<tr>"
			print "<td> "$1" </td>"
			print "<td> "$5" </td>"
			print "<td> "$6" </td>"
			print "<td> "$7" </td>"
			print "<td> "$8" </td>"
			print "</tr>"
		}
	}	
}

END {  printf("</table></body></html>") }



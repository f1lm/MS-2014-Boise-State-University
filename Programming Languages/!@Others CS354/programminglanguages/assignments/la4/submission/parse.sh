#!/usr/bin/awk -f


BEGIN { 
		FPAT = "([^,]*)|(\"[^\"]+\")"  
	} 
	
#EMPTY	
	{
		if (substr($8, 1, 1) == "\"") 
		{
       		len = length($8)
 			$8 = substr($8, 2, len - 2)
 		}
		if (substr($6, 1, 1) == "\"")
        {
            len = length($6)
            $6 = substr($6, 2, len - 2)
        }
	}
#		subdivison price issue date lots block
$3 ~ /ingle/	{
		printf "<tr>"
		printf "<td style=\"padding-left:5em\">%s</td>", $5
		printf "<td style=\"padding-left:5em\">%s</td>", $8
		printf "<td style=\"padding-left:5em\">%s</td>", $1
		printf "<td style=\"padding-left:5em\">%s</td>", $6
		printf "<td style=\"padding-left:5em\">%s</td>", $7
		printf "</tr>"
	}

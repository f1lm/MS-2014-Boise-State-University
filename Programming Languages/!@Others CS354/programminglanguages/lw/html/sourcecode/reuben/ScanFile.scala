/**
 * la4 in scala
 * @author: reuben tanner
 */
import scala.io.Source
import java.io.PrintWriter
import scala.language.postfixOps

object ScanFile {
  
	//Scala does not have file output in the language and relies on Java's libraries
    val writer = new PrintWriter("output.html")
    
    def main(args: Array[String]): Unit = {
      
    	//getting an iterator over the lines of the file
	    val it = Source.fromFile(args(0)).getLines
	    
	    //regular expressions can be triple quoted to avoid escaping and followed by .r to produce a RegEx object
	    val csvpat = """,(?=([^\"]*\"[^\"]*\")*[^\"]*$)""".r
	    val singlepat = """[Ss]ingle""".r
	    
	    //can use semicolons or not when terminating statements
	    val description = 2;
	    //a notation in Scala for forming a list
	    val indices = 4 :: 7 :: 0 :: 5 :: 6 :: List() //date, subdname, lot, block, price
	    
	    //function call
	    printHeader
	    
	    while (it.hasNext)
	    {
	        var next = it next
	        
	        //functions that are passed one parameter can be called with no . or ()
	        var split = csvpat split next
	        
	        if (!singlepat.findFirstIn(split(description)).isEmpty)
	        {
	        	writer append "<tr>"
	        	//iterating over the list
	        	for (index <- indices)
	        	{
	        	  writer append formatTd(split(index))
	        	}
	        	writer append "</tr>"
	        }
	    }
	    	    
	    printFooter
    
	    //Nested function declaration inside main
	    def formatTd(value : String) : String = {
	      return "<td>" + value + "</td>"
	    }
  }
    
  def printHeader = {
    	writer append "<html> <head> <title>Realtor's-R-Us</title> </head> <body> <h1>Houses Near You!</h1> <table>"
    	writer append "<tr> <th >Subdivision name</th> <th >Price</th> <th >Issue Date</th> <th >Lot(s)</th> <th >Block</th> </tr>"
    }
  
  def printFooter = {
      writer.append("</table> </body> </html>")
      writer close
    }
}

#---------------------------------------------------------------
# Using this Makefile
#
#	To compile your java source (and generate documentation)
#
#	make 
#
#	To clean up your directory (e.g. before submission)
#
#	make clean
#
#---------------------------------------------------------------

JFLAGS=

# Recognize files with .class and .java extensions
.SUFFIXES: .class .java

# This is a rule to convert a file with .java extension
# into a file with a .class extension. The macro $< just
# supplies the name of the file (without the extension) 
# that invoked this rule.

.java.class:
	javac $(JFLAGS) $<

# To satisfy the rule named compile, we must have the  following 
# class files (with date no later than the source .java files).
# We also must have satisfied the rule named doc.

all: compile 

compile: Age.class Average.class Coin.class CoinFlip.class CoinFlips.class FileReading.class\
	   	FileTest.class FileWriting.class GradeReport.class Guessing.class\
		InfiniteLoop.class MinOfFour.class MinOfThree.class Multiples.class PalindromeTester.class\
		Pyramid.class ReverseNumber.class Stars.class StringEquals.class DateInputExample.class\
	   	MinOfFourTest.class URLDissector.class Wages.class WinPercentage.class\
		gui/EvenOdd.class gui/BoxesApplet.class gui/BoxesPanel.class gui/BullseyeApplet.class\
		gui/Bullseye.class gui/BullseyePanel.class gui/LeftRight.class gui/LeftRightPanel.class\
		gui/Boxes.class gui/QuoteOptions.class gui/QuoteOptionsModified.class gui/QuoteOptionsPanel.class\
		gui/QuoteOptionsPanelModified.class gui/StyleOptions.class gui/StyleOptionsPanel.class



# Run javadoc on all hava source files in this directory.
# This rule depends upon the rule named html, which makes the
# html directory if does not already exist.

doc: html
	javadoc -private -author -version -d html/ *.java

# Make the html subdirectory.
html:
	mkdir html

clean:
		rm --force  *.class gui/*.class

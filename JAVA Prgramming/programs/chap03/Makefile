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

compile: Authority.class CircleStats.class IceCream.class LabelDemo.class\
	     NestedPanels.class Purchase.class Quadratic.class RandomNumbers.class\
		 StringMutation.class CircleStatsFormatter.class ImageDemoApplet.class PrintfExample.class \
		 FormatterExample.class DigitalClock2.class TrigDemo.class ImageDemo.class ImagePanel.class \
		 DateExample.class PP33.class

# Run javadoc on all hava source files in this directory.
# This rule depends upon the rule named html, which makes the
# html directory if does not already exist.

doc: html
	javadoc -private -author -version -d html/ *.java

# Make the html subdirectory.
html:
	mkdir html

clean:
		/bin/rm --force  *.class

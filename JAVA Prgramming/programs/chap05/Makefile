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

compile: Account.class Box.class BoxTest.class Die.class NSidedDie.class\
		 RollingDice.class RollingNSidedDice.class Sphere.class SphereTest.class Transactions.class\
		 gui/Circle.class gui/Fahrenheit.class gui/FahrenheitPanel.class gui/PieChartApplet.class\
		 gui/PieChart.class gui/PieChartPanel.class gui/PushCounter.class gui/PushCounterPanel.class\
		 gui/SmilingFace.class gui/SmilingFacePanel.class gui/Splat.class gui/SplatPanel.class


# Run javadoc on all hava source files in this directory.
# This rule depends upon the rule named html, which makes the
# html directory if does not already exist.

doc: html
	javadoc -private -author -version -d html/ *.java

# Make the html subdirectory.
html:
	mkdir html

clean:
		/bin/rm --force  *.class gui/*.class

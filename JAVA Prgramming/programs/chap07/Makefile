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

compile: ArrayListExample.class ArrayPassing.class Average.class BasicArray.class Beatles.class\
		CD.class CDCollection.class CmdLineArgs.class Family.class FunkyArrays.class Grade.class\
		GradeRange.class GrowingArray.class LargeArray.class LetterCount.class NameTag.class\
		Primes.class ReverseOrder.class SodaSurvey.class Tunes.class TwoDArray.class\
		TwoDimArrays.class VariableParameters.class gui/Direction.class gui/DirectionPanel.class\
		gui/Dots.class gui/DotsPanel.class gui/LoadImage.class gui/MouseOdometer.class\
		gui/MouseOdometerPanel.class gui/Rocket.class gui/RocketPanel.class gui/RubberLines.class\
		gui/RubberLinesPanel.class gui/SawtoothSunriseApplet.class gui/SawtoothSunrise.class\
		gui/SawtoothSunrisePanel.class


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

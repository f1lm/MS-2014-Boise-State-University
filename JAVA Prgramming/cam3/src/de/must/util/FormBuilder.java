/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.util;

import de.must.wuic.*;
import de.must.dataobj.*;

/**
 * Tool to create a data property administration frame.
 * @author Christoph Mueller
 * @see DataPropertyAdministration
 */
public class FormBuilder {

  /**
   * Creates property instructions of a data object, which name is to be specified in a dialog.
   */
  public static void createPropertyInstructions() {
    createPropertyInstructions(StandardDialog.getStringInput(null, "Specify class name"));
  }

  /**
   * Creates property instructions.
   * @param dataObjectClassName the name of the data object to use
   */
  @SuppressWarnings("unchecked")
  public static void createPropertyInstructions(String dataObjectClassName) {
    try {
      Class<?> doClass = Class.forName(dataObjectClassName);
      createPropertyInstructions((Class<? extends DataObject>)doClass);
    }
    catch (Exception e2) {
      de.must.io.Logger.getInstance().error(FormBuilder.class, e2);
      StandardDialog.presentText(null, new String[] {"class " + dataObjectClassName + " of typ DataObject not found."}, "Error");
    }
  }

  /**
   * Creates property instructions.
   * @param dataObjectClassName the name of the data object to use
   */
  public static void createPropertyInstructions(Class<? extends DataObject> dataObjectClass) {
    try {
      DataObject Temp = (DataObject)dataObjectClass.newInstance();
      createPropertyInstructions(Temp.getAttributes());
    }
    catch (Exception e2) {
      de.must.io.Logger.getInstance().error(FormBuilder.class, e2);
      StandardDialog.presentText(null, new String[] {"class " + dataObjectClass.getName() + " of typ DataObject not found."}, "Error");
    }
  }

  /**
   * Creates property instructions.
   * @param attributes the attributes to use
   */
  public static void createPropertyInstructions(AbstractAttribute[] attributes) {
    int i;
    TextPresentDialog textPresentDialog1 = new TextPresentDialog("Instructions for the PropertyFrame");
    textPresentDialog1.addLine("// declarations");
    for (i = 0; i < attributes.length; i++) {
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        textPresentDialog1.addLine("  private DataCheckBox " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.MEMO:
        textPresentDialog1.addLine("  private DataTextArea " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.DECIMAL:
        textPresentDialog1.addLine("  private DataDecimalField " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.NUMBER:
        if (attributes[i].getScale() > 0) {
          textPresentDialog1.addLine("  private DataDecimalField " + attributes[i].getFieldName() + ";");
        } else {
          textPresentDialog1.addLine("  private DataIntField " + attributes[i].getFieldName() + ";");
        }
        break;
      case AbstractAttribute.INTEGER:
        textPresentDialog1.addLine("  private DataIntField " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.BIGINT:
        textPresentDialog1.addLine("  private DataIntField " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.FLOAT:
        textPresentDialog1.addLine("  private DataFloatField " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.CHAR:
        textPresentDialog1.addLine("  private DataTextField " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.VARCHAR:
        textPresentDialog1.addLine("  private DataTextField " + attributes[i].getFieldName() + ";");
        break;
      case AbstractAttribute.DATE:
        textPresentDialog1.addLine("  private DataDateField " + attributes[i].getFieldName() + ";");
        break;
      }
    }
    textPresentDialog1.addLine("");
    textPresentDialog1.addLine("// creation of input fields");
    for (i = 0; i < attributes.length; i++) {
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createCheckBox(\"" + attributes[i].getFieldName() + "\", \"" + "\");");
        break;
      case AbstractAttribute.MEMO:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createTextArea(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName() + "\");");
        break;
      case AbstractAttribute.DECIMAL:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createDecimalField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName() + "\");");
        break;
      case AbstractAttribute.NUMBER:
        if (attributes[i].getScale() > 0) {
          textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createDecimalField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        } else {
          textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createIntField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        }
        break;
      case AbstractAttribute.INTEGER:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createIntField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.BIGINT:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createIntField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.FLOAT:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createFloatField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.CHAR:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createTextField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.VARCHAR:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createTextField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.DATE:
        textPresentDialog1.addLine("    " + attributes[i].getFieldName() + " = createDateField(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      }
    }
    textPresentDialog1.addLine("");
    textPresentDialog1.addLine("// creation of presentation labels");
    for (i = 0; i < attributes.length; i++) {
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        textPresentDialog1.addLine("    createBoolPresenter(\"" + attributes[i].getFieldName() + "\", \"" + "\");");
        break;
      case AbstractAttribute.MEMO:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName() + "\");");
        break;
      case AbstractAttribute.DECIMAL:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName() + "\");");
        break;
      case AbstractAttribute.NUMBER:
        if (attributes[i].getScale() > 0) {
          textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        } else {
          textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        }
        break;
      case AbstractAttribute.INTEGER:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.BIGINT:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.FLOAT:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.CHAR:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.VARCHAR:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      case AbstractAttribute.DATE:
        textPresentDialog1.addLine("    createTextPresenter(\"" + attributes[i].getDescription() + "\", \"" + attributes[i].getFieldName()  + "\");");
        break;
      }
    }
    textPresentDialog1.show();
  }

}

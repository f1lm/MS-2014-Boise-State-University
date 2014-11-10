/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import java.awt.print.Paper;
import java.io.PrintWriter;

import de.must.applet.Constants;
import de.must.appletserver.RemoteElement.Context;
import de.must.appletserver.SessionData.Report;
import de.must.middle.ConfirmationMatter;
import de.must.middle.ConversationMatter;
import de.must.print.FontSpecification;
import de.must.print.PrintablePage;
import de.must.print.PrintablePage.PrintableItem;
import de.must.print.PrintablePage.PrintableTextItem;
import de.must.util.StringFunctions;

public class ToAppletWriter {
  
  private PrintWriter out;
  
  public ToAppletWriter(PrintWriter printWriter) {
    this.out = printWriter;
  }
  
  public void println(String line) {
    // System.out.println(line); // debug
    out.println(line);
  }

  public void sendTitle(String title) {
    println(Constants.TITLE_BEGIN + title + Constants.TITLE_END);
  }

  public void sendConcerning(String concerning) {
    println(Constants.CONCERNING_BEGIN + concerning + Constants.CONCERNING_END);
  }

  public void sendSubconcerning(String subconcerning) {
    println(Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG + subconcerning + Constants.CONCERNING_SUBLEVEL1_END_TAG);
  }
  
  public void setHeader(String title) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_HEADER + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + title + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void sendTodoAction(String todo) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void sendTodoAction(String todo, String id) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
    println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void sendClearCommand() {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.CLEAR_DETAILS + Constants.TODO_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void setValue(String id, String value) {
    setValue(id, value, null);
  }
  
  public void setValue(String id, String value, String editBeginValue) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_VALUE + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + StringFunctions.replaceAll(value,"\n", Constants.NEW_LINE) + Constants.VALUE_TAG_END);
    if (editBeginValue != null && !editBeginValue.equals(value)) {
      println(Constants.VARIANT1_TAG_BEGIN + StringFunctions.replaceAll(editBeginValue,"\n", Constants.NEW_LINE) + Constants.VARIANT1_TAG_END);
    }
    println(Constants.ACTION_END_TAG);
  }

  public void sendContext(Context context) {
    sendTitle(context.title);
    sendConcerning(context.concerning);
    sendSubconcerning(context.concerningSubLevel);
  }

  public void setVisible(String id, boolean b) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_VISIBLE + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + b + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }

  public void setEnabled(String id, boolean enabled) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_ENABLED + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + enabled + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }

  public void openConfirmation(ConfirmationMatter confirmationMatter) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.CONFIRM_VIA_DIALOG + Constants.TODO_TAG_END);
    println(Constants.VARIANT1_TAG_BEGIN + confirmationMatter.getTitle() + Constants.VARIANT1_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + transform(confirmationMatter.getLines()) + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }

  public void openInfoDialog(ConversationMatter infoMatter) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.INFORMATION_DIALOG + Constants.TODO_TAG_END);
    if (infoMatter.getTitle() != null) {
      println(Constants.VARIANT1_TAG_BEGIN + infoMatter.getTitle() + Constants.VARIANT1_TAG_END);
    }
    println(Constants.VALUE_TAG_BEGIN + transform(infoMatter.getLines()) + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }

  public void setMessageToKeep(String message) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_MESSAGE_TO_KEEP + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + message + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }

  public void setSoundToPlay(String soundFileName) {
    println(Constants.SOUND_TAG_BEGIN + soundFileName + Constants.SOUND_TAG_END);
  }

  public void sendVeto(String message) {
    println(Constants.VETO_MESSAGE_TAG_BEGIN + message + Constants.VETO_MESSAGE_TAG_END);
  }

  public void open(Report report) {
    println(Constants.TODO_TAG_BEGIN + Constants.OPEN_REPORT + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + report.reportPath + Constants.VALUE_TAG_END);
    println(Constants.FIELD_LENGTH_BEGIN + report.openDelay + Constants.FIELD_LENGTH_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void open(HTMLDialog htmlDialog) {
    println(Constants.TODO_TAG_BEGIN + Constants.OPEN_HTML_DIALOG + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + htmlDialog.getDialogId() + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  /**
   * @see Paper#setSize(double, double)
   */
  public void setPaperSize(double width, double height) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_PAPER_SIZE + Constants.TODO_TAG_END);
    println(Constants.VARIANT1_TAG_BEGIN + width + Constants.VARIANT1_TAG_END);
    println(Constants.VARIANT2_TAG_BEGIN + height + Constants.VARIANT2_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  /**
   * @see Paper#setImageableArea(double, double, double, double)
   */
  public void setImageableArea(double x, double y, double width, double height) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.SET_IMAGABLE_AREA + Constants.TODO_TAG_END);
    println(Constants.VARIANT1_TAG_BEGIN + x + Constants.VARIANT1_TAG_END);
    println(Constants.VARIANT2_TAG_BEGIN + y + Constants.VARIANT2_TAG_END);
    println(Constants.VARIANT3_TAG_BEGIN + width + Constants.VARIANT3_TAG_END);
    println(Constants.VARIANT4_TAG_BEGIN + height + Constants.VARIANT4_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void printItem(int page, PrintableItem item) {
    if (item instanceof PrintablePage.PrintableLine) {
      PrintablePage.PrintableLine line = (PrintablePage.PrintableLine)item;
      println(Constants.ACTION_BEGIN_TAG);
      println(Constants.TODO_TAG_BEGIN + Constants.PRINT_ITEM + Constants.TODO_TAG_END);
      println(Constants.ID_TAG_BEGIN + page + Constants.ID_TAG_END);
      println(Constants.VALUE_TAG_BEGIN + Constants.LINE_VALUE + Constants.VALUE_TAG_END);
      println(Constants.VARIANT1_TAG_BEGIN + line.getPositionX() + Constants.VARIANT1_TAG_END);
      println(Constants.VARIANT2_TAG_BEGIN + line.getPositionY() + Constants.VARIANT2_TAG_END);
      println(Constants.VARIANT3_TAG_BEGIN + line.getPositionX2() + Constants.VARIANT3_TAG_END);
      println(Constants.VARIANT4_TAG_BEGIN + line.getPositionY2() + Constants.VARIANT4_TAG_END);
      println(Constants.ACTION_END_TAG);
    } else {
      printItem(page, item, 0);
    }
  }
  
  private FontSpecification lastFont;;
  
  public void printItem(int page, PrintableItem item, double maxLength) {
    if (item instanceof PrintableTextItem) {
      PrintableTextItem tItem = (PrintableTextItem) item;
      FontSpecification font = tItem.getFontSpec();
      if (!font.equals(lastFont)) {
        println(Constants.ACTION_BEGIN_TAG);
        println(Constants.TODO_TAG_BEGIN + Constants.SET_FONT + Constants.TODO_TAG_END);
        println(Constants.VARIANT1_TAG_BEGIN + font.getStyle() + Constants.VARIANT1_TAG_END);
        println(Constants.VARIANT2_TAG_BEGIN + font.getSize() + Constants.VARIANT2_TAG_END);
        println(Constants.ACTION_END_TAG);
        lastFont = font;
      }
    }
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.PRINT_ITEM + Constants.TODO_TAG_END);
    println(Constants.ID_TAG_BEGIN + page + Constants.ID_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + item.toString() + Constants.VALUE_TAG_END);
    println(Constants.VARIANT1_TAG_BEGIN + item.getPositionX() + Constants.VARIANT1_TAG_END);
    println(Constants.VARIANT2_TAG_BEGIN + item.getPositionY() + Constants.VARIANT2_TAG_END);
    if (maxLength > 0) println(Constants.FIELD_LENGTH_BEGIN + (int)maxLength + Constants.FIELD_LENGTH_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void removeTab(String title) {
    println(Constants.ACTION_BEGIN_TAG);
    println(Constants.TODO_TAG_BEGIN + Constants.REMOVE_TAB + Constants.TODO_TAG_END);
    println(Constants.VALUE_TAG_BEGIN + title + Constants.VALUE_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void addTodoTag(String todo) {
    println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
  }
  
  public void addIdTag(String value) {
    println(Constants.ID_TAG_BEGIN + value + Constants.ID_TAG_END);
  }

  public void addValueTag(Integer value) {
    addValueTag(Integer.toString(value));
  }

  public void addValueTag(String value) {
    println(Constants.VALUE_TAG_BEGIN + value + Constants.VALUE_TAG_END);
  }

  public void addVariant1Tag(Integer variant1) {
    addVariant1Tag(Integer.toString(variant1));
  }

  public void addVariant2Tag(Integer variant2) {
    addVariant2Tag(Integer.toString(variant2));
  }

  public void addVariant3Tag(Integer variant3) {
    addVariant3Tag(Integer.toString(variant3));
  }

  public void addVariant4Tag(Integer variant4) {
    addVariant4Tag(Integer.toString(variant4));
  }

  public void addVariant5Tag(Integer variant5) {
    addVariant5Tag(Integer.toString(variant5));
  }

  public void addVariant6Tag(Integer variant6) {
    addVariant6Tag(Integer.toString(variant6));
  }

  public void addVariant7Tag(Integer variant7) {
    addVariant7Tag(Integer.toString(variant7));
  }

  public void addVariant8Tag(Integer variant8) {
    addVariant8Tag(Integer.toString(variant8));
  }

  public void addVariant9Tag(Integer variant9) {
    addVariant9Tag(Integer.toString(variant9));
  }

  public void addVariant10Tag(Integer variant10) {
    addVariant10Tag(Integer.toString(variant10));
  }

  public void addVariant11Tag(Integer variant11) {
    addVariant11Tag(Integer.toString(variant11));
  }

  public void addVariant1Tag(String variant1) {
    println(Constants.VARIANT1_TAG_BEGIN + variant1 + Constants.VARIANT1_TAG_END);
  }

  public void addVariant2Tag(String variant2) {
    println(Constants.VARIANT2_TAG_BEGIN + variant2 + Constants.VARIANT2_TAG_END);
  }

  public void addVariant3Tag(String variant3) {
    println(Constants.VARIANT3_TAG_BEGIN + variant3 + Constants.VARIANT3_TAG_END);
  }

  public void addVariant4Tag(String variant4) {
    println(Constants.VARIANT4_TAG_BEGIN + variant4 + Constants.VARIANT4_TAG_END);
  }

  public void addVariant5Tag(String variant5) {
    println(Constants.VARIANT5_TAG_BEGIN + variant5 + Constants.VARIANT5_TAG_END);
  }

  public void addVariant6Tag(String variant6) {
    println(Constants.VARIANT6_TAG_BEGIN + variant6 + Constants.VARIANT6_TAG_END);
  }

  public void addVariant7Tag(String variant7) {
    println(Constants.VARIANT7_TAG_BEGIN + variant7 + Constants.VARIANT7_TAG_END);
  }

  public void addVariant8Tag(String variant8) {
    println(Constants.VARIANT8_TAG_BEGIN + variant8 + Constants.VARIANT8_TAG_END);
  }

  public void addVariant9Tag(String variant9) {
    println(Constants.VARIANT9_TAG_BEGIN + variant9 + Constants.VARIANT9_TAG_END);
  }

  public void addVariant10Tag(String variant10) {
    println(Constants.VARIANT10_TAG_BEGIN + variant10 + Constants.VARIANT10_TAG_END);
  }

  public void addVariant11Tag(String variant11) {
    println(Constants.VARIANT11_TAG_BEGIN + variant11 + Constants.VARIANT11_TAG_END);
  }

  public void addVariant12Tag(String variant12) {
    println(Constants.VARIANT12_TAG_BEGIN + variant12 + Constants.VARIANT12_TAG_END);
  }

  private String transform(String[] lines) {
    StringBuffer result = new StringBuffer();
    if (lines.length > 0) {
      result.append(lines[0]);
      for (int i = 1; i < lines.length; i++) {
        result.append(Constants.NEW_LINE + lines[i]);
      }
    }
    return result.toString();
  }
  
  public void setContentDependingEnabling(MustTextField textField, MustButton button) {
    println(Constants.ACTION_BEGIN_TAG);
    addTodoTag(Constants.SET_CONTENT_ENABLING);
    println(Constants.ID_TAG_BEGIN + textField.name + Constants.ID_TAG_END);
    println(Constants.VARIANT1_TAG_BEGIN + button.actionID + Constants.VARIANT1_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
  public void switchFocus(MustTextField textField, MustButton button1, MustButton button2) {
    println(Constants.ACTION_BEGIN_TAG);
    addTodoTag(Constants.SWITCH_FOCUS);
    println(Constants.ID_TAG_BEGIN + textField.name + Constants.ID_TAG_END);
    println(Constants.VARIANT1_TAG_BEGIN + button1.actionID + Constants.VARIANT1_TAG_END);
    println(Constants.VARIANT2_TAG_BEGIN + button2.actionID + Constants.VARIANT2_TAG_END);
    println(Constants.ACTION_END_TAG);
  }
  
}

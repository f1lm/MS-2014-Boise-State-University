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

import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.util.Miscellaneous;

/**
 * Attribute list to layout components upon a panel line by line with a label
 * at the beginning of each line. After an attribute list is completely filled,
 * the labels may be packed according to the longest label via method
 * packlabel.
 * May be used e.g. to edit fields of a single database table record.
 * @author Christoph Mueller
 */
public class AttributeList implements InlayCenterContent {

  private class InfoLine extends RemoteElement {
    protected String value = "";
    public InfoLine(SessionData sessionData, String value) {
      super(sessionData);
      this.value = value;
    }
    @Override
    public void buildRemoteView(ToAppletWriter out) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_INFO_LINE + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + value + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    @Override
    public void setValues(ToAppletWriter out) {
      out.setValue(name, value);
    }
    @Override
    public void fetchValuesFromRequest(GeneralizedRequest request) {} // never needed here
    @Override
    public void selectAll() {
      // not necessary here
    }
    @Override
    public void requestFocus() {
      // not necessary here
    }
    @Override
    public void destroy() {
    }
  }

  private class Topic extends InfoLine {
    public Topic(SessionData sessionData, String value) {
      super(sessionData, value);
    }    
    @Override
    public void buildRemoteView(ToAppletWriter out) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_TOPIC + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + value + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
  }
  
  class Row {
    String label;
    boolean visible = true; // default visibility = true
    Vector<Remotable> remotables = new Vector<Remotable>();
    Row(Remotable firstRemotable) {
      this(null, firstRemotable);
    }
    Row(String label, Remotable firstRemotable) {
      this.label = label;
      this.remotables.add(firstRemotable);
    }
    void add(Remotable remotable) {
      this.remotables.add(remotable);
    }
    public void buildRemoteView(ToAppletWriter out) {
      if (!visible) return;
      if (label != null) {
        out.println(Constants.ACTION_BEGIN_TAG);
        out.println(Constants.TODO_TAG_BEGIN + Constants.NEW_ATTRIBUTE_ROW + Constants.TODO_TAG_END);
        out.println(Constants.LABEL_BEGIN + label + Constants.LABEL_END);
        out.println(Constants.ACTION_END_TAG);
      }
      Iterator<Remotable> iterator = remotables.iterator();
      while (iterator.hasNext()) {
        Remotable remotable = iterator.next();
        remotable.buildRemoteView(out);
      }
    }
    public void sendValuesTo(ToAppletWriter out) {
      Iterator<Remotable> iterator = remotables.iterator();
      while (iterator.hasNext()) {
        Remotable remotable = iterator.next();
        if (remotable instanceof RemoteElement) {
          ((RemoteElement)remotable).setValues(out);
        }
      }
    }
  }

  private static int counter = 0;
  
  private static synchronized String getUniqueName() {
    if (counter < Integer.MAX_VALUE) counter ++;
    else counter = 1;
    return "AttrLi" + String.valueOf(counter);
  }

  private String id = getUniqueName();
  protected Panel father;
  private SessionData sessionData;
  private boolean noEmptyValues = false;
  private Vector<Row> rows;

  public AttributeList(SessionData sessionData) {
    this.sessionData = sessionData;
    rows = new Vector<Row>();
  }
  
  public String getID() {
    return id;
  }

  //----------------------------------------------------------------------------

  /**
   * Adds a remotable with its label into a new line.
   * @param label the line label
   * @param remotable
   */
  public void append(String label, Remotable remotable) {
    rows.add(new Row(Miscellaneous.getReplacement(label), remotable));
  }

  /**
   * Appends a button to the attribute list. Other classes of this package
   * provide advanced append instructions that include instruction
   * to guarantee support of action listening.
   * (package private)
   * @param button the button to append
   */
  void append(MustButton button) {
    append((Remotable)button);
  }
  
  /**
   * Appends a remotable to the current line.
   * @param remotable the remotable to append
   */
  public void append(Remotable remotable) {
    if (rows.size() == 0) {
      rows.add(new Row(remotable));
    } else {
      rows.lastElement().add(remotable);
    }
  }

  public void append(String text) {
    append(new Label(sessionData, text));
  }

  public void appendTopic(String text) {
    append(new Topic(sessionData, text));
  }

  public void appendInfoLine(String text) {
    rows.add(new Row(new InfoLine(sessionData, text)));
  }

  /**
   * Sets the tool tip text to the last added component.
   * @param toolTipText the tool tip text to associate
   */
  protected void setLastComponentsToolTipText(String toolTipText) {
    rows.lastElement().remotables.lastElement().setToolTipText(toolTipText);
  }

  /**
   * Sets the visibility of the current row.
   * Must be set before remote user interface is build, afterwards this method
   * has no effect.
   * @param visible true to make the row visible; false to make it invisible
   */
  public void setCurrentRowVisible(boolean visible) {
    setRowVisible(rows.lastElement(), visible);
  }
  
  /**
   * Sets the visibility of a row.
   * @param row the row to be set visible or invisible
   * @param visible true to make the row visible; false to make it invisible
   */
  public void setRowVisible(Row row, boolean visible) {
    row.visible = visible;
  }
  
  /**
   * Sets the visibility of a row.
   * @param row the index of the row to be set visible or invisible
   * @param visible true to make the row visible; false to make it invisible
   */
  public void setRowVisible(int row, boolean visible) {
    setRowVisible(rows.elementAt(row), visible);
  }
  
  //----------------------------------------------------------------------------

  public void buildRemoteView(ToAppletWriter out) {
    Iterator<Row> iterator = rows.iterator();
    while (iterator.hasNext()) {
      Row row = iterator.next();
      row.buildRemoteView(out);
    }
  }

  public void sendValuesTo(ToAppletWriter out) {
    Iterator<Row> iterator = rows.iterator();
    while (iterator.hasNext()) {
      Row row = iterator.next();
      row.sendValuesTo(out);
    }
  }
  
  /**
   * Controls synchronization of user input and mirroring object values.
   * To be called after each POST action to update object values by user input.
   * @param request
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    Iterator<Row> iterator = rows.iterator();
    while (iterator.hasNext()) {
      Row row = iterator.next();
      Iterator<Remotable> iterator2 = row.remotables.iterator();
      while (iterator2.hasNext()) {
        Remotable remotable = iterator2.next();
        // if (remotable instanceof MustInputField) {
          remotable.fetchValuesFromRequest(request);
        // }
      }
    }
  }

  public void setNoEmptyValues(boolean newNoEmptyValues) {
    noEmptyValues = newNoEmptyValues;
  }

  public boolean isNoEmptyValues() {
    return noEmptyValues;
  }

}

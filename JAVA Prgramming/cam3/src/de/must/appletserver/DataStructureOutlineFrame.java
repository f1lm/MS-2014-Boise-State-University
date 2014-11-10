/*
 * Copyright (c) 2011-2011 Christoph Mueller. All rights reserved.
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

import de.must.applet.Constants;
import de.must.dataobj.DataChangeListener;
import de.must.dataobj.DataObject;
import de.must.dataobj.WhereCondition;
import de.must.middle.ApplConstStd;

/**
 * Frame to present hierarchical data in a tree with filter option.
 * @author Christoph Mueller
 */
public abstract class DataStructureOutlineFrame extends RemoteUserInterface {

  private DataChangeListener contentDataChangeListener; // only to prevent being garbage collected
  private DataObject contentDataObject;
  private String idName;
  private String descriptionName;
  private MustTextField targetTextField;
  private int type;

  public DataStructureOutlineFrame(SessionData sessionData, DataObject contentDataObject, String idName, String descriptionName, MustTextField targetTextField, String title) {
    this(sessionData, contentDataObject, idName, descriptionName, targetTextField, title, ApplConstStd.TYPE_HIERARCHY_BY_LENGTH);
  }
  
  public DataStructureOutlineFrame(SessionData sessionData, DataObject contentDataObject, String idName, String descriptionName, MustTextField targetTextField, final String title, int type) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return title; }
      public String getTabId() { return title; }
      public String getConcerning() { return Constants.OUTLINE_WINDOW; }
    });
    this.contentDataObject = contentDataObject;
    this.appellation = title;
    this.type = type;
    this.idName = idName;
    this.descriptionName = descriptionName;
    this.targetTextField = targetTextField;
  }
  
  public void setTargetTextField(MustTextField targetTextField) {
    this.targetTextField = targetTextField;
  }
  
  @Override
  public void process(GeneralizedRequest request) {
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (!buildDone) {
      buildRemoteViewFromScratch(out);
      buildDone = true;
    }
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendConcerning(getConcerning());
    if (targetTextField != null) {
      out.println(Constants.TODO_TAG_BEGIN + Constants.SET_TARGETTEXTFIELD + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + targetTextField.getName() + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    super.buildRemoteView(out);
    setVisible(false);
  }
  
  private void buildRemoteViewFromScratch(ToAppletWriter out) {
    boolean success = contentDataObject.select("*", (WhereCondition)null, idName);
    if (success) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.sendConcerning(getConcerning());
      out.println(Constants.TODO_TAG_BEGIN + Constants.INITIALIZE + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + getTabId() + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
      while (contentDataObject.nextRow()) {
        out.println(Constants.ACTION_BEGIN_TAG);
        out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ITEM + Constants.TODO_TAG_END);
        out.println(Constants.VARIANT1_TAG_BEGIN + contentDataObject.getText(idName) + Constants.VARIANT1_TAG_END);
        out.println(Constants.VARIANT2_TAG_BEGIN + contentDataObject.getText(descriptionName) + Constants.VARIANT2_TAG_END);
        out.println(Constants.ACTION_END_TAG);
      }
      out.println(Constants.ACTION_BEGIN_TAG);
      out.sendConcerning(getConcerning());
      out.println(Constants.TODO_TAG_BEGIN + Constants.APPLY_TREE + Constants.TODO_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    } else {
      
    }
  }

  private void addTodo(String todo, ToAppletWriter out) {
    out.println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
  }
  
}
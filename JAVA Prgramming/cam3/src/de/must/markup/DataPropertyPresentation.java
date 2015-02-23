/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.dataobj.*;
          
/**
 * Frame-like container to enclose data presenting components with
 * database field association and controlling load action.
 * Is used for delete confirmation as well.
 * Used for property presentation of a single database record.
 * It is meant to contain several markupables like e.g. DataTextPresenter
 * @author Christoph Mueller
 */
public abstract class DataPropertyPresentation extends PropertyPresentation {

  private String title;
  private Invokable submitter;
  private Identifier identifier;
  private PresentationSubmission submission = new PresentationSubmission();

  public static final int NEW_LINE = 0;
  public static final int STAY_IN_LINE = 1;

  public static final int MODE_SHOW = 0;
  public static final int MODE_DELETE = 1;

  protected DataObject mainDataObject;
  private HelpContext deleteHelpContext;
  private Presentable[] PresentableComponents;
  private int presentableCapacity = 200;
  private int countPresentable = -1;
  private DataTextField[] frameDisplayTitleFields;

  /**
   * Constructs a new data property presentation.
   * @param mainDataObject the data object that is to be used mainly
   * @param sessionData the session's public data
   */
  public DataPropertyPresentation(DataObject mainDataObject, SessionData sessionData) {
    super(sessionData);
    this.mainDataObject = mainDataObject;
    PresentableComponents = new Presentable[presentableCapacity];
    mainDataObject.newRow(); // to get column length via meta data
  }

  /**
   * Sets the title of the property presentation.
   * @param title the title of the property presentation
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * Returns the title of the property presentation
   * @return the title of the property presentation
   */
  public String getTitle() {
    StringBuffer combinedTitle = new StringBuffer();
    if (submitter.getSubmission().getSubmittedAction() == DataList.ACTION_DELETE) {
      combinedTitle = new StringBuffer(sessionData.getFrameworkResourceString("TEXT_DELETE_ENTRY") + "? (!)");
    } else {
      combinedTitle = new StringBuffer(sessionData.getFrameworkResourceString("TEXT_VIEW_ENTRY"));
    }
    if (title != null) combinedTitle.append(" (" + title + ")");
    return combinedTitle.toString();
  }

  /**
   * Sets the component's special context help for delete confirmation use.
   * @param helpTopic the delete confirmation context help's topic
   * @param helpTarget the delete confirmation context help's target
   */
  public void setDeleteHelpContext(String helpTopic, String helpTarget) {
    this.deleteHelpContext = new HelpContext(helpTopic, helpTarget);
  }

  /**
   * Returns the component's help context.
   * @return the component's help context
   */
  public HelpContext getHelpContext() {
    if (getMode() == MODE_DELETE) return deleteHelpContext;
    else return super.getHelpContext();
  }

  /**
   * Sets the submitter of this dialog step.
   * @param submitter the calling submitter
   */
  public void setSubmitter(Invokable submitter) {
    this.submitter = submitter;
  }

  /**
   * Dummy method - not supported yet.
   * @param tabSize the tab size - not supported yet
   */
  protected void setTabSize(int tabSize) {
  }

  /**
   * Dummy method - not supported yet.
   * @param lineCapacity the line capacity - not supported yet
   */
  protected void newPanel(int lineCapacity) {
  }

  /**
   * Dummy method - not supported yet.
   * @param tabLabel the tab label - not supported yet
   * @param lineCapacity the line capacity - not supported yet
   */
  protected void newPanel(String tabLabel, int lineCapacity) {
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected text presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created text presentation field
   */
  protected DataTextPresenter createTextPresenter(String label, String name) {
    DataTextPresenter temp = new DataTextPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected text presentation field in the same line as
   * previously used.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created text presentation field
   */
  protected DataTextPresenter createTextPresenter(String name) {
    DataTextPresenter temp = new DataTextPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected link presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created text presentation field
   */
  protected DataLinkPresenter createLinkPresenter(String label, String name) {
    DataLinkPresenter temp = new DataLinkPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected link presentation field in the same line as
   * previously used.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created text presentation field
   */
  protected DataLinkPresenter createLinkPresenter(String name) {
    DataLinkPresenter temp = new DataLinkPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected integer presentation field in the same line as
   * previously used.
   * @param label the description of the attribute line.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created integer presentation field
   */
  protected DataIntPresenter createIntPresenter(String label, String name) {
    DataIntPresenter temp = new DataIntPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected integer presentation field in the same line as
   * previously used.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created integer presentation field
   */
  protected DataIntPresenter createIntPresenter(String name) {
    DataIntPresenter temp = new DataIntPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected decimal presentation field in the same line as
   * previously used.
   * @param label the description of the attribute line.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created decimal presentation field
   */
  protected DataDecimalPresenter createDecimalPresenter(String label, String name) {
    DataDecimalPresenter temp = new DataDecimalPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected decimal presentation field in the same line as
   * previously used.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created decimal presentation field
   */
  protected DataDecimalPresenter createDecimalPresenter(String name) {
    DataDecimalPresenter temp = new DataDecimalPresenter(name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected date presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created date presentation field
   */
  protected DataDatePresenter createDatePresenter(String label, String name) {
    DataDatePresenter temp = new DataDatePresenter(sessionData.locale, name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected date presentation field in a the same line as
   * previously used.
   * @param name the name of the field which has to be the column name of the database table.
   * @return the created date presentation field
   */
  protected DataDatePresenter createDatePresenter(String name) {
    DataDatePresenter temp = new DataDatePresenter(sessionData.locale, name, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected reference presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param assignedColumnName the name of the column to assign the reference
   * @param referenceDataObject the reference (key) data object
   * @param presentableColumnName the name of the column to be presented
   * @return the created reference presentation field
   */
  protected DataReferencePresenter createReferencePresenter(String label, String assignedColumnName, DataObject referenceDataObject, String presentableColumnName) {
    DataReferencePresenter temp = new DataReferencePresenter(mainDataObject, assignedColumnName, referenceDataObject, presentableColumnName);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected reference presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param assignedColumnName the name of the column to assign the reference
   * @param content the static content of assign the reference
   * @return the created reference presentation field
   */
  protected DataReferencePresenter createReferencePresenter(String label, String assignedColumnName, String[][] content) {
    DataReferencePresenter temp = new DataReferencePresenter(mainDataObject, assignedColumnName, content);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected boolean presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param checkText the text to be presented if the value of the boolean
   * presenter is true
   * @param assignedColumnName the name of the field which has to be the column name of the database table
   * @return the created boolean presentation field
   */
  protected DataBoolPresenter createBoolPresenter(String label, String checkText, String assignedColumnName) {
    DataBoolPresenter temp = new DataBoolPresenter(assignedColumnName, mainDataObject, checkText);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected boolean presentation field in the same line as
   * previously used.
   * @param checkText the text to be presented if the value of the boolean
   * presenter is true
   * @param assignedColumnName the name of the field which has to be the column name of the database table
   * @return the created boolean presentation field
   */
  protected DataBoolPresenter createBoolPresenter(String checkText, String assignedColumnName) {
    DataBoolPresenter temp = new DataBoolPresenter(assignedColumnName, mainDataObject, checkText);
    registerPresentable(temp);
    // CurrentAttributeList.append(" / ");
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected image presentation field in a new line with
   * its describing label.
   * @param label the description of the attribute line.
   * @param loadDirectory the directory from where the images are to be loaded.
   * @return the created image presentation field
   */
  protected DataImageViewer createImagePresenter(String label, String loadDirectory) {
    DataImageViewer temp = new DataImageViewer(sessionData, loadDirectory, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected image presentation field.
   * @param loadDirectory the directory from where the images are to be loaded.
   * @return the created image presentation field
   */
  protected DataImageViewer createImagePresenter(String loadDirectory) {
    DataImageViewer temp = new DataImageViewer(sessionData, loadDirectory, mainDataObject);
    registerPresentable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Appends a string to the same line as previously used.
   * @param stringToAppend the string to add
   */
  protected void append(String StringToAppend) {
    currentAttributeList.append(StringToAppend);
  }

//------------------------------------------------------------------------------

  /**
   * Sets the tool tip text of the last used presentable.
   * @param toolTipText the presentable's tool tip text
   */
  protected void setToolTipText(String toolTipText) {
    PresentableComponents[countPresentable].setToolTipText(toolTipText);
  }

  private void registerPresentable(Presentable nextPresentable) {
    PresentableComponents[++countPresentable] = nextPresentable;
  }

  /**
   * Sets the title of the "frame" for display usage.
   * @param newFrameDisplayTitleField the field to determine the for Display title
   */
  protected void setFrameDisplayTitleField(DataTextField newFrameDisplayTitleField) {
    this.frameDisplayTitleFields = new DataTextField[] {newFrameDisplayTitleField};
  }

  /**
   * Sets the title of the "frame" for display usage.
   * @param newFrameDisplayTitleFields the fields to determine the for display title
   */
  protected void setFrameDisplayTitleField(DataTextField[] newFrameDisplayTitleFields) {
    this.frameDisplayTitleFields = newFrameDisplayTitleFields;
  }

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    super.init();
    identifier = submitter.getSubmission().getSubmittedIdentifier();
    loadValues();
  }

  /**
   * Returns the default tag sequence to represent the component in markup languages.
   * @return the default tag sequence to represent the component in markup languages
   */
  public String getTagSequence() {
    this.dialogNbr = sessionData.dialogNbr;
    StringBuffer tagSequence = new StringBuffer(getHeader());
    tagSequence.append("<form action=\"" + sessionData.getBaseURL() + "\" method=POST>");
    tagSequence.append("<input type=\"hidden\" name=" + "\"" + NAME_FOR_DIALOG_NBR + "\"" + " value=\"" + dialogNbr + "\">");
    tagSequence.append(currentAttributeList.getTagSequence());
    tagSequence.append("<br>");
    tagSequence.append("<center>");
    tagSequence.append("<input type=\"submit\" name=" + "\"" + NAME_FOR_OK_ACTION + "\"" + " value=\"     OK     \">");
    if (isCancelToOffer()) {
      tagSequence.append("&nbsp;&nbsp;");
      tagSequence.append("<input type=\"submit\" name=" + "\"" + NAME_FOR_CANCEL_ACTION + "\"" + " value=\"Abbrechen\">");
    }
    tagSequence.append("</center>");
    tagSequence.append("</form>");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Returns the description of the presented entry.
   * @return the description of the presented entry
   */
  public String getEntryDescription() {
    StringBuffer title = new StringBuffer();
    if (frameDisplayTitleFields != null) {
      int i;
      for (i = 0; i < frameDisplayTitleFields.length; i++) {
        title.append(frameDisplayTitleFields[i].getText() + " ");
      }
    }
    return title.toString();
  }

  /**
   * Returns true if the button cancel should be offered.
   * @return true if the button cancel should be offered
   */
  public boolean isCancelToOffer() {
    return (submitter.getSubmission().getSubmittedAction() == DataList.ACTION_DELETE);
  }

  /**
   * Returns the mode which may be
   * <code>{@link #MODE_SHOW}</code> or
   * <code>{@link #MODE_DELETE}</code>
   * @return the mode
   */
  public int getMode() {
    switch (submitter.getSubmission().getSubmittedAction()) {
    case DataList.ACTION_DELETE:
      return MODE_DELETE;
    default:
      return MODE_SHOW;
    }
  }

  /**
   * Allows the invokable to react to the request.
   * @param the request to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (request.getParameter(NAME_FOR_CANCEL_ACTION) != null) {
      setStackMovement(-1);
      return;
    }
    // default button: if (request.getParameter(NAME_FOR_OK_ACTION) != null) {
    // (Enter doesn't update button's parameter)
      if (submitter.getSubmission().getSubmittedAction() == DataList.ACTION_DELETE) {
        mainDataObject.delete(identifier);
      }
      setStackMovement(-1);
      return;
    // }
  }

  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifyValue the primary key integer value.
   * @return
   */
  protected void loadValues() {
    mainDataObject.load(identifier);
    for (int i = 0; i <= countPresentable; i++) {
      PresentableComponents[i].loadValue();
    }
  }

  /**
   * Returns the submission details for the next invokable in stack.
   * @return the submission details
   */
  public Submission getSubmission() {
    return submission;
  }

  /**
   * Returns true if the invokable wants to be finalized after request is worked off.
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

  /**
   * Presentation specific submission informations.
   */
  class PresentationSubmission extends Submission {
  }

}

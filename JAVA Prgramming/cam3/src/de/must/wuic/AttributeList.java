/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

package  de.must.wuic;

import javax.swing.*;

import de.must.util.Miscellaneous;

import java.awt.*;
import java.util.Vector;

/**
 * Attribute list to layout components upon a panel line by line with a label
 * at the beginning of each line.
 * May be used e.g. to edit fields of a single database table record.
 * @author Christoph Mueller
 */
public class AttributeList extends JPanel implements ContextHelp {

  private GridBagLayout layout;
  private String helpTopic;
  private String helpTarget;
  private boolean automaticColon = true;
  private int startWordWrapping = 60;

  private Vector<JComponent> labels = new Vector<JComponent>();
  private Vector<JPanel> rowContainerPanels = new Vector<JPanel>();
  private int lastRow = -1;
  private JPanel lastFieldPanel;
  
  private FlowLayout flowLayoutForAttrContainer;
  private JLabel refLabel = new JLabel();
  private Font commonFont = refLabel.getFont();
  protected boolean imageAdded = false;

  /**
   * Constructs a new attribute list.
   */
  public AttributeList() {
    layout = new GridBagLayout();
    setLayout(layout);
    GridBagConstraints constr = new GridBagConstraints();
    constr.gridx = 99;
    constr.gridy = 99;
    constr.weightx = 1;
    constr.weighty = 1;
    add(new JLabel(), constr); // dummy to move attributes into northwest corner
    flowLayoutForAttrContainer = new FlowLayout();
    flowLayoutForAttrContainer.setVgap(0);
    // int standardFontSize = 11;
    // int commonFontSize = commonFont.getSize();
    // not wished anymore: startWordWrapping = startWordWrapping * standardFontSize / commonFontSize;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    this.helpTopic = helpTopic;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
    this.helpTopic = helpTopic;
    this.helpTarget = helpTarget;
  }

  /**
   * Returns the topic of the component's help context.
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * Returns the target of the component's help context.
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Appends an image icon to the right of the other components.
   * @param imageIcon
   */
  public void append(ImageIcon imageIcon) {
    GridBagConstraints constraints = new GridBagConstraints();
    constraints.gridx = 2;
    constraints.gridy = 0;
    constraints.weightx = 1;
    constraints.gridheight = lastRow;
    constraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
    constraints.insets = new java.awt.Insets(2,2,2,2);
    add(new JLabel(imageIcon), constraints);
    imageAdded = true;
  }

  /**
   * Adds an attribute with its label into a new line.
   * @param attrDesc the label to add
   * @param component the component to add
   */
  public void append(String attrDesc, JComponent component) {
    lastRow++;
    attrDesc = Miscellaneous.getReplacement(attrDesc);
    GridBagConstraints labelConstraints = new GridBagConstraints();
    labelConstraints.gridx = 0;
    labelConstraints.gridy = lastRow;
    GridBagConstraints constraints = new GridBagConstraints();
    constraints.gridx = 1;
    constraints.gridy = lastRow;
    constraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
    constraints.weightx = 1;
    if (component instanceof JLabel) {
      labelConstraints.anchor = java.awt.GridBagConstraints.NORTHEAST;
      labelConstraints.insets = new java.awt.Insets(2,4,2,0);
      constraints.insets = new java.awt.Insets(2,0,2,0);
    } else if (component instanceof JTextArea || (component instanceof JScrollPane && ((JScrollPane)component).getViewport() != null && ((JScrollPane)component).getViewport().getView() instanceof JTextArea)) {
      labelConstraints.anchor = java.awt.GridBagConstraints.NORTHEAST;
      labelConstraints.insets = new java.awt.Insets(2,4,4,0);
      constraints.insets = new java.awt.Insets(2,0,2,0);
    } else {
      labelConstraints.anchor = java.awt.GridBagConstraints.EAST;
      labelConstraints.insets = new java.awt.Insets(4,4,4,0);
      constraints.insets = new java.awt.Insets(2,0,2,0);
    }
    if (imageAdded) constraints.gridwidth = 2;
    if (automaticColon & !attrDesc.equals("")) attrDesc = attrDesc + ":";
    JLabel attrLabel = new JLabel(attrDesc);
    add(attrLabel, labelConstraints);
    lastFieldPanel = new JPanel(flowLayoutForAttrContainer);
    lastFieldPanel.add(component);
    add(lastFieldPanel, constraints);
    labels.add(attrLabel);
    rowContainerPanels.add(lastFieldPanel);
    if (component.getAccessibleContext().getAccessibleName() == null) {
      component.getAccessibleContext().setAccessibleName(attrDesc);
    }
  }
  
  public void newRow(String label) {
    lastRow++;
    label = Miscellaneous.getReplacement(label);
    GridBagConstraints labelConstraints = new GridBagConstraints();
    labelConstraints.gridx = 0;
    labelConstraints.gridy = lastRow;
    GridBagConstraints constraints = new GridBagConstraints();
    constraints.gridx = 1;
    constraints.gridy = lastRow;
    constraints.anchor = java.awt.GridBagConstraints.WEST;
    constraints.weightx = 1;
    labelConstraints.anchor = java.awt.GridBagConstraints.EAST;
    labelConstraints.insets = new java.awt.Insets(4,4,4,0);
    constraints.insets = new java.awt.Insets(2,0,2,0);
    if (automaticColon & !label.equals("")) label = label + ":";
    JLabel attrLabel = new JLabel(label);
    add(attrLabel, labelConstraints);
    lastFieldPanel = new JPanel(flowLayoutForAttrContainer);
    add(lastFieldPanel, constraints);
    labels.add(attrLabel);
    rowContainerPanels.add(lastFieldPanel);
  }
  
  /**
   * Adds a component into a new line starting leftmost.
   * @param component the component to add
   */
  public void appendInNewRow(JComponent component) {
    append("", component);
  }

  /**
   * Adds a further component in the current line
   * @param component the component to add
   */
  public void append(JComponent component) {
    lastFieldPanel.add(component);
  }

  /**
   * Adds a further text in the current line
   * @param infoExtension the text to add
   */
  public void append(String infoExtension) {
    lastFieldPanel.add(getComponentForAttributeValue(infoExtension));
  }

  /**
   * Adds a label and a special attribute value into a new line.
   * Needed e.g. to present combined information which is not
   * representable by a single component.
   * @param specialAttributeValue the text to add
   */
  public void append(String attrDesc, String specialAttributeValue) {
    append(attrDesc, getComponentForAttributeValue(specialAttributeValue));
  }

  /**
   * Adds a topic in a new line spanning both columns.
   * @param topicDescription the topic text to add
   */
  public void appendTopic(String topicDescription) {
    lastRow++;
    GridBagConstraints labelConstraints = new GridBagConstraints();
    labelConstraints.gridx = 0;
    labelConstraints.gridy = lastRow;
    labelConstraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
    labelConstraints.insets = new java.awt.Insets(2,4,2,0);
    labelConstraints.gridwidth = 2;
    JLabel topicLabel = new JLabel(topicDescription);
    topicLabel.setFont(new Font(topicLabel.getFont().getName(), Font.BOLD, topicLabel.getFont().getSize()));
    add(topicLabel, labelConstraints);
    labels.add(topicLabel);
    rowContainerPanels.add(new JPanel()); // dummy
  }

  /**
   * Adds a topic in a new line spanning both columns.
   * @param topicDescription the topic text to add
   */
  public void appendInfoLine(String infoLine) {
    lastRow++;
    GridBagConstraints labelConstraints = new GridBagConstraints();
    labelConstraints.gridx = 0;
    labelConstraints.gridy = lastRow;
    labelConstraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
    labelConstraints.insets = new java.awt.Insets(2,4,2,0);
    labelConstraints.gridwidth = 2;
    JLabel topicLabel = new JLabel(infoLine);
    add(topicLabel, labelConstraints);
    labels.add(topicLabel);
    rowContainerPanels.add(new JPanel()); // dummy
  }

  public void appendFullRowSpan(JComponent component) {
    lastRow++;
    GridBagConstraints labelConstraints = new GridBagConstraints();
    labelConstraints.gridx = 0;
    labelConstraints.gridy = lastRow;
    labelConstraints.anchor = java.awt.GridBagConstraints.NORTHWEST;
    labelConstraints.insets = new java.awt.Insets(2,4,2,0);
    labelConstraints.gridwidth = 2;
    add(component, labelConstraints);
    rowContainerPanels.add(new JPanel()); // dummy
  }

  private JComponent getComponentForAttributeValue(String specialAttributeValue) {
		if (specialAttributeValue.length() > startWordWrapping
     || specialAttributeValue.indexOf('\n') != -1
     || specialAttributeValue.indexOf('\t') != -1) {
		  int columns = startWordWrapping;
		  if (imageAdded) columns = (int)((double)startWordWrapping * 1.2);
      MustTextArea textWrapper = new MustTextArea(specialAttributeValue, 1, columns);
      textWrapper.setBackground(refLabel.getBackground());
      textWrapper.setEditable(false);
      textWrapper.setFont(commonFont);
      return textWrapper;
    } else {
      return new JLabel(specialAttributeValue);
    }
  }
  
  public int getCurrentRowIndex() {
    return lastRow;
  }

  /**
   * Sets the visibility of the current row.
   * @param visible true to make the row visible; false to make it invisible
   */
  public void setCurrentRowVisible(boolean visible) {
    setRowVisible(lastRow, visible);
  }
  
  /**
   * Sets the visibility of a row.
   * @param row the row to be set visible or invisible
   * @param visible true to make the row visible; false to make it invisible
   */
  public void setRowVisible(int row, boolean visible) {
    labels.get(row).setVisible(visible);
    rowContainerPanels.get(row).setVisible(visible);
  }
  
  /**
   * Returns the layout manager's minimum layout size of all components.
   * @return the layout manager's minimum layout size of all components
   */
  public Dimension getMinimumLayoutSize() {
    return layout.minimumLayoutSize(this);
  }
  
}


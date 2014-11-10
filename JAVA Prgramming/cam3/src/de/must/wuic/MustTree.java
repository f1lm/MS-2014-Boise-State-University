/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.awt.event.MouseEvent;
import java.util.Enumeration;
import java.util.Vector;

import javax.swing.JScrollPane;
import javax.swing.JTree;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreePath;

import de.must.dataobj.Identifier;
import de.must.io.TextFile;
import de.must.middle.ApplConstStd;
import de.must.util.Callback;

/**
 * Scrollpane with tree.
 * @author Christoph Mueller
 */
public class MustTree extends JScrollPane implements ListSelectionListener, AnySelectionSpeaker {

  protected static final int HIERARCHIE_DEPTH = 15;
  
  private int type;
  
  private MustTextField targetTextField;
  private Callback callback;
  protected DefaultTreeModel treeModel;
  protected JTree tree;
  protected DefaultMutableTreeNode rootNode;
  private Loader loader;
  private String fileName;
  protected int i, level, currentIdLength;
  protected int[] idLength;
  protected DefaultMutableTreeNode[] levelNode;
  /** the entire content of the non-filtered tree in simple sequence */
  protected Vector<String> completeContent;
  /** the keys of all nodes matching the filter conditions */
  private Vector<String> filterResults;
  private Vector<AnySelectionListener> anySelectionListener;

  public MustTree(int type) {
    super();
    this.type = type;
  }
  
  /**
   * Sets the hierarchy type
   * @param type the new hierarchy type
   * @see #TYPE_HIERARCHY_BY_LENGTH
   * @see #TYPE_HIERARCHY_NONE
   */
  public void setType(int type) {
    this.type = type;
  }
  
  /**
   *
   * @param targetTextField
   */
  public void setTargetTextField(MustTextField targetTextField) {
    this.targetTextField = targetTextField;
  }
  
  public void setCallbackWhenDoubleClicked(Callback callback) {
    this.callback = callback;
  }

  /**
   * Initializes the tree model.
   */
  public void init() {
    rootNode = new DefaultMutableTreeNode();
    treeModel = new DefaultTreeModel(rootNode);
    level = 0;
    currentIdLength = 0;
    idLength = new int[HIERARCHIE_DEPTH];

    levelNode = new DefaultMutableTreeNode[HIERARCHIE_DEPTH];
    for (int i = 0; i < HIERARCHIE_DEPTH; i++) {
      levelNode[i] = null;
      idLength[i] = -1;
    }
  }

  public void addItem(String id, String description) {
    level = 0;
    String currentId = id;
    // if (currentId.endsWith(".")) currentId = currentId.substring(0, currentId.length()-1);
    currentIdLength = currentId.length();
    if (currentId.endsWith(".")) currentIdLength--;

    for (i = 1; i <= HIERARCHIE_DEPTH; i++) {
      if (idLength[i-1] == -1) {
        idLength[i-1] = currentIdLength;
        level = i;
        break;
      }
      if (idLength[i-1] >= currentIdLength) {
        idLength[i-1] = currentIdLength;
        level = i;
        break;
      }
    }
    
    while (level > 1 && levelNode[level-2] != null && !currentId.toLowerCase().startsWith(levelNode[level-2].toString().substring(0, idLength[level-2]).toLowerCase())) {
      level--; // current ID is not matching upper level
    }
    
    while(level > 1 && currentIdLength < idLength[level-1]) {
      level--; // current ID cannot be shorter than previous item of the same level
    }
    
    if (level > 0) { // autocorrect bad structure
      idLength[level-1] = currentIdLength;
    }
    
    if (type == ApplConstStd.TYPE_HIERARCHY_NONE) level = 1;

    for (i = level; i < idLength.length; i++) {
      levelNode[i] = null;
      idLength[i] = -1;
    }

    if (isMatchingFilter(currentId)) {
      levelNode[level-1] = new DefaultMutableTreeNode(currentId + "   " + description);
      if (level == 1) {
        rootNode.add(levelNode[0]);
      }
      if (level >= 2 & level <= HIERARCHIE_DEPTH) {
        levelNode[level-2].add(levelNode[level-1]);
      }
    } else {
      levelNode[level-1] = new DefaultMutableTreeNode(currentId + "   " + description + " not matching filter conditions");
    }

  }
  
  /**
   * Applies the model and adds the created tree to the viewport.
   */
  public void afterFill() {
    tree = new JTree(rootNode);
    if (tree.getFont().getSize() > 12) {
      tree.setRowHeight((int)(tree.getFont().getSize() * 1.3));
    }
    getViewport().add(tree);

    tree.addMouseListener(new java.awt.event.MouseListener() {
      public void mouseExited(MouseEvent e) {}
      public void mouseEntered(MouseEvent e) {}
      public void mouseClicked(MouseEvent e) {}
      public void mousePressed(MouseEvent e) {}
      public void mouseReleased(MouseEvent e) {
        if (e.getClickCount() == 2 && tree.getSelectionPath() != null
        && (tree.getSelectionPath().getPathCount() > 2
          || ApplConstStd.TYPE_HIERARCHY_NONE == type  
          )
        ) {
          if (targetTextField != null) targetTextField.setText(getSelectedItemKey());
          if (callback != null) callback.callback();
        }
      }
    });
    tree.addTreeSelectionListener(new TreeSelectionListener() {
      public void valueChanged(TreeSelectionEvent e) {
        fireSelectionChanged();
      }
    });
  }

  public void loadFromFile(String fileName) {
    loader = new Loader();
    this.fileName = fileName;
    loader.start();
  }

  private String IdLineToId(String idline) {
    int idLength;

    idLength = idline.indexOf("  ");
    if (idLength < 0) idLength = idline.indexOf(" ");
    if (idLength < 0) idLength = idline.length();
    return idline.substring(0, idLength);
  }

  private class Loader extends Thread {

    public void run() {
      rootNode.setUserObject("Aktenplan " + fileName);
      int i, l, currentIdLength = 0;
      int[] idLength = new int[HIERARCHIE_DEPTH];

      DefaultMutableTreeNode[] levelNode = new DefaultMutableTreeNode[HIERARCHIE_DEPTH];
      for (i = 0; i <= 14; i++) {
        levelNode[i] = null;
        idLength[i] = -1;
      }

      TextFile aktenplanReader = new TextFile(fileName);
      if (!aktenplanReader.getOpenResultText().equals("")) {
        levelNode[0] = new DefaultMutableTreeNode(aktenplanReader.getOpenResultText());
        rootNode.add(levelNode[0]);
        tree.expandRow(0);
        return;
      }

      while (aktenplanReader.nextLine()) {
        l = 0;
        currentIdLength = aktenplanReader.getLine().indexOf("  ");
        if (currentIdLength < 0) currentIdLength = aktenplanReader.getLine().indexOf(" ");
        if (currentIdLength < 0) currentIdLength = aktenplanReader.getLine().length();

        for (i = 1; i <= HIERARCHIE_DEPTH; i++) {
          if (idLength[i-1] == -1) {
            idLength[i-1] = currentIdLength;
            l = i;
            break;
          }
          if (idLength[i-1] == currentIdLength) {
            l = i;
            break;
          }
        }

        for (i = l; i <= 14; i++) idLength[i] = -1;

        levelNode[l-1] = new DefaultMutableTreeNode(aktenplanReader.getLine());
        if (l == 1) {
          rootNode.add(levelNode[0]);
        }
        if (l >= 2 & l <= HIERARCHIE_DEPTH) {
          levelNode[l-2].add(levelNode[l-1]);
        }
      }
      tree.expandRow(0);
    }
  }
  
  /**
   * Filters tree content.
   * @param fragment the String fragment that each node should contain
   */
  @SuppressWarnings("unchecked")
  public int filter(String fragment, boolean caseSensitive) {
    int result = 0;
    if (fragment.length() > 0) {
      String fragmentToCompare = fragment.toUpperCase();
      if (caseSensitive) {
        fragmentToCompare = fragment;
      }
      filterResults = new Vector<String>();
      // step 1: getting the items matching the filter
      if (completeContent == null) {
        // fist time we evaluate root node and fill Vector with complete content for additional filter settings
        completeContent = new Vector<String>();
        DefaultMutableTreeNode node;
        Enumeration<DefaultMutableTreeNode> enumeration = rootNode.preorderEnumeration();
        enumeration.nextElement(); // ignore root node
        while(enumeration.hasMoreElements()) {
          node = enumeration.nextElement();
          completeContent.add(node.toString());
          String nodeStringToCompare = node.toString().toUpperCase();
          if (caseSensitive) {
            nodeStringToCompare = node.toString();
          }
          if (nodeStringToCompare.indexOf(fragmentToCompare) != -1) {
            int keyEnd = node.toString().indexOf("  ");
            if (keyEnd != -1) {
              String regardedKey = node.toString().substring(0, keyEnd);
              filterResults.add(regardedKey);
              result++;
            }
          }
        }
      } else {
        // now we use completeContent, because rootNode is already filtered
        Enumeration<String> enumeration = completeContent.elements();
        while(enumeration.hasMoreElements()) {
          String line = enumeration.nextElement();
          String lineToCompare = line.toUpperCase();
          if (caseSensitive) {
            lineToCompare = line;
          }
          if (lineToCompare.indexOf(fragmentToCompare) != -1) {
            int keyEnd = lineToCompare.indexOf("  ");
            if (keyEnd != -1) {
              String regardedKey = line.substring(0, keyEnd);
              filterResults.add(regardedKey);
              result++;
            }
          }
        }
      }
    } else {
      filterResults = null;
    } 
    // step 2: show all items matching the filter conditions plus their path items
    init();
    int i, level, currentIdLength = 0;
    int[] idLength = new int[HIERARCHIE_DEPTH];

    DefaultMutableTreeNode[] levelNode = new DefaultMutableTreeNode[HIERARCHIE_DEPTH];
    for (i = 0; i <= 14; i++) {
      levelNode[i] = null;
      idLength[i] = -1;
    }
    Enumeration<String> enumeration = completeContent.elements();
    while(enumeration.hasMoreElements()) {
      level = 0;
      String line = enumeration.nextElement();
      currentIdLength = line.indexOf("  ");
      if (currentIdLength < 0) currentIdLength = line.indexOf(" ");
      if (currentIdLength < 0) currentIdLength = line.length();
      String currentId = line.substring(0, currentIdLength);

      for (i = 1; i <= HIERARCHIE_DEPTH; i++) {
        if (idLength[i-1] == -1) {
          idLength[i-1] = currentIdLength;
          level = i;
          break;
        }
        if (idLength[i-1] >= currentIdLength) {
          idLength[i-1] = currentIdLength;
          level = i;
          break;
        }
      }
      
      while (level > 1 && levelNode[level-2] != null && !currentId.toLowerCase().startsWith(levelNode[level-2].toString().substring(0, idLength[level-2]).toLowerCase())) {
        level--;
      }
      
      while(level > 1 && currentIdLength < idLength[level-1]) {
        level--;
      }
      
      if (level > 0) {
        idLength[level-1] = currentIdLength;
      }
      
      if (type == ApplConstStd.TYPE_HIERARCHY_NONE) level = 1;

      for (i = level; i <= 14; i++) idLength[i] = -1;

      if (isMatchingFilter(currentId)) {
        levelNode[level-1] = new DefaultMutableTreeNode(line);
        if (level == 1) {
          rootNode.add(levelNode[0]);
        }
        if (level >= 2 & level <= HIERARCHIE_DEPTH) {
          levelNode[level-2].add(levelNode[level-1]);
        }
      } else {
        levelNode[level-1] = new DefaultMutableTreeNode(line + " not matching filter conditions");
      }
    }
    afterFill();
    return result;
  }
  
  /**
   * Expand the entire tree.
   */
  @SuppressWarnings("unchecked")
  public void expandAll() {
    Enumeration<DefaultMutableTreeNode> enumeration = rootNode.breadthFirstEnumeration();
    tree.expandPath(new TreePath(rootNode));
    while(enumeration.hasMoreElements()) {
      DefaultMutableTreeNode node = enumeration.nextElement();
      tree.expandPath(new TreePath(node.getPath()));
    }
  }
  
  private boolean isMatchingFilter(String keyToCheck) {
    if (filterResults == null) return true;
    Enumeration<String> enumeration = filterResults.elements();
    while (enumeration.hasMoreElements()) {
      String element = enumeration.nextElement();
      if (element.startsWith(keyToCheck)) return true;
    }
    return false;
  }
  
  @SuppressWarnings("unchecked")
  public void expand(String key) {
    DefaultMutableTreeNode node;
    Enumeration<DefaultMutableTreeNode> enumeration = rootNode.breadthFirstEnumeration();
    while(enumeration.hasMoreElements()) {
      node = enumeration.nextElement();
      if (node.toString() != null) {
        int keyEnd = node.toString().indexOf("  ");
        if (keyEnd != -1) {
          String regardedKey = node.toString().substring(0, keyEnd);
          if (key.startsWith(regardedKey)) {
            TreePath path = new TreePath(node.getPath());
            tree.setSelectionPath(path);
            tree.scrollPathToVisible(path);
          }
        }
      }
    }
  }
  
  public String getSelectedItemKey() {
    if (tree.getSelectionPath() == null) return null;
    String line = tree.getSelectionPath().getLastPathComponent().toString();
    int currentIdLength = line.indexOf("  ");
    if (currentIdLength < 0) currentIdLength = line.indexOf(" ");
    if (currentIdLength < 0) currentIdLength = line.length();
    if (currentIdLength > 0) {
      return line.substring(0, currentIdLength);
    } else return "";
  }

  public JTree getTree() {
    return tree;
  }

  /**
   * Called when list selection changed to inform registrated components.
   * @param e the list selection event
   */
  public void valueChanged(ListSelectionEvent e) {
    fireSelectionChanged();
  }

  /**
   * Adds a selection listener to be notified about selection changed events.
   * @param l the selection listener to be notified
   */
  public synchronized void addAnySelectionListener(AnySelectionListener l) {
    Vector<AnySelectionListener> v = anySelectionListener == null ? new Vector<AnySelectionListener>(2) : new Vector<AnySelectionListener>(anySelectionListener);
    if (!v.contains(l)) {
      v.addElement(l);
      anySelectionListener = v;
    }
  }

  /**
   * Removes a selection listener to be notified about selection changed events.
   * @param l the selection listener
   */
   public synchronized void removeAnySelectionListener(AnySelectionListener l) {
    if (anySelectionListener != null && anySelectionListener.contains(l)) {
      Vector<AnySelectionListener> v = new Vector<AnySelectionListener>(anySelectionListener);
      v.removeElement(l);
      anySelectionListener = v;
    }
  }

  /**
   * Informs all registered components about the selection changed event.
   */
  public void fireSelectionChanged() {
    Identifier selIdent = new Identifier(tree.getSelectionPaths());
    fireSelectionChanged(new AnySelectionChangedEvent(tree.getSelectionCount(), true, selIdent));
  }

  private void fireSelectionChanged(AnySelectionChangedEvent e) {
    if (anySelectionListener != null) {
      Vector<AnySelectionListener> listeners = anySelectionListener;
      int count = listeners.size();
      for (int i = 0; i < count; i++)
      listeners.elementAt(i).selectionChanged(e);
    }
  }

}

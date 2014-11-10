/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import javax.swing.*;

import de.must.io.Logger;
import de.must.middle.FrameworkTextResource;
import de.must.util.Miscellaneous;

import java.awt.*;
import java.awt.event.*;
import java.util.*;
import java.lang.ref.WeakReference;

/**
 * A frame with context help, personalization and control about all instances.
 * @author Christoph Mueller
 */
public abstract class MustFrame extends JFrame implements ContextHelp, WindowListener, ComponentListener {

  private static final boolean verbose = false;
  private static Locale locale;
  private static Vector<WeakReference<MustFrame>> mainInstances = new Vector<WeakReference<MustFrame>>();
  private static Image defaultIconImage;
  private static java.util.List<? extends Image> defaultIcons;
  private static int closeConfirmId;
  
  private FrameworkTextResource frameworkTextResource;
  private int nbrOfReferences = 0;
  private String helpTopic;
  private String helpTarget;
  protected java.awt.Frame ownerFrame;
  private boolean isLaidOut;
  protected Cursor DefaultCursor = new Cursor(Cursor.DEFAULT_CURSOR);
  protected Cursor WaitCursor = new Cursor(Cursor.WAIT_CURSOR);
  private boolean dismissed = false;

  /**
   * Sets the default icon image for all frames.
   * Sample: MustFrame.setDefaultIconImage(Toolkit.getDefaultToolkit().getImage("images/mydefault.png"));
   * @param image the default icon image
   */
  public static void setDefaultIconImage(Image image) {
    defaultIconImage = image;
  }
  
  public static void setDefaultIconImages(java.util.List<? extends Image> icons) {
    defaultIcons = icons;
  }
  
  public static void setLocaleStatically(Locale locale) {
    MustFrame.locale = locale;
  }

  /**
   * Returns the main instance of frame class after creating it, if not available.
   * @param wishedFrameClass the class of the frame to be retrieved
   * @return the retrieved or created frame object 
   */
  public static synchronized MustFrame getOrCreateMainInstance(Class<? extends Frame> wishedFrameClass) {
    return getOrCreateMainInstance(wishedFrameClass, null);
  }

  /**
   * Returns the main instance of frame class after creating it, if not available.
   * @param wishedFrameClass the class of the frame to be retrieved
   * @param ownerFrame the frame, from where the new wished frame is opened
   * @return the retrieved or created frame object 
   */
  public static synchronized MustFrame getOrCreateMainInstance(Class<? extends Frame> wishedFrameClass, Frame ownerFrame) {
    MustFrame frame;
    cleanMainInstances(); // since this method causes static vector extension, it is also responsible for cleaning
    Logger.getInstance().debug(MustFrame.class, "Searching for Frame " + wishedFrameClass.getName());
    frame = getMainInstance(wishedFrameClass);
    if (frame != null) {
      frame.reInitialize();
    } else {
      Logger.getInstance().debug(MustFrame.class, "Create new Frame " + wishedFrameClass.getName() + " as member " + mainInstances.size());
      try {
        frame = (MustFrame)wishedFrameClass.newInstance();
        mainInstances.add(new WeakReference<MustFrame>(frame));
      }
      catch (Exception e) {
        Logger.getInstance().error(MustFrame.class, "Could not create Frame " + wishedFrameClass.getName(), e);
        return null;
      };
    };
    if (frame != null) frame.ownerFrame = ownerFrame;
    frame.nbrOfReferences++;
    Logger.getInstance().debug(wishedFrameClass, "Nbr of references to " + wishedFrameClass.getName() + " is now " + frame.nbrOfReferences);
    return frame;
  }

  private static synchronized void cleanMainInstances() {
    String remaining = "";
    if (mainInstances != null) {
      Iterator<WeakReference<MustFrame>> mainInstancesIterator = mainInstances.iterator();
      while (mainInstancesIterator.hasNext()) {
        WeakReference<MustFrame> ref = mainInstancesIterator.next();
        Object refObject = ref.get();
        if (refObject == null || !((MustFrame)refObject).isRevivable()) {
          mainInstancesIterator.remove();
        } else {
          if (remaining.length() > 0) remaining += ", ";
          remaining += refObject.getClass().getName();
        }
      }  
    }
    Logger.getInstance().debug(MustFrame.class, "remaining Frames after cleaning: " + remaining);
  }

  private static synchronized boolean isMainInstanceAvailable(Class<? extends Frame> frameClass) {
    return (getMainInstance(frameClass) != null); 
  }

  private static synchronized MustFrame getMainInstance(Class<? extends Frame> frameClass) {
    Vector<WeakReference<MustFrame>> mainInstancesCopy = new Vector<WeakReference<MustFrame>>(mainInstances); // to avoid java.util.ConcurrentModificationException
    Iterator<WeakReference<MustFrame>> frameIterator = mainInstancesCopy.iterator();
    while (frameIterator.hasNext()) {
      WeakReference<MustFrame> ref = frameIterator.next();
      Object refObject = ref.get();
      if (refObject != null && refObject.getClass().equals(frameClass)) {
        MustFrame searchedFrameInstance = (MustFrame)refObject;
        if (searchedFrameInstance.isRevivable()) return searchedFrameInstance;
      }
    }
    return null; 
  }

  /**
   * Closes the main instance of a frame if allowed.
   * @param wishedFrameClass the frame class whose main instance should be closed
   * @return true if closing was processed or no instance existed, false if it wasn't allowed
   */
  public static synchronized boolean closeMainInstance(Class<? extends Frame> wishedFrameClass) {
    MustFrame frame = getMainInstance(wishedFrameClass);
    if (frame == null) {
      return true;
    } else {
      if (frame.isClosingAllowed(++closeConfirmId)) {
        frame.closeInstance();
        return true;
      } else return false;
    }
  }

	/**
	 * Return true if all frames agree to be closed.
	 * @return true if all frames agree to be closed
	 */
  public static boolean isClosingAllowedForAllFrames() {
    closeConfirmId++;
    Vector<WeakReference<MustFrame>> mainInstancesCopy = new Vector<WeakReference<MustFrame>>(mainInstances); // to avoid java.util.ConcurrentModificationException
    Iterator<WeakReference<MustFrame>> frameIterator = mainInstancesCopy.iterator();
    while (frameIterator.hasNext()) {
      WeakReference<MustFrame> ref = frameIterator.next();
      Object refObject = ref.get();
      if (refObject != null && refObject != MainStd.getMainFrame()) {
        if (!((MustFrame)refObject).isClosingAllowed(closeConfirmId)) return false;
      }
    }
    return true;
  }
  
  /**
   * Closes all registered frame instances except the main frame (mostly the
   * menu).
   */
  public static void closeAll() {
    closeAll(false);
  }
  
  /**
   * Closes all registered frame instances except the main frame (mostly the
   * menu).
   */
  public static void closeAll(boolean respectUserInput) {
    Vector<WeakReference<MustFrame>> mainInstancesCopy = new Vector<WeakReference<MustFrame>>(mainInstances); // to avoid java.util.ConcurrentModificationException
    Iterator<WeakReference<MustFrame>> frameIterator = mainInstancesCopy.iterator();
    while (frameIterator.hasNext()) {
      WeakReference<MustFrame> ref = frameIterator.next();
      Object refObject = ref.get();
      if (refObject != null && refObject != MainStd.getMainFrame()) {
        MustFrame frame = (MustFrame)refObject;
        if (!respectUserInput || frame.isClosingAllowed(++closeConfirmId)) {
          frame.closeInstance();
          // frameIterator.remove(); // java.util.ConcurrentModificationException may occur.
        }
      }
    }
    mainInstances.clear(); 
  }

  public MustFrame() {
    this(null);
  }
  
  public MustFrame(FrameworkTextResource frameworkTextResource) {
    this.frameworkTextResource = frameworkTextResource;
    if (frameworkTextResource == null) {
      // only allowed for applications, not for applets!
      this.frameworkTextResource = WuicGlobal.getInstance(getLocale());
    }
    if (defaultIconImage != null) {
      setIconImage(defaultIconImage);
    }
    if (defaultIcons != null) {
      setIconImages(defaultIcons);
    }
//    if (1 == 1) { // arabic
//      try { UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName()); }
//      catch (Exception e) { e.printStackTrace(); }
//      setDefaultLookAndFeelDecorated(true);
//      setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
//    }
    addComponentListener(this);
    addWindowListener(this);
    isLaidOut = WinContr.getInstance().layout(this);
  }
  
  @Override
  public void setTitle(String title) {
    super.setTitle(Miscellaneous.getReplacement(title));
  }

  /**
   * Sets the visibility of the frame and sets the window state to normal if
   * it is iconified and brings the window to front.
   */
  public void open() {
    setVisible(true);
    if (getExtendedState() == ICONIFIED) setExtendedState(NORMAL);    
    toFront();
  }
  
	/**
	 * Returns true if the frame may be reused - if it hasn't been destroyed.
	 * @return true if the frame may be reused
   * @see #destroy
	 */
  public boolean isRevivable() {
    return !dismissed;
  }

  /**
   * Called after a main instance of the requested frame class was found to 
   * initialize the appearance.
   */
  protected void reInitialize() {
  }
  
  @Override
  public Locale getLocale() {
    if (locale != null) return locale;
    else return super.getLocale();
  }
  
  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return frameworkTextResource.getResourceString(resourceKey);
  }

  /**
   * Returns true if the frame has already been laid-out. This happens, when
   * a user first uses the frame. For personalization, position and size of the
   * frame is stored in a user specific local file.
   * @return true if the frame has already been laid-out
   * @see WinContr
   */
  public boolean isLaidOut() {
    return isLaidOut;
  }

  /**
   * Packs the frame if it isn't already laid-out by user.
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut) pack();
  }

  /**
   * Centers the frame on screen.
   */
  protected void locateInCenter() {
    setLocation(AwtConst.getCenterLocation(getSize()));
  }

  /**
   * Packs the frame and centers it.
   */
  protected void packAndLocateInCenter() {
    pack();
    locateInCenter();
  }

  /**
   * Packs the frame and centers it, if it was't already laid-out.
   * @see WinContr
   */
  protected void packAndLocateInCenterIfNotLaidOut() {
    if (!isLaidOut) packAndLocateInCenter();
  }
  
  protected void maximizeToBottomAndRight() {
    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
    setSize(screenSize.getSize().width - getX(), screenSize.getSize().height - getY() - 30 /* Windows Start panel*/);
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
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
   * Returns the topic of the component's help context
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * Returns the target of the component's help context
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }
  
  protected void popupMessage(String messageToKeep) {
    Toolkit.getDefaultToolkit().beep(); 
    StandardDialog.presentText(this, new String[]{messageToKeep});
  }
  
  /**
   * Logs a message as a debug information.
   * @param text the message to log
   */
  protected void logDebug(String text) {
    Logger.getInstance().debug(getClass(), text);
  }

  /**
   * Logs a message as information.
   * @param text the message to log
   */
  protected void logInfo(String text) {
    Logger.getInstance().info(getClass(), text);
  }

  /**
   * Logs a message as an error.
   * @param throwable the exception to log
   */
  protected void logError(Throwable throwable) {
    Logger.getInstance().error(getClass(), throwable);
  }

  /**
   * Logs a message as an error.
   * @param text the message to log
   */
  protected void logError(String text) {
    Logger.getInstance().error(getClass(), text);
  }

  /**
   * Logs a message as an error.
   * @param text the message to log
   * @param throwable the exception to log
   */
  protected void logError(String text, Throwable throwable) {
    Logger.getInstance().error(getClass(), text, throwable);
  }

  /**
   * Called when component is hidden.
   * @param e the component event
   */
  public void componentHidden(ComponentEvent e) {}

  /**
   * Called when component is shown.
   * @param e the component event
   */
  public void componentShown(ComponentEvent e) {}

  /**
   * Called when component is moved.
   * @param e the component event
   */
  public void componentMoved(ComponentEvent e) {
    WinContr.getInstance().saveProperties(this);
  }

  /**
   * Called when component is resized.
   * @param e the component event
   */
  public void componentResized(ComponentEvent e) {
    WinContr.getInstance().saveProperties(this);
  }

  /**
   * Called when window is going to be closed.
   * @param e the window event
   */
  public void windowClosing(WindowEvent e) {
    Logger.getInstance().debug(getClass(), e);
    if (isClosingAllowed(++closeConfirmId)) closeInstance();
  }

  /**
   * Called when window is closed.
   * @param e the window event
   */
  public void windowClosed(WindowEvent e) {}

  /**
   * Called when window is opened.
   * @param e the window event
   */
  public void windowOpened(WindowEvent e) {}

  /**
   * Called when window is activated.
   * @param e the window event
   */
  public void windowActivated(WindowEvent e) {}

  /**
   * Called when window is deactivated.
   * @param e the window event
   */
  public void windowDeactivated(WindowEvent e) {}

  /**
   * Called when window is iconified.
   * @param e the window event
   */
  public void windowIconified(WindowEvent e) {}

  /**
   * Called when window is closed.
   * @param e the window event
   */
  public void windowDeiconified(WindowEvent e) {}

  /**
   * Returns true if closing of the window is allowed.
   * @return true if closing of the window is allowed
   */
  public abstract boolean isClosingAllowed(int closeConfirmId);

  /**
   * Closes the instance after reminding size and position of the frame as it
   * was laid-out by the user.
   */
  public void closeInstance() {
    Logger.getInstance().debug(getClass(), "closeInstance " + getClass().getName());
    WinContr.getInstance().close(this);
    if (ownerFrame != null) ownerFrame.toFront();
    else { // closing of last not controlling frame means back to control frame
      cleanMainInstances();
      if ((mainInstances.size() == 0 || (mainInstances.size() == 1 && mainInstances.get(0).get() == this)) 
      && MainStd.getMainFrame() != null) {
        MainStd.getMainFrame().toFront();
      }
    }
  }

  /**
   * Deregisters this frame.
   */
  public synchronized void deregisterAsMainInstance() {
    Logger.getInstance().debug(getClass(), "deregistering " + getClass().getName());
    Iterator<WeakReference<MustFrame>> frameIterator = mainInstances.iterator();
    while (frameIterator.hasNext()) {
      WeakReference<MustFrame> ref = frameIterator.next();
      Object refObject = ref.get();
      if (refObject == null) {
        frameIterator.remove();
      } else if (refObject.equals(this)) {
        nbrOfReferences--;
        Logger.getInstance().debug(getClass(), "Nbr of references to " + getClass().getName() + " is now " + nbrOfReferences);
        if (nbrOfReferences == 0) frameIterator.remove();
      }
    }  
  }
  
  /**
   * Destroys the frame. May be called manually. Is called automatically by
   * the garbage collector otherwise. Thus, we may release important references 
   * more early and we may remove static references to this objects if there
   * are any. (They would prevent the garbage collector from working. But since 
   * we work with week references now it's less important.)
   * The destruction may include
   * <ul>
   * <li>deregistration as main instance of a frame of this class</li>
   * <li>freeing used data components especially those with listeners, particularly those which are registered in static vectors</li>
   * </ul>
   * After the frame has been destroyed, it is not usable any more!
   * Override free to add further destruction and don't forget to call 
   * super.free() at the end.
   * @see #free()
   * @see #isRevivable()
   */
  public final void destroy() {
    if (dismissed) return; // already done - thus, we don't have to carefully avoid multiple calls
    Logger.getInstance().debug(getClass(), "destroying " + getClass().getName());
    deregisterAsMainInstance();
    if (isVisible()) closeInstance();
    if (nbrOfReferences == 0) free();
  }
  
  /**
   * Frees (releases) references caused by this frame, particularly static 
   * register entries. To be called via destroy() to prevent multiple call.
   * Override it to do additional releases and don't forget to call 
   * super.free() at the end.
   * @see #destroy()
   * @see #isRevivable()
   */
  protected void free() {
    removeComponentListener(this);
    removeWindowListener(this);
    dismissed = true;
  }

  /**
   * Called by the garbage collector. Calls free if the frame has not already
   * been dismissed.
   * Override free to add further releases and don't forget to call 
   * super.free() at the end.
   * @see #free()
   * @see #destroy()
   */
  protected final void finalize() throws Throwable {
    Logger.getInstance().debug(getClass(), "finalizing " + getClass().getName() + " / already destroyed = " + dismissed);
    if (!dismissed) free();
    super.finalize();
  }

}

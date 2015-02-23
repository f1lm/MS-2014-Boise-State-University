/*
 * Copyright (c) 2006 Timothy Wall, All Rights Reserved
 */

import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.Toolkit;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DropTarget;
import java.awt.dnd.DropTargetContext;
import java.awt.dnd.DropTargetDragEvent;
import java.awt.dnd.DropTargetDropEvent;
import java.awt.dnd.DropTargetEvent;
import java.awt.dnd.DropTargetListener;
import java.awt.event.AWTEventListener;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.WeakHashMap;

/** Provides simplified drop handling for a component.
 * Usage:<br>    
 * <pre><code>
 * int actions = DnDConstants.MOVE_OR_COPY;
 * DropHandler handler = new DropHandler(actions);
 * Component component = ...;
 * handler.enableDrop(component);
 * </code></pre>
 * <p>
 * <ul>
 * <li>Accept drops where the action is the default (i.e. no modifiers) but
 * the intersection of source and target actions is <i>not</i> the default.
 * Doing so allows the source to adjust the cursor appropriately.
 * <li>Refuse drops where the user modifiers request an action that is not
 * supported. 
 * </ul>
 * 
 * @see DragHandler
 * @author twall
 */
// TODO: set acceptable drop flavors
// MAYBE: provide a component or class-specific drop area highlighter in 
// constructor, and provide defaults for standard components?
// NOTE: you could probably make one of these handlers serve several targets, 
// but for simplicity, keep the mapping 1-1-1 handler/droptarget/component
public abstract class DropHandler implements DropTargetListener {

    private int acceptedActions;
    private DropTarget dropTarget;
    private boolean active = true;
    static DropTarget currentDropTarget;
    
    /** Create a handler that allows the given set of actions. */
    public DropHandler(Component c, int acceptedActions) {
        this.acceptedActions = acceptedActions;
        dropTarget = new DropTarget(c, acceptedActions, this, active);
    }

    /** Whether this drop target is active. */
    public boolean isActive() { return active; }
    
    /** Set whether this handler (and thus all its drop targets) will accept
     * any drops.
     */ 
    public void setActive(boolean active) {
        this.active = active;
        if (dropTarget != null) {
            dropTarget.setActive(active);
        }
    }
    
    /** Calculate the effective action.  The default implementation will change 
     * the current action from {@link DnDConstants#ACTION_NONE} to something in 
     * common between the source and destination.  If any user modifiers are
     * set, ensure that the current action is actually supported.
     */
    protected int getDropAction(DropTargetEvent e) {
        int currentAction = DragHandler.NONE;
        int sourceActions = DragHandler.NONE;
        List flavors = Collections.EMPTY_LIST;
        int modifiers = getModifiers();
        if (e instanceof DropTargetDragEvent) {
            DropTargetDragEvent ev = (DropTargetDragEvent)e;
            currentAction = ev.getDropAction();
            sourceActions = ev.getSourceActions();
            flavors = ev.getCurrentDataFlavorsAsList();
        }
        else if (e instanceof DropTargetDropEvent) {
            DropTargetDropEvent ev = (DropTargetDropEvent)e;
            currentAction = ev.getDropAction();
            sourceActions = ev.getSourceActions();
            flavors = ev.getCurrentDataFlavorsAsList();
        }
        if ((currentAction & acceptedActions) == DragHandler.NONE
            && modifiers == 0) {
            currentAction = acceptedActions & sourceActions;
            //Log.debug("action relaxed to " + DragHandler.actionString(currentAction));
        }
        else if (modifiers != 0) {
            int action = currentAction & acceptedActions & sourceActions;
            if (action != currentAction) {
                /*
                Log.debug(DragHandler.actionString(currentAction)
                          + " not allowed, change to " 
                          + DragHandler.actionString(action));
                 */
                currentAction = action;
            }
        }
        return isSupported(flavors) ? currentAction : DragHandler.NONE;
    }
    
    // TODO: find a better way of detecting whether there are modifiers
    protected int getModifiers() {
        return DragHandler.modifiers;
    }

    private String lastAction;
    private void describe(String type, DropTargetEvent e) {
        if (true/*Log.isClassDebugEnabled(DropHandler.class)*/) {
            String msg = type;
            if (e instanceof DropTargetDragEvent) {
                DropTargetContext dtc = e.getDropTargetContext();
                DropTarget dt = dtc.getDropTarget();
                DropTargetDragEvent ev = (DropTargetDragEvent)e;
                msg += ": src=" + DragHandler.actionString(ev.getSourceActions())
                    + " tgt=" + DragHandler.actionString(dt.getDefaultActions())
                    + " act=" + DragHandler.actionString(ev.getDropAction());
            }
            else if (e instanceof DropTargetDropEvent) {
                DropTargetContext dtc = e.getDropTargetContext();
                DropTarget dt = dtc.getDropTarget();
                DropTargetDropEvent ev = (DropTargetDropEvent)e;
                msg += ": src=" + DragHandler.actionString(ev.getSourceActions())
                + " tgt=" + DragHandler.actionString(dt.getDefaultActions())
                + " act=" + DragHandler.actionString(ev.getDropAction());
            }
            if (!msg.equals(lastAction)) {
                //Log.debug(lastAction = msg);
            }
        }
    }

    public void dragEnter(DropTargetDragEvent e) {
        currentDropTarget = dropTarget;
        describe("enter(tgt)", e);
        paintDropTarget(e, getDropAction(e));
    }

    public void dragOver(DropTargetDragEvent e) {
        describe("over(tgt)", e);
        int action = getDropAction(e);
        if (action != DragHandler.NONE) {
            e.acceptDrag(action);
        }
        else {
            e.rejectDrag();
        }
        paintDropTarget(e, action);
    }

    public void dragExit(DropTargetEvent e) {
        describe("exit(tgt)", e);
        paintDropTarget(e, DragHandler.NONE);
        currentDropTarget = null;
    }

    public void dropActionChanged(DropTargetDragEvent e) {
        describe("change(tgt)", e);
        int action = getDropAction(e);
        if (action != DragHandler.NONE) {
            e.acceptDrag(action);
        }
        else {
            e.rejectDrag();
        }
        paintDropTarget(e, action);
    }

    public void drop(DropTargetDropEvent e) {
        describe("drop(tgt)", e);
        int action = getDropAction(e);
        if (action != DragHandler.NONE && canDrop(e, action)) {
            //Log.debug("accept(tgt)");
            e.acceptDrop(action);
            try {
                // DragHandler will disallow non-default user actions
                // if they're not supported by refusing to provide a
                // functional Transferable.  Handle it nicely here to
                // avoid UnsupportedDataFlavor exceptions.
                Transferable t = e.getTransferable();
                DataFlavor[] flavors = t.getTransferDataFlavors();
                if (flavors.length != 0) {
                    //Log.debug("allow(tgt)");
                    drop(e, action);
                }
                else {
                    //Log.debug("disallow(tgt)");
                    action = DragHandler.NONE;
                }
            }
            catch (Exception ex) {
                action = DragHandler.NONE;
            }
            e.dropComplete(action != DragHandler.NONE);
        }
        else {
            //Log.debug("reject(tgt)");
            e.rejectDrop();
        }
        paintDropTarget(e, DragHandler.NONE);
    }
    protected abstract boolean isSupported(List flavors); 
    /** Update the appearance of the target component.  Normally the decoration
     * should be painted if the event is an instance of 
     * {@link DropTargetDragEvent} and cleared otherwise.
     */
    // TODO: change to use a highlighter (cf JTextComponent.Highlighter)
    protected void paintDropTarget(DropTargetEvent e, int action) { } 
    /** Indicate whether the drop is acceptable. */ 
    protected boolean canDrop(DropTargetDropEvent e, int action) { 
        return true; 
    }
    /** Handle an incoming drop.  */
    // TODO: rename to 'handleDrop'
    protected void drop(DropTargetDropEvent e, int action) throws UnsupportedFlavorException, IOException { } 
        
}
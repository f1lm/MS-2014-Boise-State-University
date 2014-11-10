/*
 * Copyright (c) 2006 Timothy Wall, All Rights Reserved
 */

import java.awt.AlphaComposite;
import java.awt.Component;
import java.awt.Composite;
import java.awt.Cursor;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Window;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DragGestureEvent;
import java.awt.dnd.DragGestureListener;
import java.awt.dnd.DragSource;
import java.awt.dnd.DragSourceContext;
import java.awt.dnd.DragSourceDragEvent;
import java.awt.dnd.DragSourceDropEvent;
import java.awt.dnd.DragSourceEvent;
import java.awt.dnd.DragSourceListener;
import java.awt.dnd.DragSourceMotionListener;
import java.awt.dnd.InvalidDnDOperationException;
import java.awt.event.InputEvent;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.swing.Icon;
import javax.swing.JComponent;
import javax.swing.JLayeredPane;
import javax.swing.RootPaneContainer;
import javax.swing.SwingUtilities;

/** Provides simplified drag handling for a component.  
 * Usage:<br>
 * <pre><code>
 * int actions = DnDConstants.MOVE_OR_COPY;
 * Component component = ...;
 * DragHandler handler = new DragHandler(component, actions);
 * </code></pre>
 * <ul>
 * <li>Supports painting an arbitrary {@link Icon} with transparency to
 * represent the item being dragged (restricted to the {@link java.awt.Window} 
 * of the drag source if the platform doesn't support drag images).
 * <li>Disallow starting a drag if the user requests an unsupported action.
 * <li>Adjusts the cursor on drags with no modifier for which the default action
 * is disallowed but where one or more non-default actions are allowed, e.g. a 
 * drag (with no modifiers) to a target which supports "link" should change the 
 * cursor to "link" (the JRE behavior is a "not allowed" cursor, even though
 * the action actually depends on how the drop target responds).
 * <li>Disallow drops to targets if the non-default (user-requested) action 
 * is not supported by the target, e.g. the user requests a "copy" when the 
 * target only supports "move".
 * </ul>
 * NOTE: if there is an intersection between src and target actions, but
 * the user modifiers are empty, the default JRE action is to disallow it.
 * we want to allow it.<p>
 * NOTE: if the user has requested an action that is not supported,
 * we disallow the transfer by making the Transferable refuse to provide
 * anything.  The default JRE behavior actually reports an allowed action
 * other than the one requested by the user, so we reject the drag in the 
 * {@link DragHandler}.  The target ({@link DropHandler} can't detect changes
 * to user modifiers which might indicate that it should refuse a drop, so we 
 * have to handle changes to the drop action on the drag source side
 * (the {@link DragHandler} makes the {@link Transferable} unusable).
 */
//MAYBE: should Icon provision be a separate interface?  only if the rest
//of the drag handler is constant and only the image needs to change
//(for standard components, e.g. tree cells, table cells, etc.
//NOTE: figure out how setting cursor works
//TODO: can we make the drag cursor show the default action as long as
//there is no drop target (i.e. nothing explicitly refuses the drag)?
public abstract class DragHandler 
    implements DragSourceListener, DragSourceMotionListener, DragGestureListener {

    static final int MOVE = DnDConstants.ACTION_MOVE;
    static final int COPY = DnDConstants.ACTION_COPY;
    static final int LINK = DnDConstants.ACTION_LINK;
    static final int NONE = DnDConstants.ACTION_NONE;
    
    // TODO: w32 explorer: link=alt or ctrl+shift, copy=ctrl or shift
    // w32 others: copy=ctrl
    static final int MOVE_MASK = InputEvent.SHIFT_DOWN_MASK;
    static final boolean OSX = 
        System.getProperty("os.name").toLowerCase().indexOf("mac") != -1;
    static final int COPY_MASK = 
        OSX ? InputEvent.ALT_DOWN_MASK : InputEvent.CTRL_DOWN_MASK;
    static final int LINK_MASK =
        OSX ? InputEvent.ALT_DOWN_MASK|InputEvent.META_DOWN_MASK 
            : InputEvent.CTRL_DOWN_MASK|InputEvent.SHIFT_DOWN_MASK;
    static final int KEY_MASK =
        InputEvent.ALT_DOWN_MASK|InputEvent.META_DOWN_MASK
        |InputEvent.CTRL_DOWN_MASK|InputEvent.SHIFT_DOWN_MASK
        |InputEvent.ALT_GRAPH_DOWN_MASK;

    /** Used to communicate modifier state to {@link DropHandler}.  Note that
     * this field will only be accurate when a {@link DragHandler} in
     * the same VM started the drag.
     */
    static int modifiers;
    
    private int supportedActions;
    private DelegatingTransferable transferable;
    private boolean fixCursor = true;
    private Component component;
    private GhostedDragImage ghost;

    public DragHandler(Component comp, int actions) {
        this.component = comp;
        this.supportedActions = actions;
        DragSource src = DragSource.getDefaultDragSource();
        src.createDefaultDragGestureRecognizer(comp, supportedActions, this);
    }

    /** Override to control whether a drag is started.  The default 
     * implementation disallows the drag if the user is applying modifiers
     * and the user-requested action is not supported.  
     */
    protected boolean canDrag(DragGestureEvent e) {
        int mods = e.getTriggerEvent().getModifiersEx() & KEY_MASK;
        //Log.debug("drag modifiers=" + mods);
        if (mods == MOVE_MASK)
            return (supportedActions & MOVE) != 0;
        if (mods == COPY_MASK)
            return (supportedActions & COPY) != 0;
        if (mods == LINK_MASK)
            return (supportedActions & LINK) != 0;
        return true;
    }

    /** Override to provide an appropriate {@link Transferable}.
     */
    protected abstract Transferable getTransferable(DragGestureEvent e);

    /** Override this to provide a custom image. 
     * @param offset set this to be the offset from the drag source origin 
     * to the image origin.  If unchanged, the image is assumed to have the
     * same origin as the drag source.
     */
    protected Icon getDragIcon(DragGestureEvent e, Point offset) {
        offset.setLocation(0, 0);
        return null; 
    }
    
    /** Override to perform any decoration of the target at the start of a drag, 
     * if desired. 
     */
    protected void dragStarted(DragGestureEvent e) { }

    public void dragGestureRecognized(DragGestureEvent e) {
        if ((e.getDragAction() & supportedActions) != 0
            && canDrag(e)) {
            modifiers = e.getTriggerEvent().getModifiersEx() & KEY_MASK;
            //Log.debug("Start drag with mods=" + modifiers);
            transferable = new DelegatingTransferable(getTransferable(e));
            try {
                Cursor cursor = null;
                Point imageOffset = new Point();
                Icon dragImage = getDragIcon(e, imageOffset);
                Point origin = e.getDragOrigin();
                imageOffset.translate(-origin.x, -origin.y);
                if (dragImage != null && DragSource.isDragImageSupported()) {
                    e.startDrag(cursor, createDragImage(dragImage), 
                                imageOffset, transferable, this);
                }
                else {
                    if (dragImage != null) {
                        Window w = SwingUtilities.getWindowAncestor(component);
                        if (component instanceof JComponent
                            && w instanceof RootPaneContainer) {
                            JLayeredPane p = ((RootPaneContainer)w).getLayeredPane();
                            Point loc = component.getLocationOnScreen();
                            loc.translate(origin.x, origin.y);
                            ghost = new GhostedDragImage(p, dragImage, loc, imageOffset);
                        }
                    }
                    e.startDrag(cursor, transferable, this);
                }
                dragStarted(e);
                e.getDragSource().addDragSourceMotionListener(this);
            }
            catch (InvalidDnDOperationException ex) {
                //Log.warn(ex);
            }
        }
    }
    
    private Image createDragImage(Icon icon) {
        int w = icon.getIconWidth();
        int h = icon.getIconHeight();
        BufferedImage image = 
            new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB_PRE);
        Graphics g = image.getGraphics();
        icon.paintIcon(component, g, 0, 0);
        g.dispose();
        return image;
    }

    /** Reduce a multiply-set bit mask to a single bit. */
    private int reduce(int actions) {
        if ((actions & MOVE) != 0 && actions != MOVE) {
            return MOVE;
        }
        else if ((actions & COPY) != 0 && actions != COPY) {
            return COPY;
        }
        return actions;
    }

    protected Cursor getCursorForAction(int actualAction) {
        switch(actualAction) {
        case MOVE: 
            return DragSource.DefaultMoveDrop; 
        case COPY: 
            return DragSource.DefaultCopyDrop;
        case LINK: 
            return DragSource.DefaultLinkDrop;
        default:
            return DragSource.DefaultMoveNoDrop;
        }
    }

    /** Returns the first available action supported by source and target. */
    protected int getAcceptableDropAction(int targetActions) {
        return reduce(supportedActions & targetActions);
    }
    
    /** Get the currently requested drop action. */
    protected int getDropAction(DragSourceEvent ev) {
        if (ev instanceof DragSourceDragEvent) {
            DragSourceDragEvent e = (DragSourceDragEvent)ev;
            return e.getDropAction();
        }
        return NONE;
    }

    /** Pick a different drop action if the target doesn't support the current
     * one and there are no modifiers.
     */
    protected int adjustDropAction(DragSourceEvent ev) {
        int action = getDropAction(ev);
        if (ev instanceof DragSourceDragEvent) {
            DragSourceDragEvent e = (DragSourceDragEvent)ev;
            if (action == NONE) {
                int mods = e.getGestureModifiersEx() & KEY_MASK;
                //Log.debug("no action, modifiers=" + mods);
                if (mods == 0) {
                    //Log.debug("no mods, see if there's an available action");
                    action = getAcceptableDropAction(e.getTargetActions());
                }
            }
        }
        return action;
    }
    
    protected void updateCursor(DragSourceEvent ev) {
        if (!fixCursor)
            return;
        Cursor cursor = getCursorForAction(adjustDropAction(ev));
        //Log.debug("set cursor to " + cursor);
        if (ghost != null) {
            ghost.setCursor(cursor);
        }
        ev.getDragSourceContext().setCursor(cursor);
    }
    
    static String actionString(int action) {
        switch(action) {
        case MOVE: return "MOVE";
        case MOVE|COPY: return "MOVE|COPY";
        case MOVE|LINK: return "MOVE|LINK";
        case MOVE|COPY|LINK: return "MOVE|COPY|LINK";
        case COPY: return "COPY";
        case COPY|LINK: return "COPY|LINK";
        case LINK: return "LINK";
        default: return "NONE";
        }
    }
    private String lastAction;
    private void describe(String type, DragSourceEvent e) {
        if (true/*Log.isClassDebugEnabled(DragHandler.class)*/) {
            DragSourceContext ds = e.getDragSourceContext();
            String msg = type;
            if (e instanceof DragSourceDragEvent) {
                DragSourceDragEvent ev = (DragSourceDragEvent)e;
                msg += ": src=" + actionString(ds.getSourceActions())
                    + " usr=" + actionString(ev.getUserAction())
                    + " tgt=" + actionString(ev.getTargetActions())
                    + " act=" + actionString(ev.getDropAction())
                    + " mods=" + ev.getGestureModifiersEx();
            }
            else {
                msg += ": e=" + e;
            }
            if (!msg.equals(lastAction)) {
                //Log.debug(lastAction = msg);
            }
        }
    }

    public void dragDropEnd(DragSourceDropEvent e) {
        describe("end", e);
        transferable = null;
        modifiers = 0;
        if (ghost != null) {
            ghost.dispose();
            ghost = null;
        }
        DragSource src = e.getDragSourceContext().getDragSource();
        src.removeDragSourceMotionListener(this);
    }

    public void dragEnter(DragSourceDragEvent e) {
        describe("enter", e);
        updateCursor(e);
        transferable.setDisallow(adjustDropAction(e) == NONE);
    }

    public void dragMouseMoved(DragSourceDragEvent e) {
        describe("move", e);
        if (ghost != null) {
            ghost.move(e.getLocation());
        }
        updateCursor(e);
        transferable.setDisallow(adjustDropAction(e) == NONE);
    }

    public void dragOver(DragSourceDragEvent e) {
        describe("over", e);
        updateCursor(e);
        transferable.setDisallow(adjustDropAction(e) == NONE);
    }

    public void dragExit(DragSourceEvent e) {
        describe("exit", e);
        updateCursor(e);
        transferable.setDisallow(false);
    }

    public void dropActionChanged(DragSourceDragEvent e) {
        describe("change", e);
        modifiers = e.getGestureModifiersEx() & KEY_MASK;
        updateCursor(e);
        transferable.setDisallow(adjustDropAction(e) == NONE);
    }

    /** This class allows us to prevent transfers when the user is requesting
     * an action that is not supported.  This is preferable to allowing the 
     * drop operation to complete with an action different than the one
     * the user is requesting.
     */
    private class DelegatingTransferable implements Transferable {
        boolean disallow;
        Transferable delegate;

        public DelegatingTransferable(Transferable delegate) {
            this.delegate = delegate;
            disallow = delegate == null;
        }

        public boolean getDisallow() {
            return disallow;
        }

        public void setDisallow(boolean disallow) {
            //Log.debug("disallow=" + disallow);
            this.disallow = disallow || delegate == null;
        }

        public DataFlavor[] getTransferDataFlavors() {
            return disallow
                ? new DataFlavor[0]
                : delegate.getTransferDataFlavors();
        }

        public boolean isDataFlavorSupported(DataFlavor flavor) {
            return disallow
                ? false
                : delegate.isDataFlavorSupported(flavor);
        }

        public Object getTransferData(DataFlavor flavor)
            throws UnsupportedFlavorException, IOException {
            if (disallow)
                throw new IOException("Action disallowed");
            return delegate.getTransferData(flavor);
        }
    }

    /** Provide a ghosted drag image which will appear on any instances
     * of {@link RootPaneContainer} in the current VM.  
     */
    protected class GhostedDragImage extends AbstractComponentDecorator {
        private Icon icon;
        private Point cursorOffset;
        private List ghosts = new ArrayList();
        
        /** Create a ghosted drag image, using the given icon.  
         * @param c Component where the image will be drawn
         * @param icon image to be drawn
         * @param offset offset within the component to draw the image
         */
        public GhostedDragImage(JLayeredPane c, Icon icon, 
                                Point screenLocation, Point offset) {
            this(c, icon, screenLocation, offset, true);
        }

        private GhostedDragImage(JLayeredPane component, 
                                 Icon icon, Point screenLocation, 
                                 Point cursorOffset,
                                 boolean trackFrames) {
            super(component);
            this.icon = icon;
            this.cursorOffset = cursorOffset;
            Point loc = component.getLocationOnScreen();
            setDecorationBounds(screenLocation.x - loc.x + cursorOffset.x, 
                                screenLocation.y - loc.y + cursorOffset.y, 
                                icon.getIconWidth(), icon.getIconHeight());
            if (trackFrames) {
                Window w = SwingUtilities.getWindowAncestor(component);
                Frame[] frames = Frame.getFrames();
                //Log.debug("track " + frames.length + " other frames");
                for (int i=0;i < frames.length;i++) {
                    Frame frame = frames[i];
                    if (frame instanceof RootPaneContainer
                        && frame.isShowing() && frame != w) {
                        //Log.debug("Track " + frame);
                        JLayeredPane p = ((RootPaneContainer)frame).getLayeredPane();
                        GhostedDragImage ghost = 
                            new GhostedDragImage(p, icon, screenLocation, cursorOffset, false); 
                        ghosts.add(ghost);
                        ghost.move(screenLocation);
                    }
                }
            }
        }

        /** Ensure the decorator cursor matches the drag cursor, or we get
         * cursor flicker. 
         */
        public void setCursor(Cursor cursor) {
            getPainter().setCursor(cursor);
            for (Iterator i=ghosts.iterator();i.hasNext();) {
                ((GhostedDragImage)i.next()).getPainter().setCursor(cursor);
            }
        }
        /** Make all ghosted images go away. */
        public void dispose() {
            super.dispose();
            for (Iterator i=ghosts.iterator();i.hasNext();) {
                ((GhostedDragImage)i.next()).dispose();
            }
        }
        /** Move the ghosted image to the requested location. 
         * @param screen Where to draw the image, in screen coordinates
         */
        public void move(Point screen) {
            //Log.debug("Move to " + screen);
            JLayeredPane p = (JLayeredPane)getPainter().getParent();
            Point loc = p.getLocationOnScreen();
            setDecorationBounds(screen.x - loc.x + cursorOffset.x, 
                                screen.y - loc.y + cursorOffset.y, 
                                icon.getIconWidth(), icon.getIconHeight());
            for (Iterator i=ghosts.iterator();i.hasNext();) {
                GhostedDragImage g = (GhostedDragImage)i.next();
                //Log.debug("Move on other frame");
                g.move(screen);
            }
        }
        /** Paint the supplied image with transparency. */
        public void paint(Graphics graphics) {
            Rectangle r = getDecorationBounds();
            Graphics2D g = (Graphics2D)graphics;
            Composite old = g.getComposite();
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.5f));
            try {
                icon.paintIcon(getPainter(), g, r.x, r.y);
            }
            finally {
                g.setComposite(old);
            }
        }
    }
}
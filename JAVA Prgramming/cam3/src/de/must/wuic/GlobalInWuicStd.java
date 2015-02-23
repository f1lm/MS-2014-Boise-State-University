/*
 * Copyright (c) 2001-2012 Christoph Mueller. All rights reserved.
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

import java.awt.MediaTracker;
import java.lang.ref.SoftReference;
import java.util.Hashtable;

import javax.swing.ImageIcon;

import de.must.middle.EntitlementStd;
import de.must.middle.ImageResource;

public class GlobalInWuicStd {
  
  public static class ImageLoader implements ImageResource {
    public Hashtable<String, SoftReference<ImageIcon>> imageCache = new Hashtable<String, SoftReference<ImageIcon>>();
    public ImageIcon getImageIcon(String imageIconName) {
      ImageIcon image = null;
      SoftReference<ImageIcon> ref = imageCache.get(imageIconName);
      if (ref != null) {
        image = ref.get();
        if (image != null) {
          return image;
        }
      }
      de.must.io.Logger.getInstance().debug(GlobalInWuicStd.class, "Creating new image icon " + imageIconName);
      image = new ImageIcon("bin/images/" + imageIconName);
      if (image.getImageLoadStatus() == MediaTracker.ERRORED) {
        image = new ImageIcon("./images/" + imageIconName);
      }
      if (image.getImageLoadStatus() != MediaTracker.ERRORED) {
        imageCache.put(imageIconName, new SoftReference<ImageIcon>(image));
      }
      return image;
    }
  }

  public static boolean fatCaret = false;
  public static EntitlementStd entitlement;
  private static ImageResource imageResource;
  
  static {
    imageResource = new ImageLoader();
  }
  
  public static synchronized ImageIcon getImageIcon(String imageIconName) {
    return getImageResource().getImageIcon(imageIconName);
  }

  public static synchronized ImageResource getImageResource() {
    return imageResource;
  }
  
}

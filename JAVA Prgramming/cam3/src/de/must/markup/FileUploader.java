package de.must.markup;

import de.must.io.FileBuffer;

import java.io.*;

/**
 * File upload markupable component.
 * @author Christoph Mueller
 */
public class FileUploader extends MustInputField {

  protected String fromCurrentDirToWebapps = "../webapps";
  private static int instanceCounter = 0;
  
  protected String subdirectoryName;
  protected String fileNameWithoutExtension;
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected boolean required = false;
  protected String contextPath;
  protected String saveDirectory;
  protected FileBuffer fileBuffer;

  public FileUploader(String saveDirectory) {
    this(saveDirectory, null);
  }

	public FileUploader(String saveDirectory, String name) {
	  super(name);
    this.saveDirectory = saveDirectory;
    if (name != null) this.name = name;
    else this.name = "ImgUp" + ++instanceCounter;
    fileNameWithoutExtension = "noname"; // default
	}

  public void setSubdirectoryName(String subdirectoryName) {
    this.subdirectoryName = subdirectoryName;
  }

  public void setFileNameWithoutExtension(String newFileNameWithoutExtension) {
    this.fileNameWithoutExtension = newFileNameWithoutExtension;
  }

  /**
   * @see de.must.markup.Storable#setRequired(boolean)
   */
  public void setRequired(boolean required) {
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    String tag;
    tag = "<input type=\"file\" name=\"" + name + "\"";
    if (className != null) tag += " class=\"" + className + "\"";
    if (additionalTagFragments != null) tag += " " + additionalTagFragments;
    if (toolTipText != null) {
      tag += " onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"";
    }
    tag += ">";
    if (comment != null && !comment.equals("")) {
      tag += " " + comment;
    }
    return tag;
  }

	public void fetchYourValueFromRequest(GeneralizedRequest request) {
    fileBuffer = request.getFileBuffer(name);
    contextPath = request.getStandardRequest().getContextPath();
	}

  /**
   * @see de.must.markup.Storable#isValid()
   */
  public boolean isValid() {
    if (fileBuffer != null && fileBuffer.getExceptionWhileBuffering() != null) {
      comment = fileBuffer.getExceptionWhileBuffering().getMessage();
      return false;
    }
    comment = null;
    return true;
  }

  public String getInvalidityReason() {
    return fileBuffer.getExceptionWhileBuffering().getMessage();
  }
  
  public void writeFile() {
    if (fileBuffer == null || fileBuffer.isEmtpy()) return;
		String fileName = fileNameWithoutExtension + "." + de.must.util.StringFunctions.getExtension(fileBuffer.getOriginalFileName());
    OutputStream fileOut = null;
    try {
      File file;
      if (subdirectoryName != null) {
        File saveDirFile = new File(saveDirectory);
        File subDirFile = new File(saveDirFile, subdirectoryName);
        if(!subDirFile.exists()) subDirFile.mkdir();
        file = new File(subDirFile, fileBuffer.getOriginalFileName());
      } else {
        file = new File(fromCurrentDirToWebapps + contextPath + "/" + saveDirectory, fileName);
      }
      fileOut = new BufferedOutputStream(new FileOutputStream(file));
      fileBuffer.moveContentTo(fileOut);
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    } finally {
      if (fileOut != null)
        try {
          fileOut.close();
        } catch (Exception e) {}
    }
	}

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}


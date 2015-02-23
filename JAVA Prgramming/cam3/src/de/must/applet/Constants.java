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

package de.must.applet;

public class Constants {
  
  public static final String VERSION = "1.0";
  public static final String COPYRIGHT =
    "(C) Copyright  MÜLLER UND STEIN software 2011-2012"; //$NON-NLS-1$
  
  public static final String MAIN_SERVLET = "servlet/main";
  public static final String SESSION = "session";
  public static final String ELEMENT_DELIMITER = "-";

  // concerning from server to applet
  public static final String TOOLBAR = "toolbar";
  public static final String UNIVERSAL_CENTER_GUI = "universalcentergui";
  public static final String FREE_CENTER_GUI = "freecentergui";
  public static final String SEARCH_LIST_DETAIL_GUI = "searchlistdetailgui";
  public static final String SEARCH = "search";
  public static final String LIST = "list";
  public static final String DETAIL = "detail";
  public static final String PRESENTATION = "presentation";
  public static final String TABLE = "table";
  public static final String DIALOG_FOR_PROPERTIES = "dialogforprop";
  public static final String DIALOG_FOR_CHOOSING = "dialogforchoosing";
  public static final String DIALOG_FOR_OPTIONS_WITH_LIST_SELECTION = "dialogforoptionswithlist";
  public static final String DIALOG_FOR_DRAWING = "dialogfordraw";
  public static final String DIALOG_FOR_STANDARD_INFO_PRESENTATION = "dialogforstandardinfopresentation";
  public static final String PRINTING = "printing";
  public static final String OUTLINE_WINDOW = "outlinewindow";
  public static final String LISTSELECTION_WINDOW = "listselectionwindow";

  // infos from server to applet
  public static final String SESSION_BEGIN_TAG = "<session>";
  public static final String SESSION_END_TAG = "</session>";
  public static final String CONCERNING_BEGIN = "<conc>";
  public static final String CONCERNING_END = "</conc>";
  public static final String CONCERNING_SUBLEVEL1_BEGIN_TAG = "<concsub1>";
  public static final String CONCERNING_SUBLEVEL1_END_TAG = "</concsub1>";
  public static final String VETO_MESSAGE_TAG_BEGIN = "<veto>";
  public static final String VETO_MESSAGE_TAG_END = "</veto>";
  public static final String SOUND_TAG_BEGIN = "<sound>";
  public static final String SOUND_TAG_END = "</sound>";
  public static final String ACTION_BEGIN_TAG = "<act>";
  public static final String ACTION_END_TAG = "</act>";
  public static final String TITLE_BEGIN = "<title>";
  public static final String TITLE_END = "</title>";
  public static final String NONSTANDARD_PANEL_BEGIN = "<nonstandardpanel>";
  public static final String NONSTANDARD_PANEL_END = "</nonstandardpanel>";
  public static final String NONSTANDARD_POSITION_BEGIN = "<nonstandardpos>";
  public static final String NONSTANDARD_POSITION_END = "</nonstandardpos>";
  public static final String TODO_TAG_BEGIN = "<todo>";
  public static final String TODO_TAG_END = "</todo>";
  public static final String NEW_LINE = "|";
  public static final String REGISTER = "register|";
  public static final String ITEM_LISTENER = "itemlistener";

  // todos from server to applet
  public static final String PEFORM_LOGIN = "performlogin";
  public static final String INITITIAL_STATE_AFTER_LOGIN = "initialstate";
  public static final String INITIALIZE = "initialize";
  public static final String BEGIN_MENU = "<beginmenu>";
  public static final String END_MENU = "<endmenu>";
  public static final String CREATE_MENU_ITEM = "createmenuitem";
  public static final String CLEAR_APPLETCONTENT = "clearlappletcontent";
  public static final String CREATE_SEPARATOR = "createseparator";
  public static final String CREATE_TAB = "createtab";
  public static final String SELECT_TAB = "selecttab";
  public static final String CREATE_SPLIT_TOP_AREA = "createsplittoparea";
  public static final String CREATE_SPLIT_BOTTOM_AREA = "createsplitbottomarea";
  public static final String CREATE_SPLIT_RIGHT_AREA = "createsplitrightarea";
  public static final String CLEAR_LIST_COLUMNS = "clearlistcolumns";
  public static final String ADD_LIST_COLUMN = "addlistcolumn";
  public static final String APPLY_LIST_COLUMNS = "applylistcolumns";
  public static final String CREATE_RENDERER = "createrenderer";
  public static final String ADD_RENDERER_SPECIAL = "addrendererspecial";
  public static final String APPLY_RENDERER = "applyrenderer";
  public static final String SET_EDITOR_CHECKBOX = "seteditorcheckbox";
  public static final String CLEAR_LIST = "clearlist";
  public static final String NEW_ROW = "newrow";
  public static final String ADD_ROW_OBJECT = "addRO";
  public static final String APPLY_ROW = "applyrow";
  public static final String APPLY_ROW_CHECKING_UPDATE = "applyrowcheckupd";
  public static final String APPLY_LIST= "applylist";
  public static final String APPLY_TREE= "applytree";
  public static final String SET_TARGETTEXTFIELD= "settargettextfield";
  public static final String CLEAR_DETAILS = "cleardetails";
  public static final String NEW_ATTRIBUTE_ROW = "newattrrow";
  public static final String CREATE_BOTTOM_BUTTON = "createbottombutton";
  public static final String CREATE_BUTTON = "createbutton";
  public static final String CREATE_TEXTFIELD = "createtextfield";
  public static final String CREATE_PASSWORDFIELD = "createpasswordfield";
  public static final String CREATE_TEXTAREA = "createtextarea";
  public static final String CREATE_DATEFIELD = "createdatefield";
  public static final String CREATE_INTEGERFIELD = "createintegerfield";
  public static final String CREATE_DECIMALFIELD = "createdecimalfield";
  public static final String CREATE_RADIOBUTTONS = "createradiobuttons";
  public static final String CREATE_PRESENT_BUTTON = "createpresentbutton";
  public static final String CREATE_LABEL = "createlabel"; // text set while creation and never updated
  public static final String CREATE_TEXTPRESENTER = "createtextpresenter";
  public static final String CREATE_TOPIC = "createtopic";
  public static final String CREATE_INFO_LINE = "createinfoline";
  public static final String CREATE_COMBOBOX = "createcombobox";
  public static final String CLEAR_COMBOBOX = "clearcombobox";
  public static final String ADD_ITEM = "additem";
  public static final String CREATE_CHECKBOX = "createcheckbox";
  public static final String SET_VALUE = "setvalue";
  public static final String REQUEST_FOCUS = "requestfocus";
  public static final String SELECT_ALL = "selectall";
  public static final String SET_VISIBLE = "setvisible";
  public static final String SET_ENABLED = "setenabled";
  public static final String SET_MESSAGE_TO_KEEP = "setmessagetokeep";
  public static final String REMOVE_ALL_TABS = "removealltabs";
  public static final String REMOVE_TAB = "removetab";
  public static final String SET_NO_TABS = "setnotabs";
  public static final String SET_HEADER = "setheader";
  public static final String SET_PRINTER_NAME = "setprintername";
  public static final String SET_PAPER_SIZE = "setpapersize";
  public static final String SET_IMAGABLE_AREA = "setarea";
  public static final String SET_FONT = "setfont";
  public static final String PRINT_ITEM = "printitem";
  public static final String LINE_VALUE = "<linevalue>";
  public static final String EXECUTE = "execute";
  public static final String FINALIZE = "finalize";
  public static final String SET_FURTHER_ROW_AVAILABLE = "setfurthrowavail";
  public static final String SET_INQUIRY_HISTORY = "setinqhist";
  public static final String SET_CALLBACK = "setcallback";
  public static final String SET_READ_ONLY = "setreadonly";
  public static final String CREATE_IMAGE = "createimage";
  public static final String DRAW_ELEMENT = "drawelement";
  public static final String SET_LISTBUTTONLABEL = "setlistbuttonlabel";
  public static final String SET_SECONDS_BEFORE_AUTOMATIC_LOGOUT = "setautlogout";
  public static final String OPEN_REPORT = "openreport";
  public static final String OPEN_HTML_DIALOG = "openhtmldialog";
  public static final String INFO_CANNOT_DELETE= "infocannotdelete";
  public static final String CONFIRM_DELETION = "confirmdeletion";
  public static final String CONFIRM_VIA_DIALOG = "confirmeviadialog";
  public static final String INFORMATION_DIALOG = "informationdialog";
  public static final String REMOVE_ITEM = "removeitem";
  public static final String CREATE_SUBLIST_TAB = "createsublist";
  public static final String CLEAR_SUBLIST = "clearsublist";
  public static final String ADD_SUBLIST_ITEM = "addsublistitem";
  public static final String HIDE_BUTTONS = "hidebuttons";
  public static final String CREATE_TWO_LISTS = "createtwolists";
  public static final String SET_LEFT_RIGHT_DEVIDER_ = "setleftrightdevider";
  public static final String SET_VISIBLE_FALSE_COPY_BUTTON = "setvisiblefalsecopybutton";
  public static final String ADD_ATTRIBUTELIST = "addattributelist";
  public static final String ADD_PANEL = "addpanel";
  public static final String ADD_TABLE = "addtable";
  public static final String SET_CONTENT_ENABLING = "setcontentenabling";
  public static final String SWITCH_FOCUS = "switchfocus";
  public static final String ADD_CONTENT_CHANGE_LISTENER = "addcontentchangelistener";
  public static final String PRINT_BARCODE_LABELS = "printbarcodelabels";
  public static final String CREATE_PRINTERCHOOSER = "createprinterchooser";

  // tags
  public static final String ID_TAG_BEGIN = "<id>";
  public static final String ID_TAG_END = "</id>";
  public static final String LABEL_BEGIN = "<label>";
  public static final String LABEL_END = "</label>";
  public static final String FIELD_LENGTH_BEGIN = "<fieldlength>";
  public static final String FIELD_LENGTH_END = "</fieldlength>";
  public static final String VALUE_TAG_BEGIN = "<value>";
  public static final String VALUE_TAG_END = "</value>";
  public static final String VARIANT1_TAG_BEGIN = "<variant1>";
  public static final String VARIANT1_TAG_END = "</variant1>";
  public static final String VARIANT2_TAG_BEGIN = "<variant2>";
  public static final String VARIANT2_TAG_END = "</variant2>";
  public static final String VARIANT3_TAG_BEGIN = "<variant3>";
  public static final String VARIANT3_TAG_END = "</variant3>";
  public static final String VARIANT4_TAG_BEGIN = "<variant4>";
  public static final String VARIANT4_TAG_END = "</variant4>";
  public static final String VARIANT5_TAG_BEGIN = "<variant5>";
  public static final String VARIANT5_TAG_END = "</variant5>";
  public static final String VARIANT6_TAG_BEGIN = "<variant6>";
  public static final String VARIANT6_TAG_END = "</variant6>";
  public static final String VARIANT7_TAG_BEGIN = "<variant7>";
  public static final String VARIANT7_TAG_END = "</variant7>";
  public static final String VARIANT8_TAG_BEGIN = "<variant8>";
  public static final String VARIANT8_TAG_END = "</variant8>";
  public static final String VARIANT9_TAG_BEGIN = "<variant9>";
  public static final String VARIANT9_TAG_END = "</variant9>";
  public static final String VARIANT10_TAG_BEGIN = "<variantA>";
  public static final String VARIANT10_TAG_END = "</variantA>";
  public static final String VARIANT11_TAG_BEGIN = "<variantB>";
  public static final String VARIANT11_TAG_END = "</variantB>";
  public static final String VARIANT12_TAG_BEGIN = "<variantC>";
  public static final String VARIANT12_TAG_END = "</variantC>";
  
  // user actions
  public static final String CHARSET = "charset";
  public static final String ACTION = "action"; // button action or other action from ACTION_SOURCE
  public static final String ACTION_SOURCE = "actionsource";
  public static final String MENU_BUTTON_ACTION = "menubuttonaction"; // special action - only one parameter needed
  public static final String TOOLBAR_BUTTON_ACTION = "toolbarbuttonaction"; // special action - only one parameter needed
  public static final String ACTION_LIST = "actionlist";
  public static final String ACTION_LIST_EXTENSION = "actionlistext";
  public static final String ACTION_LIST_PREVIOUS = "actionlistprev";
  public static final String ACTION_LIST_NEXT = "actionlistnext";
  public static final String ACTION_NEW_ENTRY = "actionnewentry";
  public static final String ACTION_PRESENT = "actiondpresent";
  public static final String ACTION_LOAD = "actiondload";
  public static final String ACTION_COPY = "actiondcopy";
  public static final String ACTION_DELETE = "actiondelete";
  public static final String ACTION_DELETE_CONFIRMATION = "actiondeleteconfirmation";
  public static final String ACTION_SUBLISTDELETE_CONFIRMATION = "actionsublistdeleteconfirmation";
  public static final String ACTION_DELETE_CANCEL = "actiondeletecancel";
  public static final String ACTION_SUBLISTDELETE_CANCEL = "actionsublistdeletecancel";
  public static final String ACTION_CONFIRM_OK = "actionconfirmeok";
  public static final String ACTION_CONFIRM_CANCEL = "actionconfirmecancel";
  public static final String ACTION_SUBSELECT = "actionsubselect";
  public static final String ACTION_OK = "actionok";
  public static final String ACTION_CANCEL = "actioncancel";
  public static final String ACTION_CLOSE_TAB = "actionclosetab";
  public static final String ACTION_LOGOUT = "actionlogout";
  public static final String ACTION_ITEM_SELECTED = "actionitemselected";
  public static final String ACTION_CONTENT_CHANGED = "actioncontentchanged";

  // infos from applet to server
  public static final String APPLET_CODEBASE = "appletcodebase";
  public static final String USER_ID = "userid";
  public static final String PASSWORD = "password";
  public static final String TAB_OR_WINDOW_ID = "tabwinid";
  public static final String TAB_ELEMENT = "tabelement";
  public static final String FOCUS_ELEMENT_ID = "focuselementid";
  public static final String HTML_DIALOG_ID = "htmldialogid";
  public static final String IDENTIFIER = "identifier";
  public static final String FILTER = "filter";
  public static final String CASE_SENSITIVE = "casesensitive";
  public static final String NULL_VALUE = "nullvalue";

}

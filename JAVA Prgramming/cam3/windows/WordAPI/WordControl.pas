{
 * Copyright (c) 1999-2001 Christoph Mueller. All rights reserved.
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
}

unit WordControl;

interface

uses
  Classes, SysUtils, ComObj, Windows, ActiveX;

type
  TWordControlThread = class(TThread)
  private
    { Private-Deklarationen}
  protected
    procedure MakeActionFormInvisible;
    procedure MakeActionFormVisible;
    procedure ShowDocumentProgress;
    procedure ShowHelpForm;
    procedure Execute; override;
    function decodeParagraph(codedParagraph: string): string;
    function replace(line: string; src: string; target: string): string;
  end;

implementation

uses Word_TLB, WordAPI1, WordAPIProt, WordAPIHelp;

var
  MyWord: Variant;
  DocumentCount: integer;
  isToQuit: boolean;
  quitDelayInterval: integer;

procedure TWordControlThread.MakeActionFormInvisible;
begin
  FormAction.Visible := false;
end;

procedure TWordControlThread.MakeActionFormVisible;
begin
  FormAction.Visible := true;
end;

procedure TWordControlThread.ShowDocumentProgress;
begin
  FormAction.showDocumentProgress;
end;

procedure TWordControlThread.ShowHelpForm;
begin
  FormHelp.ShowModal;
end;

procedure TWordControlThread.Execute;
var
  WordInp: TextFile;
  line, key, value: string;
  templateName: string;
  noteNotMatchingBookmarks: boolean;
  ActiveDocumentDefined: boolean;

begin
  DocumentCount := 0;
  ActiveDocumentDefined := false;
  noteNotMatchingBookmarks := true;
  isToQuit := false;

  CoInitialize(Nil);

  try
    AssignFile(WordInp, 'WordInp.txt');
    Reset(WordInp);
  except
    Synchronize(ShowHelpForm);
    exit;
  end;

  try
    MyWord := GetActiveOleObject('Word.Application');
  except
    try
      MyWord := CreateOleObject('Word.Application');
    except
      FormProtocol.addEntry('Can''t start Word for Windows');
      exit;
    end;
  end;

  try
    MyWord.Application.Visible := true;
  except
    FormProtocol.addEntry('Can''t make Word visible');
    exit;
  end;

  while not Eof(WordInp) and not Terminated do
  begin
    Readln(WordInp, line);
    key := Trim(Copy(line, 1, 40));
    value := Trim(Copy(line, 41, 999999));
    if key = '@noteNotMatchingBookmarks' then
    begin
      if value = 'FALSE' then noteNotMatchingBookmarks := false
      else noteNotMatchingBookmarks := true;
    end
    else
    //--------------------------------------------------------------------------
    if key = '@createNewDocumentFromTemplate' then
    begin
      if value = 'TEMPLATE_TO_SELECT_BY_USER' then
      begin
        Synchronize(MakeActionFormInvisible);
        try
          if MyWord.Dialogs.Item(wdDialogFileNew).Show then ActiveDocumentDefined := true
          else ActiveDocumentDefined := false;
        except
          ActiveDocumentDefined := false;
        end;
        Synchronize(MakeActionFormVisible);
      end
      else
      begin
        templateName := value;
        try
          MyWord.Documents.Add(value);
          ActiveDocumentDefined := true;
          Synchronize(showDocumentProgress);
        except
          FormProtocol.addEntry('Template ' + value + ' not found');
          ActiveDocumentDefined := false;
        end;
      end;
    end
    //--------------------------------------------------------------------------
    else if key = '@changeDocumentDirectory' then
    begin
      try
        MyWord.Application.ChangeFileOpenDirectory(value);
      except
        FormProtocol.addEntry('Cannot change directory to ' + value);
      end;
    end
    else if key = '@saveDocumentAs' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SaveAs(value);
        except
          FormProtocol.addEntry('Cannot save document as ' + value);
        end;
      end
      else FormProtocol.addEntry('There is no document active to be saved as ' + value);
    end
    //--------------------------------------------------------------------------
    else if key = '@saveDocumentAsAndClose' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SaveAs(value);
        except
          FormProtocol.addEntry('Cannot save document as ' + value);
        end;
        try
          MyWord.ActiveDocument.Close();
          ActiveDocumentDefined := false;
        except
          FormProtocol.addEntry('Cannot close after saving');
        end;
      end
      else FormProtocol.addEntry('There is no document active to be saved as ' + value);
    end
    //--------------------------------------------------------------------------
    else if key = '@closeDocument' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.Close();
          ActiveDocumentDefined := false;
        except
          FormProtocol.addEntry('Cannot close after mailing');
        end;
      end
      else FormProtocol.addEntry('There is no document active to be closed');
    end
    //--------------------------------------------------------------------------
    else if key = '@quitApplication' then
    begin
      isToQuit := true;
      quitDelayInterval := 0;
    end
    //--------------------------------------------------------------------------
    else if key = '@quitApplicationAfterWaiting' then
    begin
      isToQuit := true;
      quitDelayInterval := StrToInt(value);
    end
    //--------------------------------------------------------------------------
    else if key = '@mailAndForget' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SendMail();
        except
          FormProtocol.addEntry('Cannot mail to ' + value);
        end;
        try
          // MyWord.ActiveDocument.Close(false);
          // ActiveDocumentDefined := false;
        except
          FormProtocol.addEntry('Cannot close after mailing');
        end;
      end
      else FormProtocol.addEntry('There is no document active to be mailed');
    end
    //--------------------------------------------------------------------------
    else if key = '@faxAndForget' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SendFax(Address:=value);
        except
          FormProtocol.addEntry('Cannot fax to ' + value);
        end;
        try
          MyWord.ActiveDocument.Close(false);
          ActiveDocumentDefined := false;
        except
          FormProtocol.addEntry('Cannot close after fax');
        end;
      end
      else FormProtocol.addEntry('There is no document active to be faxed');
    end
    //--------------------------------------------------------------------------
    else if key = '@printAndForget' then
    begin
      if ActiveDocumentDefined then
      begin
        if value = 'PRINTER_TO_SELECT_BY_USER' then
        begin
          Synchronize(MakeActionFormInvisible);
          try
            MyWord.Dialogs.Item(wdDialogFilePrint).Show;
          except
            FormProtocol.addEntry('Cannot print');
          end;
          Synchronize(MakeActionFormVisible);
          try
            MyWord.ActiveDocument.Close(false);
            ActiveDocumentDefined := false;
          except
            FormProtocol.addEntry('Cannot close after printing');
          end;
        end
        else
        begin
          try
            MyWord.ActivePrinter := value;
          except
            FormProtocol.addEntry('Cannot access printer ' + value);
          end;
          try
            MyWord.Application.PrintOut();
          except
            FormProtocol.addEntry('Cannot print');
          end;
          try
            MyWord.ActiveDocument.Close(false);
            ActiveDocumentDefined := false;
          except
            FormProtocol.addEntry('Cannot close after printing');
          end;
        end;
      end
      else FormProtocol.addEntry('There is no document active to be printed');
    end
    //--------------------------------------------------------------------------
    else if key = '@executeMacro' then
    begin
      try
        MyWord.Application.Run(MacroName:=value{, Wait:=True});
      except
        FormProtocol.addEntry('Cannot execute Macro ' + value);
      end;
    end // end of special commands!
    else if Copy(key, 1, 1) = '@' then FormProtocol.addEntry('Command ' + key + ' is not supported')
    else // beginning of bookmark work
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.Selection.GoTo(What:=wdGoToBookmark, Name:=key);
          MyWord.Selection.TypeText(Text:=decodeParagraph(value));
        except
          if noteNotMatchingBookmarks then FormProtocol.addEntry('Bookmark ' + key + ' in template ' + templateName + ' not found.');
        end;
        try
          MyWord.ActiveDocument.Saved := true;
        except
        end;
      end;
    end;
  end;

  CloseFile(WordInp);

  if ActiveDocumentDefined then
  begin
    try
      MyWord.ActiveDocument.Activate;
    except
      FormProtocol.addEntry('Can''t activate Document');
      exit;
    end;
  end;

  FormProtocol.presentIfNeccessary;

  if isToQuit then
  begin
    if quitDelayInterval > 0 then
    begin
      sleep(quitDelayInterval);
    end;
    try
      MyWord.Application.Quit;
    except
    end;
  end;

  CoUninitialize;
end;

function TWordControlThread.decodeParagraph(codedParagraph: string): string;
begin
    Result := replace(codedParagraph, '#13', #13);
end;

function TWordControlThread.replace(line: string; src: string; target: string): string;
var
  posi: integer;
  delimiter: integer;

begin
  posi := pos(src, line);
  delimiter := 0;
  while (posi > 0) and (delimiter < 5) do
  begin
    line := Copy(line, 1, posi -1) + target + Copy(line, posi + Length(src), 9999);
    posi := pos(src, line);
    delimiter := delimiter +1;
  end;
  Result := line;
end;

end.

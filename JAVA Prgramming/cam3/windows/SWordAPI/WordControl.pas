{
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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
  TWordControlObject = class(TObject)
  procedure Execute(PasCmdLine: string);
  private
    procedure ExecuteCore();
    procedure Logout(InfoToLog: string);
    procedure ShowDocumentProgress;
  protected
  end;

implementation

uses Word_TLB;

var
  WordControlObject: TWordControlObject;
  WordInp: TextFile;
  line, key, value: string;
  templateName: string;
  noteNotMatchingBookmarks: boolean;
  ActiveDocumentDefined: boolean;
  Logfile: TextFile;
  MyWord: Variant;
  DocumentCount: integer;
  quitDelayInterval: integer;
  table: integer;
  rowCounter, i: integer;

function ValueByKeyword(Source, Key: string): string;
var
  PosWert: integer;
  PosKlazu: integer;
  StrWrk: string;

begin
  Result := '';

  PosWert := Pos(UpperCase(Key) + '[' , UpperCase(Source));

  if PosWert > 0 then
  begin
    PosWert := PosWert + Length(UpperCase(Key)) + 1;
    StrWrk := Copy(UpperCase(Source), PosWert, 255);
    PosKlazu := Pos(']', StrWrk);
    if PosKlazu > 0 then
    begin
      StrWrk := Copy(Source, PosWert, 255);
      Delete(StrWrk, PosKlazu, 255);
      Result := StrWrk;
    end;
  end;

end;

procedure TWordControlObject.Execute(PasCmdLine: string);
var
  InputFileName: string;
  LogFileName: string;
begin

  CoInitialize(Nil);

  quitDelayInterval := 5000;
  rowCounter := 1; // always one data row already existing due to font differences to header row

  LogFileName := ValueByKeyword(PasCmdLine, 'LogFileName');
  if (LogFileName = '') then LogFileName := 'SWordAPI.log';
  AssignFile(Logfile, LogFileName);
  Rewrite(Logfile);

  InputFileName := ValueByKeyword(PasCmdLine, 'InputFileName');
  if (InputFileName = '') then InputFileName := 'WordInp.txt';
  WordControlObject.Logout('Called ' + TimeToStr(Time) + ', using input file name = ' + InputFileName);

  try
    AssignFile(WordInp, InputFileName);
    Reset(WordInp);
    ExecuteCore;
    CloseFile(WordInp);
  except
    // WordControlObject.Logout(MyWord.Application.GetLastError);
    WordControlObject.Logout('Cannot find input file ' + InputFileName);
  end;

  CloseFile(Logfile);

  CoUninitialize;

end;


procedure TWordControlObject.ExecuteCore();

begin
  DocumentCount := 0;
  ActiveDocumentDefined := false;
  noteNotMatchingBookmarks := true;

  try
    MyWord := CreateOleObject('Word.Application');
  except
    WordControlObject.Logout('Can''t start Word for Windows');
    exit;
  end;

  while not Eof(WordInp) do
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
        WordControlObject.Logout('No user available to select a template!');
      end
      else
      begin
        templateName := value;
        try
          MyWord.Documents.Add(value);
          ActiveDocumentDefined := true;
          WordControlObject.ShowDocumentProgress;
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Template ' + value + ' not found');
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
        // WordControlObject.Logout(MyWord.Application.GetLastError);
        WordControlObject.Logout('Cannot change directory to ' + value);
      end;
    end
    else if key = '@saveDocumentAs' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SaveAs(value);
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot save document as ' + value);
        end;
      end
      else WordControlObject.Logout('There is no document active to be saved as ' + value);
    end
    //--------------------------------------------------------------------------
    else if key = '@saveDocumentAsAndClose' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SaveAs(value);
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot save document as ' + value);
        end;
        try
          MyWord.ActiveDocument.Close();
          ActiveDocumentDefined := false;
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot close after saving');
        end;
      end
      else WordControlObject.Logout('There is no document active to be saved as ' + value);
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
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot close after mailing');
        end;
      end
      else WordControlObject.Logout('There is no document active to be closed');
    end
    //--------------------------------------------------------------------------
    else if key = '@quitApplicationAfterWaiting' then
    begin
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
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot mail to ' + value);
        end;
        try
          // MyWord.ActiveDocument.Close(false);
          // ActiveDocumentDefined := false;
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot close after mailing');
        end;
      end
      else WordControlObject.Logout('There is no document active to be mailed');
    end
    //--------------------------------------------------------------------------
    else if key = '@faxAndForget' then
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.ActiveDocument.SendFax(Address:=value);
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot fax to ' + value);
        end;
        try
          MyWord.ActiveDocument.Close(false);
          ActiveDocumentDefined := false;
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
          WordControlObject.Logout('Cannot close after fax');
        end;
      end
      else WordControlObject.Logout('There is no document active to be faxed');
    end
    //--------------------------------------------------------------------------
    else if key = '@printAndForget' then
    begin
      if ActiveDocumentDefined then
      begin
        if value = 'PRINTER_TO_SELECT_BY_USER' then
        begin
          WordControlObject.Logout('No user available to select a printer!');
          try
            MyWord.ActiveDocument.Close(false);
            ActiveDocumentDefined := false;
          except
            // WordControlObject.Logout(MyWord.Application.GetLastError);
            WordControlObject.Logout('Cannot close after printing');
          end;
        end
        else
        begin
          try
            MyWord.ActivePrinter := value;
          except
            // WordControlObject.Logout(MyWord.Application.GetLastError);
            WordControlObject.Logout('Cannot access printer ' + value);
          end;
          try
            MyWord.Application.PrintOut();
          except
            // WordControlObject.Logout(MyWord.Application.GetLastError);
            WordControlObject.Logout('Cannot print');
          end;
          try
            MyWord.ActiveDocument.Close(false);
            ActiveDocumentDefined := false;
          except
            // WordControlObject.Logout(MyWord.Application.GetLastError);
            WordControlObject.Logout('Cannot close after printing');
          end;
        end;
      end
      else WordControlObject.Logout('There is no document active to be printed');
    end
    //--------------------------------------------------------------------------
    else if key = '@executeMacro' then
    begin
      try
        MyWord.Application.Run(MacroName:=value{, Wait:=True});
      except
        // WordControlObject.Logout(MyWord.Application.GetLastError);
        WordControlObject.Logout('Cannot execute Macro ' + value);
      end;
    end
    //--------------------------------------------------------------------------
    else if key = '@tableBegin' then
    begin
      table := 1;
      if (value <> '') then table := strtoint(value);
    end
    //--------------------------------------------------------------------------
    else if key = '@tableEnding' then
    begin
      table := 0;
      rowCounter := 1;
    end
    //--------------------------------------------------------------------------
    else if key = '@newRow' then
    begin
      try
        MyWord.ActiveDocument.Tables.Item(table).Rows.add();
        rowCounter := rowCounter+1;
      except
        WordControlObject.Logout('Cannot create new row');
      end;
    end // end of special commands!
    //--------------------------------------------------------------------------
    else if Copy(key, 1, 1) = '@' then WordControlObject.Logout('Command ' + key + ' is not supported')
    else // beginning of bookmark work
    begin
      if ActiveDocumentDefined then
      begin
        try
          MyWord.Selection.GoTo(What:=wdGoToBookmark, Name:=key);
          // (cell word wrap!) if (table > 0) then MyWord.Selection.MoveDown(Unit:=wdLine, Count:=rowCounter);
          i := 1;
          if (table > 0) then while i <= rowCounter do
          begin
            if (i > 1) then
            begin // workarround - MoveDown wdCell not supported
              MyWord.Selection.MoveLeft(Unit:=wdCell, Count:=1);
              MyWord.Selection.MoveRight(Unit:=wdCell, Count:=1);
            end;
            MyWord.Selection.MoveDown(Unit:=wdLine, Count:=1);
            i := i+1;
          end;
          MyWord.Selection.TypeText(Text:=value);
        except
          if noteNotMatchingBookmarks then WordControlObject.Logout('Bookmark ' + key + ' in template ' + templateName + ' not found.');
        end;
        try
          MyWord.ActiveDocument.Saved := true;
        except
          // WordControlObject.Logout(MyWord.Application.GetLastError);
        end;
      end;
    end;
  end;

  if quitDelayInterval > 0 then
  begin
    sleep(quitDelayInterval);
  end;
  try
    MyWord.Application.Quit;
  except
    // WordControlObject.Logout(MyWord.Application.GetLastError);
    WordControlObject.Logout('Cannot quit application - maybe a bigger interval of quitApplicationAfterWaiting helps');
  end;

end;

procedure TWordControlObject.ShowDocumentProgress();
begin
end;

procedure TWordControlObject.Logout(InfoToLog: String);
begin
  Writeln(Logfile, InfoToLog);
end;

end.

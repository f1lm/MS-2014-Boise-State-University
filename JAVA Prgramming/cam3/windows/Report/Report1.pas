{
 * Copyright (c) 1999-2002 Christoph Mueller. All rights reserved.
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

 Version 1.2: now we pack parameters into "[]" instead of "()"
 Version 1.3, 10/16/01: user and password
 Version 1.4, 01/28/02: PrintSetupBtn + WindowState
 Version 1.5, 06/11/02: Label = "Reporting" instead of "Drucke" (German)
 Version 1.6, 12/27/02: Parameters and HTML output
}

unit Report1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  ComCtrls, UCrpe32, ExtCtrls, StdCtrls;

type
  TForm1 = class(TForm)
    Crpe1: TCrpe;
    Panel1: TPanel;
    Label1: TLabel;
    DelayedCloser: TTimer;
    procedure FormActivate(Sender: TObject);
    procedure Crpe1wOnCloseWindow(WindowHandle: HWND; var Cancel: Boolean);
    procedure Crpe1Error(Sender: TObject; const ErrorNum: Smallint;
      const ErrorString: String; var IgnoreError: Boolean);
    procedure FormCreate(Sender: TObject);
    procedure DelayedCloserTimer(Sender: TObject);
  private
    procedure print();
    { Private-Deklarationen}
  public
    { Public-Deklarationen}
  end;

var
  Form1: TForm1;

implementation

var
  printAlreadyCalled: boolean;
  debugMode: boolean;
  whereCondition: string;
  regularClosing: boolean;

{$R *.DFM}

//******************************************************************************
function ValueByKeyword(Source, Key: string): string;
//******************************************************************************
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

//******************************************************************************
procedure TForm1.print();
//******************************************************************************
var
  PasCmdLine: string;
  outputType: string;
  fileName: string;
  param: string;
  i: integer;

begin
  regularClosing := true;
  if debugMode then MessageDlg('Before setting Title', mtInformation, [mbOk], 0);
  Application.Title := 'Report';
  if debugMode then MessageDlg('Before refresh', mtInformation, [mbOk], 0);
  refresh;

  if debugMode then MessageDlg('Before setting CR properties', mtInformation, [mbOk], 0);
  PasCmdLine := CmdLine;

  whereCondition := ValueByKeyword(PasCmdLine, 'where');

  Crpe1.ReportName := ValueByKeyword(PasCmdLine, 'Report');
  Crpe1.Connect.ServerName := ValueByKeyword(PasCmdLine, 'datasource');
  Crpe1.Connect.UserID := ValueByKeyword(PasCmdLine, 'User');
  Crpe1.Connect.Password := ValueByKeyword(PasCmdLine, 'Password');
  Crpe1.DiscardSavedData := True;
  if debugMode then MessageDlg('whereCondition: ' + whereCondition, mtInformation, [mbOk], 0);
  if whereCondition <> '' then Crpe1.Selection.Formula.Add(whereCondition);

  Crpe1.ParamFields.Retrieve;
  i := 1;
  param := ValueByKeyword(PasCmdLine, 'Parm' + IntToStr(i));
  while ((param) <> '') do
  begin
    Crpe1.ParamFields[i-1].Value := param;
    i := i+1;
    param := ValueByKeyword(PasCmdLine, 'Parm' + IntToStr(i));
  end;

  outputType := ValueByKeyword(PasCmdLine, 'Output');

  if outputType = 'toWindow' then
  begin
    Crpe1.Output := toWindow;
    Crpe1.WindowEvents := true;
    if (ValueByKeyword(PasCmdLine, 'PrintSetupBtn') = 'true') then Crpe1.WindowButtonBar.PrintSetupBtn := true;
    if ValueByKeyword(PasCmdLine, 'WindowState') = 'wsNormal' then Crpe1.WindowState := wsNormal;
    if ValueByKeyword(PasCmdLine, 'WindowState') = 'wsMaximized' then Crpe1.WindowState := wsMaximized;
  end

  else if outputType = 'toHTML' then
  begin
    Crpe1.Output := toExport;
    fileName := ValueByKeyword(PasCmdLine, 'FileName');
    if fileName = '' then fileName := 'C:\temp\reportResult.html';
    Crpe1.Export.FileName := fileName;
    Crpe1.Export.FileType := HTML32ext;
  end

  else Crpe1.Output := toPrinter;

  if debugMode then MessageDlg('Before executing CR', mtInformation, [mbOk], 0);
  Crpe1.execute;

  if debugMode then MessageDlg('Before closing', mtInformation, [mbOk], 0);
  if not (ValueByKeyword(PasCmdLine, 'Output') = 'toWindow') then close;
  if debugMode then MessageDlg('Before end of print procedure', mtInformation, [mbOk], 0);

end;

procedure TForm1.FormActivate(Sender: TObject);
begin
  debugMode := false;
  if debugMode then MessageDlg('Event FormActivate', mtInformation, [mbOk], 0);
  if not printAlreadyCalled then
  begin
    printAlreadyCalled := true;
    print;
  end;
end;

procedure TForm1.Crpe1wOnCloseWindow(WindowHandle: HWND;
  var Cancel: Boolean);
begin
  if regularClosing then DelayedCloser.Enabled := true;
end;

procedure TForm1.Crpe1Error(Sender: TObject; const ErrorNum: Smallint;
  const ErrorString: String; var IgnoreError: Boolean);
begin
  if not IgnoreError then
  begin
    regularClosing := false;
    DelayedCloser.Enabled := false;
    MessageDlg(Crpe1.LastErrorString + #13#10#10 + '(Please refer http://www.must.de/Jareport.htm for usage context)', mtError, [mbOk], 0);
    close;
  end;

end;

procedure TForm1.FormCreate(Sender: TObject);
begin
  printAlreadyCalled := false;
end;

procedure TForm1.DelayedCloserTimer(Sender: TObject);
begin
  close;
end;

end.

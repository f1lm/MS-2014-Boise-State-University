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

{
  Copies files including their windows attributes
  Called by Java Class de.must.util.FileCopy
}

unit FileCopy1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  ComCtrls, ExtCtrls, StdCtrls;

type
  TForm1 = class(TForm)
    Panel1: TPanel;
    Label1: TLabel;
    procedure FormActivate(Sender: TObject);
  private
    procedure doIt();
    { Private-Deklarationen}
  public
    { Public-Deklarationen}
  end;

var
  Form1: TForm1;

implementation

{$R *.DFM}

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

procedure TForm1.doIt();
var
  PasCmdLine: string;
  FromFile: string;
  ToFile: string;
  zFromFile: array[0..150] of char;
  zToFile: array[0..150] of char;

begin
  Application.Title := 'Copy';
  PasCmdLine := CmdLine;
  FromFile := ValueByKeyword(PasCmdLine, 'from');
  ToFile := ValueByKeyword(PasCmdLine, 'to');
  // MessageDlg('FromFile: ' + FromFile, mtInformation, [mbOk], 0);
  // MessageDlg('ToFile: ' + ToFile, mtInformation, [mbOk], 0);
  StrPCopy(zFromFile, FromFile);
  StrPCopy(zToFile, ToFile);
  DeleteFile(zToFile);
  if not CopyFile(zFromFile, zToFile, false) then MessageDlg('Kopieren fehlgeschlagen', mtError, [mbOk], 0);
end;

procedure TForm1.FormActivate(Sender: TObject);
begin
  doIt;
  Close();
end;

end.

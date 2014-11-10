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
  Creates a new mail to given e-mail address.
  Called by Java class de.must.util.Mail
}

unit Mailto1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  shellapi;

type
  TForm1 = class(TForm)
    procedure FormActivate(Sender: TObject);
  private
    { Private-Deklarationen}
    procedure act;
  public
    { Public-Deklarationen}
  end;

var
  Form1: TForm1;

implementation

{$R *.DFM}

procedure TForm1.act();
var
  PasCmdLine: string;
  ParmPos: integer;
  CmdParm: string;
begin
  PasCmdLine := CmdLine;
  // MessageDlg(PasCmdLine, mtInformation, [mbOk], 0);
  ParmPos := Pos('Mailto.exe ', PasCmdLine) + 12;
  if ParmPos < 10 then ParmPos := Pos('Mailto ', PasCmdLine) + 8;
  if ParmPos > 5 then
  begin
    CmdParm := Copy(PasCmdLine, ParmPos, 999);
    if Pos('"', CmdParm) > 0 then CmdParm := Copy(CmdParm, 1, Length(CmdParm) -1);
    // MessageDlg(CmdParm, mtInformation, [mbOk], 0);
    ShellExecute(Application.Handle, 'open', PChar('mailto:' + CmdParm), nil, nil, SW_ShowNormal);
  end;
end;


procedure TForm1.FormActivate(Sender: TObject);
begin
  act;
  close;
end;

end.

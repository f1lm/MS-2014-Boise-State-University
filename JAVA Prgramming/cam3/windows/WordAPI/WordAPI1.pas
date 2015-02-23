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
}

{
  Interface to control Word for Windows
  Called by Java Class de.must.util.WordProcessing
  Version 1.4 - supports different carriage returns
}

unit WordAPI1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls, ComCtrls, ComObj, ExtCtrls, WordControl;

type
  TFormAction = class(TForm)
    ButtonCancel: TButton;
    StatusBar1: TStatusBar;
    TimerQuitDelay: TTimer;
    procedure FormCreate(Sender: TObject);
    procedure ButtonCancelClick(Sender: TObject);
    procedure showDocumentProgress;
  private
    ThisWordControl: TWordControlThread;
    DocumentCount: integer;
    procedure ThreadTerminate(Sender: TObject);
  public
    { Public-Deklarationen}
  end;

var
  FormAction: TFormAction;

implementation

{$R *.DFM}

uses Word_TLB, WordAPIProt, WordAPIHelp;

procedure TFormAction.FormCreate(Sender: TObject);
begin
  ThisWordControl := TWordControlThread.Create(false);
  ThisWordControl.OnTerminate := ThreadTerminate;
end;

procedure TFormAction.showDocumentProgress;
begin
  DocumentCount := DocumentCount + 1;
  StatusBar1.SimpleText := IntToStr(DocumentCount) + '. Dokument';
end;

procedure TFormAction.ButtonCancelClick(Sender: TObject);
begin
  ThisWordControl.Terminate;
  close;
end;

procedure TFormAction.ThreadTerminate(Sender: TObject);
begin
  close;
end;

end.

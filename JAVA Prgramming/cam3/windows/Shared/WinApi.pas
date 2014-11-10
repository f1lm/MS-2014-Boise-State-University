{
 * Copyright (c) 1999-2006 Christoph Mueller. All rights reserved.
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
unit WinApi;

interface

uses
  Windows, SysUtils, Dialogs, Registry, Classes;

type
  TWinApi = class(TObject)
  private
    { Private-Deklarationen}
  public
    { Public-Deklarationen}
    class function javaLikePath(windowPath: string): string;
    class function run(cmd: string): boolean; overload;
    class function run(cmd: string; show:boolean): boolean; overload;
    class function getBrowserPath(): string;
    class function getODBCNames(): TStrings;
    class function runHtml(URLstring: string): boolean;
    class function ValueByKeyword(Source, Key: string): string;
  end;

implementation

class function TWinApi.javaLikePath(windowPath: string): string;
var
  javaLikePath: String;

begin
  javaLikePath := windowPath;
  while Pos('\', javaLikePath) > 0 do
    javaLikePath[Pos('\', javaLikePath)] := '/';

  result := javaLikePath;

end;

class function TWinApi.run(cmd: string):boolean;
begin
  result := run(cmd, true);
end;

class function TWinApi.run(cmd: string; show: boolean):boolean;
var
  pcmd: array[0..2000] of char;
  // pcmd: array of char;
  StartupInfo: TStartupInfo;
  ProcessInfo: TProcessInformation;

begin
  // SetLength(pcmd, Length(cmd));
  StrPCopy(pcmd, cmd);
  FillChar(StartupInfo,Sizeof(StartupInfo),#0);
  StartupInfo.cb := Sizeof(StartupInfo);
  StartupInfo.dwFlags := STARTF_USESHOWWINDOW;
  if show then StartupInfo.wShowWindow := SW_SHOWNORMAL  // will not show the first Java-Window!
  else         StartupInfo.wShowWindow := SW_HIDE;

  Result := CreateProcess(
    nil,
    pcmd,
    nil,
    nil,
    false,
    CREATE_NEW_CONSOLE or
    NORMAL_PRIORITY_CLASS,
    nil,
    nil,
    StartupInfo,
    ProcessInfo
  );

end;

class function TWinApi.getBrowserPath():String;
var
  Registry1: TRegistry;

begin
  Registry1 := TRegistry.Create;
  with Registry1 do begin
    RootKey := HKEY_LOCAL_MACHINE;
    OpenKeyReadOnly('SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\Netscape.exe');
    Result := ReadString('');
  end;

  if Result = '' then with Registry1 do begin
    RootKey := HKEY_LOCAL_MACHINE;
    OpenKeyReadOnly('SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\IEXPLORE.EXE');
    Result := ReadString('');
  end;

  Registry1.free;

end;

class function TWinApi.getODBCNames(): TStrings;
var
  Registry1: TRegistry;
  ODBCNames: TStrings;
  // i: integer;

begin
  ODBCNames := TStringList.Create;

  Registry1 := TRegistry.Create;
  with Registry1 do begin
    RootKey := HKEY_LOCAL_MACHINE;
    if OpenKeyReadOnly('SOFTWARE\ODBC\ODBC.INI\') then
    begin
      GetKeyNames(ODBCNames);
    end;
  end;

  Registry1.free;

  (* for i := 0 to ODBCNames.count -1 do
  begin
    MessageDlg(ODBCNames[i], mtInformation, [mbOk], 0);
  end;     *)

  Result := ODBCNames;

end;

class function TWinApi.runHtml(URLstring: string):boolean;
var
  browserPath: string;

begin
  browserPath := getBrowserPath();
  if browserPath = '' then Result := false
  else Result := run(browserPath + ' ' + URLstring);
  
end;

class function TWinApi.ValueByKeyword(Source, Key: string): string;
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

end.


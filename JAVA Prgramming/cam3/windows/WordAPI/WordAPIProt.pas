unit WordAPIProt;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls, ExtCtrls, ComCtrls;

type
  TFormProtocol = class(TForm)
    RichEdit1: TRichEdit;
    Panel1: TPanel;
    ButtonOk: TButton;
    procedure ButtonOkClick(Sender: TObject);
  private
    { Private-Deklarationen}
  public
    { Public-Deklarationen}
    procedure addEntry(protocolLine: string);
    function presentIfNeccessary: boolean;
  end;

var
  FormProtocol: TFormProtocol;

implementation

{$R *.DFM}
procedure TFormProtocol.addEntry(protocolLine: string);
begin
  RichEdit1.Lines.Add(protocolLine);
end;

function TFormProtocol.presentIfNeccessary: boolean;
begin
  if RichEdit1.Lines.Count = 0 then result := false
  else
  begin
    result := true;
    ShowModal;
  end;

end;

procedure TFormProtocol.ButtonOkClick(Sender: TObject);
begin
  Close;
end;

end.

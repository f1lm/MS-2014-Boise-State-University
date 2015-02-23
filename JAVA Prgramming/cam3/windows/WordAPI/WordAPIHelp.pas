unit WordAPIHelp;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls, ExtCtrls;

type
  TFormHelp = class(TForm)
    Panel1: TPanel;
    ButtonHelp: TButton;
    ButtonClose: TButton;
    Memo1: TMemo;
    procedure ButtonHelpClick(Sender: TObject);
    procedure ButtonCloseClick(Sender: TObject);
  private
    { Private-Deklarationen}
  public
    { Public-Deklarationen}
  end;

var
  FormHelp: TFormHelp;

implementation

{$R *.DFM}

uses WinAPI;

procedure TFormHelp.ButtonHelpClick(Sender: TObject);
begin
  TWinAPI.runHtml('http://www.must.de/Javactpe.htm');
  Close;
end;

procedure TFormHelp.ButtonCloseClick(Sender: TObject);
begin
  Close;
end;

end.

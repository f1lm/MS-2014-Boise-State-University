unit MailTest1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls, shellapi;

type
  TForm1 = class(TForm)
    Button1: TButton;
    Button2: TButton;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
  private
    { Private-Deklarationen}
  public
    { Public-Deklarationen}
  end;

var
  Form1: TForm1;

implementation

uses WinAPI;

{$R *.DFM}

procedure TForm1.Button1Click(Sender: TObject);
var
  WinAPI: TWinAPI;
begin
  // es gibt eine Java-Unterstützung!
  ShellExecute(Application.Handle, 'open', PChar('Mailto:Christoph Müller<CMueller@must.de>'), nil, nil, SW_ShowNormal);
  // WinAPI.run('Mailto:CMueller@must.de');
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
  // ExecFile('c:\mustfiles\Javactpe.htm');
end;

end.

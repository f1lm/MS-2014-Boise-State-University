program Mailto;

uses
  Forms,
  Mailto1 in 'Mailto1.pas' {Form1};

{$R *.RES}

begin
  Application.Initialize;
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.

program Report;

uses
  Forms,
  Report1 in 'Report1.pas' {Form1};

{$R *.RES}

begin
  Application.Initialize;
  Application.Title := '';
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.

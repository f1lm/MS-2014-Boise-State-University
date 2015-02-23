program WordAPI;

uses
  Forms,
  WordAPI1 in 'WordAPI1.pas' {FormAction},
  Word_TLB in 'Word_TLB.pas';
  //WordAPIProt in 'WordAPIProt.pas' {FormProtocol},
  //WordAPIHelp in 'WordAPIHelp.pas' {FormHelp},
  //WinApi in '..\Shared\WinApi.pas';

{$R *.RES}

begin
  Application.Initialize;
  Application.CreateForm(TFormAction, FormAction);
  // Application.CreateForm(TFormProtocol, FormProtocol);
  // Application.CreateForm(TFormHelp, FormHelp);
  Application.Run;
end.

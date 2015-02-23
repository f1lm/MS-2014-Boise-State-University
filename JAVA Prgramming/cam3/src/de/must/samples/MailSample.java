package de.must.samples;

import de.must.util.MailviaAPI;

public class MailSample {

  public static void main(String[] args) {
    new MailSample();
  }
  
  public MailSample() {
    MailviaAPI mail = new MailviaAPI("recipient@foreigndomain.com", "smtp.server.com", "me@mydomain.com", "Sample Subject");
    mail.add("Hi Pete,");
    mail.add(true, "how are you?");
    mail.add("I hope you're alright!");
    mail.addEmptyLine();
    mail.add(true, "Regards,");
    mail.add("Tim");
    if (!mail.send()) {
	    System.out.println("Could not send mail, check log file!");
    }
  }
  
}

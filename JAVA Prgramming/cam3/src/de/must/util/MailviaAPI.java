/*
 * Copyright (c) 2005-2010 Christoph Mueller. All rights reserved.
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
 */

package de.must.util;

import java.util.*;

import javax.mail.*;
import javax.mail.internet.*;

import de.must.io.Logger;

/**
 * Wrapper around mailapi.jar.
 * @author Christoph Mueller
 */
public class MailviaAPI {
  
  private StringBuffer body = new StringBuffer();
  private Vector<String> recipients = new Vector<String>();
  private Vector<String> recipientsCC = new Vector<String>();
  private String smtpHost;
  private int port;
  private String sender;
  private String subject;
  private String user;
  private String password;
  
  /**
   * Constructs a new mail object with default port (25) and without user authentication.
   * @param recipient the recipient (to)
   * @param smtpHost the SMTP host 
   * @param sender the sender email address
   * @param subject the subject of the mail
   */
  public MailviaAPI(String recipient, String smtpHost, String sender, String subject) {
    this(recipient, smtpHost, -1, sender,  subject,  null,  null);
  }
  
  /**
   * Constructs a new mail object with default port (25).
   * @param recipient the recipient (to)
   * @param smtpHost the smtp host 
   * @param sender the sender email address
   * @param subject the subject of the mail
   * @param user the account name
   * @param password the account password
   */
  public MailviaAPI(String recipient, String smtpHost, String sender, String subject, String user, String password) {
    this(recipient, smtpHost, -1, sender,  subject,  user,  password);
  }
  
  /**
   * Constructs a new mail object.
   * @param recipient the recipient (to)
   * @param smtpHost the smtp host 
   * @param port the port of the smtp host to use
   * @param sender the sender email address
   * @param subject the subject of the mail
   * @param user the account name
   * @param password the account password
   */
  public MailviaAPI(String recipient, String smtpHost, int port, String sender, String subject, String user, String password) {
    addRecipient(recipient);
    this.smtpHost = smtpHost;
    this.port = port;
    this.sender = sender;
    this.subject = subject;
    this.user = user;
    this.password = password;
    if (port == 0 || port == -1) {
      this.port = 25;
    }
  }
  
  /**
   * Adds another recipient.
   * @param recipient the additional recipient
   */
  public void addRecipient(String recipient) {
    StringTokenizer tokenizer = new StringTokenizer(recipient, ",;", false);
    while (tokenizer.hasMoreTokens()) {
      String token = tokenizer.nextToken().trim();
      recipients.add(token);
    }
  }
  
  /**
   * Adds another CC recipient.
   * @param ccRecipient the additional CC recipient
   */
  public void addRecipientCC(String ccRecipient) {
    StringTokenizer tokenizer = new StringTokenizer(ccRecipient, ",;", false);
    while (tokenizer.hasMoreTokens()) {
      recipientsCC.add(tokenizer.nextToken().trim());
    }
  }
  
  /**
   * Adds an empty line to the mail body.
   */
  public void addEmptyLine() {
    add(false, "");
  }
  
  /**
   * Adds a paragraph to the mail body.
   * @param paragraph the paragraph to be added to the body
   */
  public void add(String paragraph) {
    add(false, paragraph);
  }
  
  /**
   * Adds a paragraph to the mail body.
   * @param emptyLineBefore whether or not there should be an empty line before the paragraph
   * @param paragraph the paragraph to be added to the body
   */
  public void add(boolean emptyLineBefore, String paragraph) {
    if (body.length() > 0) body.append("\n"); 
    if (emptyLineBefore) body.append("\n"); 
    body.append(paragraph);
  }
  
//  public boolean send() {
//    System.out.println("Mail not activiated!");
//    return false;
//  }
  
  /**
   * Sends the mail.
   * @return true if sending was successful
   */
  public boolean send() {
    boolean result = true;
    try {
      sendReturnExc();
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      result = false;
    }
    return result;
  }

  /**
   * Sends the mail.
   */
  public void sendReturnExc() throws AddressException, MessagingException {
    Properties p = new Properties();
    p.put("mail.transport.protocol", "smtp");
    p.put("mail.smtp.host", smtpHost);
    p.put("mail.smtp.port", String.valueOf(port));
    if (user != null) {
      p.put("mail.smtp.auth", "true"); 
    }
    Session mailSession=Session.getInstance(p);
    Message msg = new MimeMessage(mailSession);
    msg.setFrom(new InternetAddress(sender));
    msg.setRecipients(Message.RecipientType.TO, parseRecipients(recipients));
    if (recipientsCC.size() > 0) {
      msg.setRecipients(Message.RecipientType.CC, parseRecipients(recipientsCC));
    }
    msg.setSentDate(new Date());
    msg.setSubject(subject);
    // msg.setContent("my content", "text/plain");
    msg.setText(body.toString());
    if (user != null) {
      Transport transport = mailSession.getTransport("smtp");
      transport.connect(smtpHost, user, password);
      transport.sendMessage(msg, msg.getAllRecipients());
      transport.close();
    } else {
      Transport.send(msg);
    }
  }
  
  private Address[] parseRecipients(Vector<String> recipients) throws AddressException {
    StringBuffer recipientBuffer = new StringBuffer();
    Iterator<String> iterator = recipients.iterator();
    while (iterator.hasNext()) {
      String recipient = iterator.next();
      if (recipientBuffer.length() > 0) recipientBuffer.append(',');
      recipientBuffer.append(recipient);
    }
    return InternetAddress.parse(recipientBuffer.toString());
  }

}

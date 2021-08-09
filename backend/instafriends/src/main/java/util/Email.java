package util;


import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;



public class Email {

	public static void sendMail(String receipient ,String msg)throws Exception {

		
		Properties properties = new Properties();
		
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", "587");
		
		String myAccountEmail="EarthGroup2022@gmail.com";
		String password="ZubairAhmed2022";
		
		Session  session=Session.getInstance(properties, new Authenticator() {
		

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(myAccountEmail,password);
			}
		});
		 
		Message message=prepareMessage(session ,myAccountEmail , receipient , msg);
		

		Transport.send(message);
		

	}
	private static Message prepareMessage(Session session , String myAccountEmail , String receipient,String msg) {

		
		try {
			

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(myAccountEmail));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(receipient));
			message.setSubject("Your New Password");
			message.setText("Your Temporary new Password is: "+msg);
			
			return message;
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
}

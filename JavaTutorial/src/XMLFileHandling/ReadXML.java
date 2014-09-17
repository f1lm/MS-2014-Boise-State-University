package XMLFileHandling;

import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class ReadXML {

	public static void main(String[] args) {
		// DocumentBuilderFactory
		// DocumentBuilder
		// Document
		// NodeList by tagName
		// loop to get Element and FirstChild and nodevalue

		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse("http://rss.allrecipes.com/daily.aspx?hubID=80");
			NodeList list = doc.getElementsByTagName("title");
			System.out.println("There are: " +list.getLength() + " items");
			for (int i = 0; i < list.getLength(); i++) {
				Element item = (Element) list.item(i);
				System.out.println(item.getFirstChild().getNodeValue());
			}
		} catch (DOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}

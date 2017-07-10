import javax.xml.parsers.*;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.*;

import java.net.URL;
import java.net.URLEncoder;

public class examplePath {
	 static void print ( Node e ) {
			if (e instanceof Text)
			    System.out.print(((Text) e).getData());
			else {
			    NodeList c = e.getChildNodes();
			    System.out.print("<"+e.getNodeName());
			    NamedNodeMap attributes = e.getAttributes();
			    for (int i = 0; i < attributes.getLength(); i++)
				System.out.print(" "+attributes.item(i).getNodeName()
						 +"=\""+attributes.item(i).getNodeValue()+"\"");
			    System.out.print(">");
			    for (int k = 0; k < c.getLength(); k++)
				print(c.item(k));
			    System.out.print("</"+e.getNodeName()+">");
			}
	    }
	 static void query(Node root) throws Exception
	 {
		 XPathFactory xpathFactory = XPathFactory.newInstance();
			XPath xpath = xpathFactory.newXPath();
	    	
	    			
			NodeList result = (NodeList) xpath.compile("//product[rating/rating>4.5]/following::node()").evaluate(root,XPathConstants.NODESET);
			System.out.println("Result : Count : " + result.getLength());
			System.out.println("XPath query: "+"//product[rating/rating>4.5]/fullDescription");
			for (int i = 0; i < result.getLength(); i++)
			    print(result.item(i));
			System.out.println();
	 }
	    public static void main ( String args[] ) throws Exception {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse((new URL("http://sandbox.api.shopping.com/publisher/3.0/rest/GeneralSearch?apiKey=78b0db8a-0ee1-4939-a2f9-d3cd95ec0fcc&visitorUserAgent&visitorIPAddress&trackingId=7000610&categoryId=72&keyword="+URLEncoder.encode("Apple", "UTF-8"))).openStream());
		Node root = doc.getDocumentElement();
		query(root);
	    }

}
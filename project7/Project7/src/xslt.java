
import javax.xml.parsers.*;

import org.w3c.dom.*;

import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;

import java.io.*;
import java.util.Scanner;
import java.net.URL;
import java.net.URLEncoder;


class xslt {
    public static void main ( String argv[] ) throws Exception {
    	System.out.println("Enter the keyword for search : ");
    	
    	Scanner in = new Scanner(System.in);
        String keyword = in.nextLine();
        in.close();   
        
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse((new URL("http://sandbox.api.shopping.com/publisher/3.0/rest/GeneralSearch?apiKey=78b0db8a-0ee1-4939-a2f9-d3cd95ec0fcc&visitorUserAgent&visitorIPAddress&trackingId=7000610&categoryId=72&keyword="+URLEncoder.encode(keyword, "UTF-8"))).openStream());
				
		File stylesheet = new File("C:/Users/Patel/Desktop/WEB/project7/search.xsl");
		
		StreamSource stylesource = new StreamSource(stylesheet);
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformerXSLT = tf.newTransformer(stylesource);
		DOMSource sourceXSLT = new DOMSource(doc);
		StreamResult resultXSLT = new StreamResult(System.out);
		transformerXSLT.transform(sourceXSLT,resultXSLT);
    }
}
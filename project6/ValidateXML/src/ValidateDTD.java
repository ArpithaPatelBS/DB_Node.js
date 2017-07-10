import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.XMLReader;


public class ValidateDTD {
	// validate using SAX (DTD as defined in the XML)
	  public static boolean validateWithDTDUsingSAX(String xml) 
	    throws ParserConfigurationException, IOException
	  {
	    try {
	      
	      SAXParserFactory factory = SAXParserFactory.newInstance();
	      factory.setValidating(true);
	      factory.setNamespaceAware(true);

	      SAXParser parser = factory.newSAXParser();

	      XMLReader reader = parser.getXMLReader();
	      reader.setErrorHandler(
	          new ErrorHandler() {
	            public void warning(SAXParseException e) throws SAXException {
	              System.out.println("WARNING : " + e.getMessage()); // do nothing
	            }

	            public void error(SAXParseException e) throws SAXException {
	              System.out.println("ERROR : " + e.getMessage());
	              throw e;
	            }

	            public void fatalError(SAXParseException e) throws SAXException {
	              System.out.println("FATAL : " + e.getMessage());
	              throw e;
	            }
	          }
	          );
	      reader.parse(new InputSource( xml ));
	      System.out.println("File validation test successfull");
	      return true;
	    }
	    catch (ParserConfigurationException pce) {
	      throw pce;
	    } 
	    catch (IOException io) {
	      throw io;
	    }
	    catch (SAXException se){
	      return false;
	    }
	  }
	  
	  public static void main (String args[]) throws Exception{
	    System.out.println(ValidateDTD.validateWithDTDUsingSAX("C:/Users/Patel/Desktop/WEB/project6/cs.xml"));
	    /*
	      output :
	               true
	               true
	    */           
	  }

}
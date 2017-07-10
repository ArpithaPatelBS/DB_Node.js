
?import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.XMLReader;


final class valDTD {
    public static void main ( String args[] ) throws Exception {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        factory.setValidating(true);
        factory.setNamespaceAware(true);
        XMLReader xmlReader = factory.newSAXParser().getXMLReader();
        xmlReader.parse("C:/Users/Patel/Desktop/WEB/project6/cs.xml");
        System.out.println("done");
    }
}
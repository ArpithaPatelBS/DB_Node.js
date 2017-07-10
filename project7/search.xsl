<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body>
		<h3>Category List</h3>
		<table border="1">
		  <tr>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th>Description</th>
		  </tr>
		  <xsl:for-each select="//product">
			<tr>
			  <td><img src="{images/image/sourceURL}"/></td>
			  <td><xsl:value-of select="name"/></td>
			  <td><xsl:value-of select="minPrice"/></td>
			  <td><xsl:value-of select="fullDescription"/></td>
			</tr>
		  </xsl:for-each>
		</table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

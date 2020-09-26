<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<xsl:for-each select="projects/project">
				
			<xsl:element name="li"><xsl:attribute name="class">media</xsl:attribute>
							
				<xsl:element name="img">
					<xsl:attribute name="src"><xsl:value-of select="icon"/></xsl:attribute>
					<xsl:attribute name="width">64</xsl:attribute>
					<xsl:attribute name="height">64</xsl:attribute>
				</xsl:element>
				
				<xsl:element name="div">
					<xsl:attribute name="class">media-body mx-2</xsl:attribute>
					<h5>
						<xsl:attribute name="class">m-1</xsl:attribute>
						<xsl:element name="a">
							<xsl:attribute name="href"><xsl:value-of select="hostedUrl"/></xsl:attribute>
							<xsl:value-of select="name" />
						</xsl:element>
					</h5>
					<p>
						<xsl:value-of select="description"/>
					</p>
				</xsl:element>
			</xsl:element>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>

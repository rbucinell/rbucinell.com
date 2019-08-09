<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<xsl:for-each select="projects/project">
				
			<xsl:element name="div"><xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute><xsl:attribute name="class">row</xsl:attribute>
				
				<xsl:element name="div"><xsl:attribute name="class">col-lg-12</xsl:attribute>
					
					<xsl:element name="div"><xsl:attribute name="class">panel-body panel codeitem</xsl:attribute>
						
						<xsl:element name="div"><xsl:attribute name="class">media</xsl:attribute>
							
							<xsl:element name="div"><xsl:attribute name="class">media-left</xsl:attribute>
						
								<xsl:element name="img">
									<xsl:attribute name="src"><xsl:value-of select="icon"/></xsl:attribute>
									<xsl:attribute name="width">24</xsl:attribute>
									<xsl:attribute name="height">24</xsl:attribute>
								</xsl:element>
								
							</xsl:element>
							
							<xsl:element name="div"><xsl:attribute name="class">media-body</xsl:attribute>
								<b>
									<xsl:element name="a">
										<xsl:attribute name="href"><xsl:value-of select="hostedUrl"/></xsl:attribute>
										<xsl:value-of select="name" />
									</xsl:element>
								</b>
								<p>
									<xsl:value-of select="description"/>
								</p>
							</xsl:element>
						</xsl:element>	
					</xsl:element>
				</xsl:element>
			</xsl:element>
			
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>

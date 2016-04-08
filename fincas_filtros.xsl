<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="array"/>
<xsl:template match="/">
            <xsl:call-template name="strSplit">
                <xsl:with-param name="string" select="$array" />
                <xsl:with-param name="pattern" select="'-'" />
            </xsl:call-template>
</xsl:template>

    <xsl:template name="strSplit">
        <xsl:param name="string" />
        <xsl:param name="pattern" />

        <xsl:choose>
            <xsl:when test="contains($string, $pattern)">
                <xsl:call-template name="strSplit">
                    <xsl:with-param name="string" select="substring-before($string, $pattern)" />
                    <xsl:with-param name="pattern" select="$pattern" />
                </xsl:call-template>
                <xsl:call-template name="strSplit">
                    <xsl:with-param name="string" select="substring-after($string, $pattern)" />
                    <xsl:with-param name="pattern" select="$pattern" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="fincas/finca[codi=$string]"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <xsl:template match="finca">
    <div class="row">
      <div id="cuadro_finca" class="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-offset-1 col-md-10 col-lg-offset-0 col-lg-12">
        <div class="col-md-12 col-lg-6">
            <a class="mouse_select"><xsl:attribute name="onclick">loadPropiedad(<xsl:value-of select="codi"/>)</xsl:attribute>
            <img id="img_finca" class="img-responsive">
                  <xsl:attribute name="src"><xsl:value-of select="imagenes/url"/></xsl:attribute>
            </img>
          </a>
        </div>
        <div id="descripcio" class="col-md-12 col-lg-6">
            <div id="rp" class="row">
                <div class="col-md-12">
                    <h3>
                    <a class="mouse_select">
                        <xsl:attribute name="onclick">loadPropiedad(<xsl:value-of select="codi"/>)</xsl:attribute>
                        <xsl:value-of select="nombre"/>
                    </a>
                    </h3>
                    <h5><xsl:value-of select="poblacion"/></h5>
                    <hr></hr>
                </div>
            </div>
          <div class="row">
              <div id="info" class="col-xs-12 col-sm-8 col-md-9 col-lg-7">
                <div id="subinfo">
                  <ul id="caracteristiques">
                    <li><p>Capacidad personas: <xsl:value-of select="capacidad_personas"/></p></li>
                    <li><p>Nº Baños: <xsl:value-of select="num_banyos"/></p></li>
                    <li><p>Nº Habitaciones: <xsl:value-of select="num_habitaciones"/></p></li>
                    <li><p>Casa: <xsl:value-of select="metros_casa"/> m<sup>2</sup></p></li>
                    <xsl:call-template name="caracter">
                        <xsl:with-param name="param" select="servicios/*[1]"/>
                    </xsl:call-template>
                    <xsl:call-template name="caracter">
                        <xsl:with-param name="param" select="servicios/*[2]"/>
                    </xsl:call-template>
                  </ul>
                </div>
              </div>
              <div id="preu" class="col-xs-12 col-sm-4 col-md-3 col-lg-5">
                 <h3 id="preui" class="btn btn-success">
                    <a id="preui"><xsl:attribute name="onclick">loadPropiedad(<xsl:value-of select="codi"/>)</xsl:attribute>
                    <span id="desde">desde</span>&#160;<xsl:value-of select="precio/enero"/>&#160;€/noche
                    </a>
                </h3>
              </div>
        </div>
        </div>
      </div>
    </div>
  </xsl:template>

  <xsl:template name="caracter">
        <xsl:param name="param" />
        <li>
            <div id="carac"><span class="glyphicon"><img id="icon_carac">
                <xsl:choose>
                    <xsl:when test='$param="Internet"'>
                        <xsl:attribute name="src">
                            img/icon/wifi.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Piscina"'>
                        <xsl:attribute name="src">
                            img/icon/pool.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Barbacoa"'>
                        <xsl:attribute name="src">
                            img/icon/barbacoa.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="TV"'>
                        <xsl:attribute name="src">
                            img/icon/tv.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Sauna"'>
                        <xsl:attribute name="src">
                            img/icon/sauna.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Lavadora"'>
                        <xsl:attribute name="src">
                            img/icon/lavadora.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Climatizacion"'>
                        <xsl:attribute name="src">
                            img/icon/aire.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Limpieza"'>
                        <xsl:attribute name="src">
                            img/icon/clean.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Yacuzzi"'>
                        <xsl:attribute name="src">
                            img/icon/yacuzzi.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Perros"'>
                        <xsl:attribute name="src">
                            img/icon/dog.svg
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:when test='$param="Mar"'>
                        <xsl:attribute name="src">
                            img/icon/sea.svg
                        </xsl:attribute>
                    </xsl:when>
                </xsl:choose>
                </img>
            </span><p id="carac">&#160;
            <xsl:value-of select="$param"/></p></div>
        </li>
    </xsl:template>
</xsl:stylesheet>
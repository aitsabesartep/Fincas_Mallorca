<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
    <div id="cos_fincas" class="container">
        <div class="row">
            <div class="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-offset-1 col-md-10 col-lg-offset-0 col-lg-12">
                <div class="row">
                    <div id="filter-panel" class="collapse filter-panel">
                        <div id="filterpanel" class="panel panel-default">
                            <div class="panel-body">
                                <form class="form-inline" role="form"  method="GET" onsubmit="return filtrar();">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                            <div >
                                                <h5>Fechas</h5>
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                        <div id="entrada" class="calendari_fincas">
                                                            <div class="form-group max">
                                                                <div id="data" class="input-group max">
                                                                   <span class="input-group-addon data_fincas" role="button"><i class="glyphicon glyphicon-calendar"></i></span>
                                                                   <input id="from" class="form-control data_fincas" role="button" name='salida' placeholder="Dia entrada" readonly="true"/>
                                                                </div>
                                                                <div id="data" class="input-group max">
                                                                   <span class="input-group-addon data_fincas" role="button"><i class="glyphicon glyphicon-calendar"></i></span>
                                                                   <input id="to" class="form-control data_fincas" role="button" name='salida' placeholder="Dia salida" readonly="true"/>
                                                                </div>
                                                                <div id="data" class="input-group max">
                                                                    <div class="form-group carac">
                                                                        <select class="form-control sel_fincas1" id="precio_f">
                                                                            <option>Precio por noche</option>
                                                                            <option>Menos de 150€</option>
                                                                            <option>150€ - 200€</option>
                                                                            <option>200€ - 250€</option>
                                                                            <option>Más de 250€</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                            <h5>Características</h5>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div class="form-group carac">
                                                        <select class="form-control sel_fincas" id="personas_f">
                                                            <option>Nº Personas</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div class="form-group carac">
                                                        <select class="form-control sel_fincas" id="tipo_f">
                                                            <option>Tipo</option>
                                                            <option>Finca</option>
                                                            <option>Casa</option>
                                                            <option>Apartamento</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div class="form-group carac">
                                                        <select class="form-control sel_fincas" id="val_f">
                                                            <option>Valoración</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" id="col_mobiliari">
                                            <h5>Mobiliario</h5>
                                            <div id="recuadre_serveis">
                                                <div class="row" style="margin-left:8px; padding-top:8px; padding-bottom:8px;">
                                                    <table class="max">
                                                        <tr>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="piscina_f" type="checkbox"/> Piscina</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="wifi_f" type="checkbox"/> Wifi</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="tv_f" type="checkbox"/> TV</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="yacuzzi_f" type="checkbox"/> Yacuzzi</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="mar_f" type="checkbox"/> Mar</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="perros_f" type="checkbox"/> Admiten perros</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="barbacoa_f" type="checkbox"/> Barbacoa</label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="checkbox serveis_fincas" style="margin-left:10px; margin-right:10px;">
                                                                    <label><input id="aire_f" type="checkbox"/> Aire acond.</label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-xs-offset-0 col-sm-12 col-sm-offset-0 col-md-2 col-md-offset-10 col-lg-offset-10 col-lg-2">
                                            <div class="form-group input-group max">
                                               <button id="boto_filtrar" class="btn btn-default max" data-toggle="collapse" data-target="#filter-panel">
                                                 <span class="glyphicon glyphicon-search"></span>  Filtrar
                                               </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#filter-panel">
                        <span class="glyphicon glyphicon-filter"></span> Filtros
                    </button>
                </div>
            </div>
        </div>

        <section id="cont_finques">
            <xsl:apply-templates select="fincas/finca"/>
        </section>
    </div>
    <footer id="peu">
        <p id="textPeu" >Copyright 2016 All rights reserved.</p>
    </footer>
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
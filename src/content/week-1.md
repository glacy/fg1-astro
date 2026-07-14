# Unidades, cantidades físicas y vectores {#cap:cap1}

La [Física]{.smallcaps} es una ciencia natural que estudia las
propiedades y el comportamiento de la energía y la materia, el tiempo,
el espacio y las interacciones entre estos cuatro conceptos. Para
lograrlo muchas veces se utilizan *modelos físicos* que abstraen y
simplifican con una construcción teórica (muchas veces modelos
matemáticos) un *sistema físico*, generalmente complejo.\
Consideremos por ejemplo el lanzamiento de una bola. En general, para
analizar su movimiento es necesario conocer sus características físicas,
tales como su masa, su forma y tamaño; así como los agentes externos que
actúan sobre ella: dirección del viento, fuerza de lanzamiento,
resistencia del aire, etc. Un modelo físico inicial de esta situación
omitiría muchas de estas características. Ver Figura
[1.1](#fig:modelo){reference-type="ref" reference="fig:modelo"}.\

<figure id="fig:modelo">
<table>
<tbody>
<tr>
<td style="text-align: center;"><embed src="../figuras/baseball1.pdf"
style="width:8cm" /></td>
<td style="text-align: center;"><embed src="../figuras/baseball2.pdf"
style="width:6.55cm" /></td>
</tr>
</tbody>
</table>
<figcaption><em>Sistema físico</em> (izquierda) vs <em>modelo
físico</em> (derecha) del lanzamiento de una bola.</figcaption>
</figure>

Todas estas cantidades (masa, tamaño, velocidad, fuerza, etc.)
necesarias para describir un sistema o modelo físico, se llaman
*cantidades físicas*. Esta sesión iniciamos el estudio de las cantidades
físicas y sus unidades, sin las cuales la Física no sería posible.

## Cantidades físicas y unidades

Una **cantidad física** es una cualidad de un sistema físico que es
susceptible de cuantificación, es decir, que puede medirse. Al realizar
una medición, se compara cierta cantidad física con un *estándar de
referencia* o *patrón*. Dicho estándar define una **unidad** de la
cantidad. Una medición exacta y confiable requiere un sistema coherente
de unidades. El sistema de unidades más utilizado por científicos e
ingenieros es el *Sistema Internacional de Unidades* (SI). La Tabla
[1.1](#tab:SI-fund){reference-type="ref" reference="tab:SI-fund"}
presenta una lista de las **cantidades físicas fundamentales** del S.I.
Otras cantidades físicas se obtienen por medio de relaciones entre las
cantidades físicas fundamentales. Algunos ejemplos de **cantidades
físicas derivadas** se muestran en la Tabla
[\[tab:SI-der\]](#tab:SI-der){reference-type="ref"
reference="tab:SI-der"}.\

![Unidades y constantes de definición en el
SI.](../figuras/SI-units){#fig:SI-text width="2.5in"}

:::: center
::: {#tab:SI-fund}
  ----------------------------------- ----------------- ----------------- ----------------
  **Cantidad**                         **Símbolo de**      **Unidad**      **Símbolo de**
  **física**                           **la cantidad**   **fundamental**   **la unidad**
  longitud                              $l,x,r$, etc.         metro              m
  masa                                       $m$            kilogramo            kg
  tiempo                                     $t$             segundo             s
  temperatura termodinámica                  $T$             kelvin              K
  intensidad de corriente eléctrica        I, $i$            amperio             A
  cantidad de sustancia                      $n$               mol              mol
  Intensidad lumínica                      $I_\nu$           candela             cd
  ----------------------------------- ----------------- ----------------- ----------------

  : Unidades fundamentales del SI.
:::
::::

:::: center
::: {#tab:SI-const}
  --------------------------------- -------------------------------------- -------------------------------- -------------
  **Constante**                                  **Símbolo**                      **Valor numérico**         **Unidad**
  Frecuencia hiperfina del cesio     $\Delta v_{\mbox{\scriptsize{C}}_s}$           9 192 631 770                Hz
  Velocidad de la luz en el vacío                    $c$                             299 792 458             m s$^{-1}$
  Constante de Plank                                 $h$                     6.626 070 15$\times 10^{34}$        J s
  Carga elemental                                    $e$                    1.602 176 634$\times 10^{-19}$        C
  Constante de Boltzman                              $k$                      1.380 649$\times 10^{-23}$     J K$^{-1}$
  Constante de Avogadro                             $N_A$                    6.022 140 76$\times 10^{23}$    mol$^{-1}$
  Eficacia lumínica de una               $K_{\mbox{\scriptsize{cd}}}$                    683                 lm W$^{-1}$
  radiación visible definida                                                                                
  --------------------------------- -------------------------------------- -------------------------------- -------------

  : Constantes de definición del SI.
:::
::::

:::: table*
::: center
  -------------- ----------------- ----------------- ----------------------------------------------------------------------------------
  **Cantidad**    **Símbolo de**      **Unidad**                                       **Símbolo de**
  **Física**      **la cantidad**   **Fundamental**                                    **la unidad**
  velocidad          $\VEC{v}$           $---$                                              m/s
  aceleración        $\VEC{a}$           $---$                                           m/s$^{2}$
  Fuerza             $\VEC{F}$          newton          N $\left(1 \text{ N}=1\frac{\text{ kg}\cdot \mbox{m}}{\text{ s}^{2}}\right)$
  Energía          E, K, U, etc.         joule        J $\left(1 \text{ J}=1\frac{\text{ kg}\cdot \mbox{m}^{2}}{\text{ s}^{2}}\right)$
  Potencia               P               watt                            W $\left(1 \text{ W}=1\frac{J}{s}\right)$
  -------------- ----------------- ----------------- ----------------------------------------------------------------------------------
:::
::::

Debido a que las cantidades físicas pueden tener rangos de variación de
varios ordenes de magnitud respecto a la unidad fundamental, es muy
común el uso de **prefijos** y de **notación científica** para expresar
múltiplos o fracciones de las unidades fundamentales. La Tabla
[\[tab:pref\]](#tab:pref){reference-type="ref" reference="tab:pref"}
lista los principales prefijos usados en el SI.\

:::: center
::: tblr
colspec = cccccc, column1 = c3, column2 = c3, column3 = c3, column4 =
c1, column5 = c1, column6 = c1,
**Factor**&**Nombre**&**Símbolo**&**Factor**&**Nombre**&**Símbolo**\
$10^{-1}$&deci & d& $10^{1}$&deca & da\
$10^{-2}$&centi &c & $10^{2}$&hecto &h\
$10^{-3}$&mili & m& $10^{3}$&kilo & k\
$10^{-6}$& micro&$\mu$ & $10^{6}$& mega& M\
$10^{-9}$& nano& n& $10^{9}$&giga & G\
$10^{-12}$&pico & p& $10^{12}$&tera & T\
$10^{-15}$&femto &f & $10^{15}$&peta & P\
$10^{-18}$& atto& a& $10^{18}$&exa & E\
$10^{-21}$& zepto& z& $10^{21}$&zetta & Z\
$10^{-24}$&yocto & y& $10^{24}$&yotta & Y\
$10^{-27}$&ronto & r& $10^{27}$&ronna & R\
$10^{-30}$&quecto& q& $10^{30}$&quetta& Q\
:::
::::

::: wwteorema
Ejemplo prefijos y notación científica

-   1000 m = 1 km.

-   1000000 bits = 1 Mbit (ó Mb).

-   1 MW = $10^{6}$ W.

-   1 $\mu$s = $10^{-6}$ s = 0.000001 s.
:::

Por supuesto, el SI no es el único sistema de unidades disponible. Para
transformar cierta cantidad física de un sistema de unidades a otro, es
necesario conocer el correspondiente **factor de conversión** entre los
sistemas de unidades para la cantidad física en cuestión. Un factor de
conversión es entonces, un término multiplicativo que permite convertir
las unidades de una cantidad física de un sistema de unidades a otro, es
decir:

::: center
[unidades sist. 1]{style="color: c4"}$\equiv$[(factor de
conversión)]{style="color: c2"} $\times$ [unidades sist.
2]{style="color: c5"}
:::

o de manera equivalente

::: wwteorema
Ejemplo factores de conversión

-   1 in = 2.54 cm
    $$\Rightarrow 3\cancel{\text{ in}}\times\frac{2.54\text{ cm}}{1\cancel{\text{ in}}}=7.62\text{ cm}$$

-   1 gal = 3.785 L
    $$\Rightarrow 2\cancel{\text{ gal}}\times\frac{3.785\text{ L}}{1\cancel{\text{ gal}}}=7.570\text{ L}$$

-   1 oz = 28.35 g
    $$\Rightarrow 1\cancel{\text{ kg}}\times\frac{1000\cancel{ \text{ g}}}{1 \cancel{\text{ kg}}}\times\frac{1 \text{ oz}}{28.35\cancel{\text{ g}}}=35.27 \text{ oz}$$

-   1 UA (Unidad Astronómica)= 1.51$\tentimes{11}$ m
    $$\Rightarrow 5\cancel{\text{ UA}}\times\frac{1.51\tentimes{11}\text{ m}}{1\cancel{\text{ UA}}}=7.55\tentimes{11}\text{ m}$$
:::

## Escalares y vectores

Las cantidades físicas pueden clasificarse en dos grupos: *escalares* y
*vectoriales*.\
**Cantidad física escalar:** cualquier cantidad física que puede ser
definida usando únicamente una [magnitud]{.underline}. Las magnitudes
escalares usualmente se expresan usando una unidad.

::: wwteorema
Ejemplo cantidades escalares

-   La temperatura ambiente es de 25$^{\circ}\mbox{C}$.

-   La densidad del agua es de 1000 kg/m$^{3}.$

-   La distancia entre San José y Cartago es de 13 km.

-   El índice de refracción del aire es igual a 1.
:::

**Cantidad física vectorial:** cualquier cantidad física caracterizada
no sólo por una [magnitud]{.underline}, sino también por una
[dirección]{.underline}. Debido a esta propiedad, los vectores suelen
*representarse* por medio de flechas, en donde la longitud de la flecha
es proporcional a la magnitud del vector y su dirección apunta en la
misma dirección que la cantidad vectorial. Para denotar simbólicamente
que cierta cantidad física es un vector, se coloca una flecha sobre el
símbolo que representa dicha cantidad. Por ejemplo, si denotamos una
cantidad vectorial con la letra V, escribiremos $\VEC{V}$ para denotar
que dicha cantidad es un vector.\

::: wwteorema
Ejemplos cantidades vectoriales

-   El viento está soplando con una velocidad máxima de 20
    $\mbox{km}\cdot \mbox{h}^{-1}$ hacia el Noreste.

-   Mi colegio está a 1 km y 30$^{\circ}$ al sur de mi casa.

-   En la Tierra, los objetos en caída libre experimentan una
    aceleración de $9.81 \, \mbox{m}\cdot\mbox{s}^{-2}$, hacia el centro
    de la Tierra.

-   El campo magnético terrestre tiene una magnitud de $5\times10^{-5}$
    T y está orientado 11$^{\circ}$ respecto al eje de rotación de la
    Tierra.
:::

Consideremos, por ejemplo, el *desplazamiento* de un objeto cuando se
mueve de un punto A a un punto B. Esta cantidad es un vector, ya que no
solo es necesario conocer la distancia entre ambos puntos, si no la
ubicación de uno respecto al otro. Ver por ejemplo la sitación descrita
en la Figura [1.3](#fig:comp){reference-type="ref"
reference="fig:comp"}.\
Debido al caracter direccional de los vectores, es necesario contar con
un sistema o marco de referencia desde el cual establecer su magnitud y
su dirección.\
Un **sistema de coordenadas o de referencia** es un conjunto de
convenciones usadas por un observador para poder medir la posición y
otras magnitudes físicas de un sistema físico. Por ejemplo, los puntos
cardinales (norte, oeste, sur y este) permiten especificar direcciones
de una manera consistente.\
El sistema de referencia más utilizado es el **sistema rectangular de
ejes coordenados** (cartesiano); a partir del cual se puede describir
cualquier vector a partir de sus *componentes cartesianas*. Ver Figura
[1.3](#fig:comp){reference-type="ref" reference="fig:comp"}.

<figure id="fig:comp">
<table>
<tbody>
<tr>
<td style="text-align: left;"><embed src="../figuras/desplazamiento.pdf"
style="width:7cm" /></td>
<td style="text-align: right;"><embed
src="../figuras/componentes_vectoriales.pdf" style="width:7cm" /></td>
</tr>
</tbody>
</table>
<figcaption><em>Vector desplazamiento</em> (izquierda), <em>componentes
cartesianas</em> (derecha).</figcaption>
</figure>

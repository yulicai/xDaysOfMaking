#day 0012

<br />
No Interactions for this one
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d012/)
 <br />
 <br />
three.js, GLSL
 <br />
 <br />
欢极娇无力,玉软花欹坠。
 <br />
 <br />
A supple blossom, coupled with utter elation <br />
##learned today
Feb 12th 2017
<br />
 <br />
Practicing shaping, textiles and rotating function in GLSL language after the shader studio class by  Patricio Gonzalez Vivo

#### Main Functions in this code
* play around with fracting the coordinate to get grids
* play around with translation and rotation by manipulating the st_f coordinate
* play around with time control, so the color gets a full change in one cycle of the sin section
<pre><code>
float t = u_time * 2. * PI;

st_f = (mod(floor(t*.2),2.)* mod(st_i.y,2.)* rotate(vec2(st_f.x+0.25,st_f.y-0.5),-PI/4.)+mod(ceil(t*.2),2.)* mod(st_i.x,2.)* rotate(vec2(st_f.x-.5,st_f.y+.25),PI/4.));
float change = .3 * sin(t);
vec3 color = vec3(0.935*(1.-sin(2.* t)* .3),0.263*(1.-sin(2.* t)* .3),0.652*(1.-sin(2.* t)* .3));
</code></pre>

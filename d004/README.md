#day 004
no interaction for this one
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d004/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
　湛湛露斯，匪阳不晞。厌厌夜饮，不醉无归。
 <br />
 <br />
 Moist and crystal dew, never evaporate before sunrises. Let's party, and get wasted.

##learned today
Noise section from the book of shaders.
 <br />
 <br />
 Noise function is linear transition of random function so that the result is more coherent and organic.
 <br />
  <br />
  float i = floor(x);  // integer  <br />  <br />
 float f = fract(x);  // fraction  <br />  <br />
 y = rand(i);  (blocks of number) <br />  <br />
 y = mix(rand(i), rand(i + 1.0), f);  <br />  <br />
 y = mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));  <br />  <br />
 mix( ) -- mix() performs a linear interpolation between x and y using a to weight between them. The return value is computed as x × (1−a) + y × a.<br />  <br />
 <br />
 <br />
 <br />
 2D noise function
 <br />
 <br />
 <pre><code>
 float noise(vec2 st) {
     vec2 i = floor(st);
     vec2 f = fract(st);

     //same as smoothstep()
     vec2 u = f*f*(3.0-2.0*f);
     // u = smoothstep(0.,1.,f);

     return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                      dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                 mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                      dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
 }
</code></pre>

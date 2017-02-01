#day 009

<br />
No interactions for this one
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d009/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
梅英疏淡，冰澌溶泄，东风暗换年华。无奈归心，按随流水到天涯。
 <br />
 <br />
Plum gradually sparse, ice has been dissolved in warm. East wind blowing, quietly came the spring. Flowing with drifting water, homing to the end of the world.

##learned today
Feb 1st 2017
<br />
 <br />
Image Processing Section in the book of shaders

<br />
 <br />
####sampler2D( ) and texture2D( )

"Once the texture is loaded and linked to a valid uniform sampler2D you can ask for specific color value at specific coordinates (formated on a vec2 variable) usin the texture2D() function which will return a color formated on a vec4 variable."
 <pre><code>
vec4 texture2D(sampler2D texture, vec2 coordinates)  
 </code></pre>
A way to distort coordinate system( st )
 <code><pre>
 float scale = 2.0;
float offset = 0.5;

float angle = noise( st + u_time * 0.1 ) * PI;
float radius = offset;

st * = scale;
//way to rotate a cordinate
st += radius * vec2(cos(angle),sin(angle));
 </pre></code>

#### Moving images (iterate through rows and col )
To create a moving image effect
 <br />

 <pre><code>
 vec2 nRes = vec2(col,row);
    // Scale the coordenates to a single frame
    st = st/nRes;
    // Calculate the offset in cols and rows
    float timeX = u_time*15.;
    float timeY = floor(timeX/float(col));
    //S = V * T
    //S: offset; V: 1/nRes.x; T: timeX;
    vec2 offset = vec2( floor(timeX)/nRes.x,
                        1.-(floor(timeY)/nRes.y) );
    st = fract(st+offset);
 </code></pre>
 <br />

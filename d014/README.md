# day 014

<br />
No Interactions for this one
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d014/)
 <br />
 <br />
three.js, GLSL
 <br />
 <br />
态浓意远淑且真，肌理细腻骨肉匀。
 <br />
 <br />
 Endless insatiable, blinding me sweetly <br />

## learned today
Feb 22th 2017
<br />
 <br />
Practicing shaping functions to get control of transit effect using mix ( )

#### Main Functions in this code
* impulse is a shaping function to create certain curve
<pre><code>
float impulse( float k, float x ){
    float h = k*x;
    return h*exp(1.0-h);
}
</code></pre>

* Using mix( ) to mix between rect distance field and circle distance field get us a smooth transition between these two shapes
<pre><code>
//use impluse shaping function to detemine the speed/shape of how it transit bt circle and rect
float sdf = mix(c,r,impulse(12.,abs(sin(t))));
</code></pre>

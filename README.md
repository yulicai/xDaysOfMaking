# xDaysOfMaking
xDaysOfMaking is a self exploration and learning process combining visual generation tools ( programming or existing softwares ) with poetry. Everyday I will make a small visual representation based on what I've learnt that day and the poem I choose. Most of the poems are coming from an ancient Chinese poetry collection called The Book of Songs (诗经).
 <br />
  <br />
Since a lot of contents from this poetry collection are describing natural pattern and everyday things.The idea is to bring this content abstractly in the programming expression and brige human language with computer languge.
 <br />
  <br />
Starting Date: Jan 10 2017


<br />
<br />
##some useful function from the book of shader
<br />
####2D random
<br />
<pre><code>
vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}
</code></pre>
<br />
<br />
#### Noise 2D
<br />
<pre><code>
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}
</code></pre>

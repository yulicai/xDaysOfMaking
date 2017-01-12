#day 003
[project link](http://caiyuli.com/projects/xDaysOfMaking/d003/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
　桃之夭夭，灼灼其华。桃之夭夭，有蕡其实。桃之夭夭，其叶蓁蓁。
 <br />
 <br />
 Luxuriant peach tree, flourish blossom, firm and squishy peaches, many many leaves.

##learned today
Random section from the book of shaders.
 <br />
 <br />
 Random function is an adding up result of sin
 <br />
  <br />
 y = fract( sin( x ) * b );
 <br />
  <br />
 by increasing b(a float number) dramatically, it will squeeze each sin wave to extremely small and thus create pseudo-random value in 1D.
 <br />
  <br />
 To achieve random value in 2D, we use dot( ) to transform a two dimensional vector into a one dimensional floating point value.
 <br />

 <pre><code>
 float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
</code></pre>

 <br />
Using floor() to manipulate coordinate system, we can achieve grid/pixel like image.
 <br />
 <pre><code>
    //st is the coordinate of the current pixel, it is a vec2
    st  * =  10.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st);  // get the integer coords

    // Assign a random value based on the integer coord
    //or thinking about combining with camera feed, so we can achieve pixelized video
    vec3 color = vec3(random( ipos ));
</code></pre>

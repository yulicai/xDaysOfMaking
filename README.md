# xDaysOfMaking
xDaysOfMaking is a self exploration and learning process combining visual generation tools ( programming or existing softwares ) with poetry. Everyday I will make a small visual representation based on what I've learnt that day and the poem I choose. Most of the poems are coming from ancient Chinese poetry.
 <br />
  <br />
Since a lot of contents from this poetry collection are describing natural pattern and everyday things.The idea is to bring this content abstractly in the programming expression and brige human language with computer languge.
 <br />
  <br />
Starting Date: Jan 10 2017


<br />
<br />
#some useful functions from the book of shader


###2D random
<pre><code>
vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)))) * 43758.5453);
}
</code></pre>


### Noise 2D
<pre><code>
//based on pre-included random function
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

### Rotate 2D

<pre><code>
mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}
</code></pre>

Math reference for the above rotation function

![matrix math reference](https://github.com/yulicai/xDaysOfMaking/raw/master/images/rotmat.png)
<br />
<br />
### Stroke Function (shaping)
The shaping function for a stroke; <br />
By multiplying them together, only both of the return value of step( ) is 1, it will be 1 ( instead of 0 );<br />
Revert the direction of it by minus number from 1. <br />
<pre><code>
float stroke(float v, float p, float w){
  return step(p-w,v) * step(p-w,1.-v);
  //or this one
  //return step(p,v+w*.5) - step(p,v-w*.5);
  //v is usually the coordinate number,(like uv)
  //p is usually the middle of the line, where you want to place the line
  //(for example in the middle of the screen it would be 0.5, w is the width of the line)
}
//in the main function in the fragment shader
color += stroke(st.x,0.5,0.1)
</code></pre>
<br />

### Box Function (shaping)
<pre><code>
//p stands for central position
//w stands for width
float box(vec2 st, float p, float w){
    return step(p-w, st.x) * step(p-w,1.-st.x)
       * step(p-w,st.y) * step(p-w,1.-st.y);

}
</code></pre>

### Sign Distance Field (shaping)

**Rectangle SDF**

<img src = "https://github.com/yulicai/xDaysOfMaking/raw/master/images/rect_sdf.png" width = "250">
<pre><code>
//a separate function
float rectSDF(vec2 st, vec2 density){
    st = st*2. - 1.;
    return max(abs(st.x/density.x),abs(st.y/density.y));
}
//in the main function in fragment shader
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x * = u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    float r_field = rectSDF(st, vec2(1.));
    color += r_field;

    gl_FragColor = vec4(color,1.0);
}
</code></pre>

**Min Circle SDF**

<img src = "https://github.com/yulicai/xDaysOfMaking/raw/master/images/min_circle_sdf.png" width = "250">

<pre><code>
float circleSDF(vec2 st, vec2 placement, float density){
    return length(st-placement) * density;
}
//in the main function in fragment shader
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x * = u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    float c1 = circleSDF(st - .1, vec2(.5),2.);
    float c2 = circleSDF(st + .1, vec2(.5),2.);
    float sdf = min(c1,c2);
    color += sdf;

    gl_FragColor = vec4(color,1.0);
}
</code></pre>

**Combining Shapes**

<img src = "https://github.com/yulicai/xDaysOfMaking/raw/master/images/combined_shape.png" width = "250">
<pre><code>
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x * = u_resolution.x/u_resolution.y;

    //background color
    vec3 color = vec3(0.700,0.042,0.645);

    //3 original shape of distance field
    float c1 = circleSDF(st-.1);
    float c2 = circleSDF(st+.1);
    float r = rectSDF(st,vec2(1.));

    //>>> IMPORTANT - combining them together
    float sdf = min (min(c1,c2),r);

    color += r; //for background foggy distance field
    color += fill(sdf,.5);

    gl_FragColor = vec4(color,1.0);
}

</code></pre>

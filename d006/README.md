#day 006
Practice around mouse controls over color converting
<br />
Move mouse across the diagonal line to convert the color.
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d006/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
　水是眼波横，山是眉峰聚。
 <br />
 <br />
 Water ripples in belle’s eyes,Mountain her brows darkly dyes.

##learned today
I skipped one day. Today is Jan 16 2017
<br />
Practice logic computation, e.g: use step( ) function to give a result of 0. and 1. and thus control different sections
 <br />
 <br />
  <br />
  Practice zones control
<pre><code>
//  Scale the coordinate system by 2x2
  _st *= 2.0;

  //  Give each cell an index number
  //  according to its position
  float index = 0.0;    
  index += step(1., mod(_st.x,2.0));
  index += step(1., mod(_st.y,2.0))*2.0;

  //      |
  //  2   |   3
  //      |
  //--------------
  //      |
  //  0   |   1
  //      |
  </code></pre>
  <br />
  <br />
  key code for today's code
   <br />
<pre><code>
  st *= 2.0;
    vec2 mouse = u_mouse;
    float mouseSec = floor(mouse.x/mouse.y);
    float index = 0.0;
  	index += step(1., mod(st.x,2.0));
   	index += step(1., mod(st.y,2.0))*2.0;
    //from 0.~1. to -1.~1.
    float mouseSec2=mouseSec*2.-1.;
    float over1 = 1.*mouseSec-mouseSec2*step(2.,index);

    float returning = 0.0;
    //this step is important, it preserve the original coordinate system in each cell
    st = fract(st);
    returning =shape(st,radius)-shape(st,radius-width)*over1;

    return returning;
    </code></pre>

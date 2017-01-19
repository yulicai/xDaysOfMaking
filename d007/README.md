#day 007

<br />
Move mouse to slightly change the color and movement.
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d007/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
 芙蓉落尽天涵水，日暮沧波起
 <br />
 <br />
 Lotus sheds, sea melts into sky, and water waving around the rising sunset.

##learned today
Jan 19th 2017
<br />
Cellular Noise Section in the book of shaders
<br />
### for loop method in shaders
### Voronoi diagram
<br />
for loop does not go well with shader, so we can "subdivide the space into cells, each one with one unique point to watch", we will also need to check for the distances to the points on the neighboring cells, thus we have 9 positions to check for each pixel.
 <br />
 <pre><code>
 // Scale
   st *= 3.;

   // Tile the space
   vec2 i_st = floor(st);
   vec2 f_st = fract(st);

   float m_dist = 1.;  // minimun distance

   for (int y= -1; y <= 1; y++) {
       for (int x= -1; x <= 1; x++) {
           // Neighbor place in the grid
           vec2 neighbor = vec2(float(x),float(y));

           // Random position from current + neighbor place in the grid
           vec2 point = random2(i_st + neighbor);
           // Vector between the pixel and the point
                       vec2 diff = neighbor + point - f_st;

                       // Distance to the point
                       float dist = length(diff);

                       // Keep the closer distance
                       m_dist = min(m_dist, dist);
                   }
               }

               // Draw the min distance (distance field)
               color += m_dist;

               // Draw cell center
               color += 1.-step(.02, m_dist);

 </code></pre>
 <br />
  <br />

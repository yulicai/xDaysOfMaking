# day 015

<br />
No Interactions for this one
<br />
[project link]( http://caiyuli.com/projects/xDaysOfMaking/d015/ )
 <br />
 <br />
three.js, GLSL
 <br />
 <br />
怒发冲冠，凭栏处，潇潇雨歇。
 <br />
 <br />
 The tension is palpable. <br />
 Our hearts best steadily for now <br />
 But are our minds at ease?  <br />
## learned today
Mar 27th 2017
<br />
 <br />
Found the relationship in the array data structure in three js geometry object.
<pre><code>
var positions = new Float32Array(vertices.length * 3);
var colors = new Float32Array(vertices.length * 3);
var sizes = new Float32Array(vertices.length);
</code></pre>

#### Main Code I use in this code

* In the loop function, using gap to iterate through the particles in series.
<pre><code>
var gap = 100;
for (var i = 0; i < attributes.size.array.length; i++) {
    if (i >= counter * gap && i <= (counter + 1) * gap) {
        attributes.size.array[i] = PARTICLE_SIZE * 2.1;
        attributes.size.needsUpdate = true;
    }else{
      attributes.size.array[i] = PARTICLE_SIZE * 0.5;
      attributes.size.needsUpdate = true;
    }

}
</code></pre>

* Using javaScript concat() method with BoxGeometry in three js, creating multiple layers of points.
<pre><code>
var vertices = geometry1.vertices.concat(geometry2.vertices.concat(geometry3.vertices));
</code></pre>

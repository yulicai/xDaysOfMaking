# day 0010

<br />
No interactions for this one
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d0010/)
 <br />
 <br />
three.js
 <br />
 <br />
笑相遇，似觉琼枝玉树相依，暖日明霞光烂。
 <br />
 <br />
The moment we encountered, smiling, I saw the trees in paradise. It was bright, it was warm, it was blazing and shimmering.

## learned today
Feb 5th 2017
<br />
 <br />
Practicing the basics applications of threejs

#### basics
geometry, material >> mesh <br /><br />
light, mesh >> scene<br /><br />
camera, scene >> renderer

#### update position
If update needed, then need to add these two kinds of code accordingly to the render function
 <pre><code>
mesh.geometry.verticesNeedUpdate = true;
//if using bufferGeometry, use the following pattern instead
//geometry.attributes.position.needsUpdate = true;
 </code></pre>

#### color control
[threejs documentation](https://threejs.org/docs/index.html#Reference/Math/Color)
 <code><pre>
var color = new THREE.Color("rgb(255, 0, 0)");
var color = new THREE.Color( 'skyblue' );
 </pre></code>

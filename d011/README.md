#day 0011

<br />
Move mouse to change view point
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d011/)
 <br />
 <br />
three.js
 <br />
 <br />
北山白云里，隐者自怡悦。
 <br />
 <br />
Far in the clouds of north mountain, recluse chill and sing. <br />
##learned today
Feb 10th 2017
<br />
 <br />
Practicing the shadow and multiplying objects in three js

####MeshStandardMaterial
This approach differs from older approaches in that instead of using approximations for the way in which light	interacts with a surface, a physically correct model is used. The idea is that, instead of tweaking materials to look good under specific lighting, a material can	be created that will react 'correctly' under all lighting scenarios.
<br />
In practice this gives a more	accurate and realistic looking result than the MeshLambertMaterial or MeshPhongMaterial, at the cost of being somewhat more computationally expensive.

####shadow in three js
Shadows are disabled by default
<br />
renderer need to be enabled shadow <br />
mesh objects, plane use ShadowMaterial <br />
PointLight set to be able to cast shadow <br />
need to setClearColor instead of using default black <br />
<pre><code>
renderer.setClearColor(0xffcccc);
</code></pre>
 <pre><code>
 renderer.shadowMap.enabled = true;
 renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 </code></pre>
 <pre><code>
 pointLight.castShadow = true;
 pointLight.shadow.mapSize.width = 1024;
 pointLight.shadow.mapSize.height = 1024;
 </code></pre>
 <pre><code>
 shapeOne.castShadow = true;
 shapeOne.receiveShadow = true;
 </code></pre>
<br />

#day 002
[project link](http://caiyuli.com/projects/xDaysOfMaking/d002/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
　　猗与漆沮，潜有多鱼。有鳣有鲔，鲦鲿鰋鲤。以享以祀，以介景福。
 <br />
 <br />
Catfish,Cod,Salmon,Trout,Halibut...Awww countless fishes, we are so blessed.


##learned today
Patterns section from the book of shaders.
 <br />
 <br />
 Seperate the entire space into brick zones using fract();
 <pre><code>
 vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}
</code></pre>

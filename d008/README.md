#day 008

<br />
Move mouse to slightly change the color and movement.
<br />
[project link](http://caiyuli.com/projects/xDaysOfMaking/d008/)
 <br />
 <br />
three.js | shader
 <br />
 <br />
 冻云黯淡天气，扁舟一叶，乘兴离江渚。渡万壑千岩，越溪深处。怒涛渐息，樵风乍起，更闻商旅相呼。片帆高举。泛画鹢、翩翩过南浦。断鸿声远长天暮。
 <br />
 <br />
 icy cloud,dark sky; single boat, floating away, hilly-gully passing by, to the heart of river, down the roaring of waves, wind coming around, merchants greetings to each other, thousands of boats. lonely bird, ethereal singing, hollow nightfall  .

##learned today
Jan 26th 2017
<br />
 <br />
Fractal Brownian Motion(fBm) Section in the book of shaders
<br />
分型布朗运动
<br />
 <br />
waves adding up, either sin waves or noise waves
<br />
this technique is usually used for describing natural mountain, landscapes, cloud etc.
<br />
"This technique is commonly used to construct procedural landscapes. The self-similarity of the fBm is perfect for mountains, because the erosion processes that create mountains work in a manner that yields this kind of self-similarity across a large range of scales."

### main constructors
1. octaves : iterations of waves
2. lacunarity: frequency in regular steps, 地表凹凸起伏纹理指数
3. gain: amplitude of the noise

 <pre><code>
 // Properties
const int octaves = 8;
float lacunarity = 4.0;
float gain = 0.5;
//
// Initial values
float amplitude = 0.5;
float frequency = 1.;
//
// Loop of octaves
for (int i = 0; i < octaves; i++) {
	y += amplitude * noise ( frequency * x );
	frequency * = lacunarity;
	amplitude * = gain;
}
 </code></pre>

4. turbulence: It's essentially an fBm, but constructed from the absolute value of a signed noise to create sharp valleys in the function.
 <code><pre>
 for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st * = 2.;
    amplitud * = .5;
}
 </pre></code>

### Domain Warping
mainly based on the [function by Inigo Quiles](http://www.iquilezles.org/www/articles/warp/warp.htm) to to use fBm to warp a space of a fBm, so thus it has cloud or space warping effect
 <br />

 <pre><code>
 #define NUM_OCTAVES 23
 float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
 </code></pre>
 <br />

#include <common>
#include <shadowmap_pars_vertex>

varying vec3 v_normal;
varying vec3 v_viewPos;

void main() {
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <begin_vertex>
    #include <worldpos_vertex>
    #include <shadowmap_vertex>

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;

    v_normal = normalMatrix * normal;
    v_viewPos = viewPosition.xyz;

    gl_Position = clipPosition;
}
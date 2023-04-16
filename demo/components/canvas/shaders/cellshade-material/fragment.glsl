#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

varying vec3 v_normal;
varying vec3 v_viewPos;

uniform vec3 u_color;
uniform float u_diffuseCell;
uniform float u_specularCell;
uniform float u_shine;

struct Geometry {
    vec3 color;
    vec3 viewPos;
	vec3 normal;
};

vec3 calculateCellShading(DirectionalLight light, Geometry geo, float shadow){
    // Diffuse 
    vec3 lightingOut = vec3(0.0);
    float NdotL = dot(geo.normal, light.direction);
    float lightIntensity = smoothstep(0.0, u_diffuseCell, NdotL * shadow);
    vec3 diffuseLight = light.color * lightIntensity;

    // Specular
    vec3 halfVector = normalize(light.direction + geo.viewPos);
    float specular = dot(geo.normal, halfVector);
    specular = pow(specular, u_shine);
    specular *= lightIntensity;
    float specularIntensity = smoothstep(0.0, u_specularCell, specular);
    vec3 specularLight = light.color * specularIntensity;

    lightingOut += diffuseLight + ambientLightColor + specularLight;
    return lightingOut;
}

void main() {
    // shadow map
    DirectionalLightShadow directionalShadow1 = directionalLightShadows[0];
    DirectionalLightShadow directionalShadow2 = directionalLightShadows[1];

    float shadow1 = getShadow(
        directionalShadowMap[0],
        directionalShadow1.shadowMapSize,
        directionalShadow1.shadowBias,
        directionalShadow1.shadowRadius,
        vDirectionalShadowCoord[0]
    );

    float shadow2 = getShadow(
        directionalShadowMap[1],
        directionalShadow2.shadowMapSize,
        directionalShadow2.shadowBias,
        directionalShadow2.shadowRadius,
        vDirectionalShadowCoord[1]
    );

    Geometry geo;
    geo.color = u_color;
    geo.viewPos = -v_viewPos;
    geo.normal = normalize(v_normal);

    vec3 lightFinalColor = vec3(0.0);

    vec3 lightColor1 = calculateCellShading(directionalLights[0], geo, shadow1);
    vec3 lightColor2 = calculateCellShading(directionalLights[1], geo, shadow2);
    lightFinalColor += lightColor1 + lightColor2;

    lightFinalColor = floor(lightFinalColor * 5.0) / 5.0;

    gl_FragColor = vec4(geo.color * (lightFinalColor), 1.0);
}
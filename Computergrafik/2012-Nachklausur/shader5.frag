uniform vec3 eye; //Position des Betrachters in Weltkoord
in vec3 dir;      //Strahlrichtung in Weltkoord
uniform vec3 spheres[10];
out vec4 fragColor;
void main() // Dieser Fragment-Shader wird fuer jeden Pixel
{           // der Bildebene aufgerufen
    // <solution>
    float t = -1;
    vec3 pos;  // Position des Schnittpunkts
    vec3 normal;  // Normale an der Position des Schnittpunkts
    for (i=0; i < 10; i++) {
        vec2 isec = intersectRS(eye, dir, spheres[i].xyz, spheres[i].w);
        if (isec.x < t && isec.x > 0) {
            t = isec.x;
            pos = eye + t * dir;
            normal = normalize(pos - spheres[i].xyz);
        } else if (isec.y < t && isec.y > 0) {
            // Strahl startet innerhalb der Kugel
            t = isec.y;
            pos = eye + t * dir;
            normal = normailize(pos - spheres[i].xyz);
        }
    }
    if (t != -1) { // Schnittpunkt gefunden !
        fragColor = computeShading(pos, normal);
    // </solution>
    } else {
        // Keinen Schnittpunkt gefunden , Hintergrund schwarz setzen
        fragColor = vec4 (0.0 , 0.0 , 0.0 , 1.0);
    }
}

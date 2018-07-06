export default function keyMirror(input) {
    const mirrored = {};

    Object.keys(input).map((key) => {
        mirrored[key] = key;
    });

    return mirrored;
}

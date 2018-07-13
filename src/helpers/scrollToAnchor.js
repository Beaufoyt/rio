export default function scrollToAnchor(location, offset = null) {
    let anchorName = location.hash;

    if (anchorName) {
        anchorName = anchorName.replace('#', '');
        const anchorElement = document.getElementById(anchorName);
        if (anchorElement) { anchorElement.scrollIntoView(); }
        if (offset) { window.scrollBy(offset.x, offset.y); }
    }
}

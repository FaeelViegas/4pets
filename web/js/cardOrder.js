function toggleItems(id) {
    var items = document.getElementById(id);
    if (items.style.display === "none" || items.style.display === "") {
        items.style.display = "block";
    } else {
        items.style.display = "none";
    }
}
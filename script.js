// Image switch
//
function changeImage(img) {
  document.getElementById("mainImage").src = img.src;
}

// Tab switch
//
function showTab(tab) {
  let content = document.getElementById("tabContent");

  if (tab === "desc") {
    content.innerHTML = "This is product description.";
  } 
  else if (tab === "ship") {
    content.innerHTML = "Shipping takes 3-5 days.";
  } 
  else if (tab === "rev") {
    content.innerHTML = "Customer reviews will appear here.";
  }
}

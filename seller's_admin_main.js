const addProductBtn = document.getElementById("add-product-btn")
var totalSellingPrice = 0

addProductBtn.addEventListener("click", saveToCloud)

window.addEventListener("DOMContentLoaded", (obj) => {
    axios.get("https://crudcrud.com/api/f9928b2f5e514939a5a2635cb8419c9d/products")
    .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
            showProductsOnScreen(response.data[i])
        }
    })
})

function saveToCloud(event) {
    event.preventDefault()
    const productName = document.getElementById("productName").value
    const productSellingPrice = document.getElementById("productSellingPrice").value

    const obj = {
        productName,
        productSellingPrice
    }

    axios.post("https://crudcrud.com/api/f9928b2f5e514939a5a2635cb8419c9d/products", obj)
    .then((response) => showProductsOnScreen(response.data))
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong. </h4>"
    })

    document.getElementById("productSellingPrice") = ""
    document.getElementById("productName") = ""
}

function showProductsOnScreen(obj) {
    const parentElement = document.getElementById("listOfProducts")
    const childElement = document.createElement("li")
    childElement.textContent = obj.productSellingPrice + " - " + obj.productName + "            "
    totalSellingPrice += Number(obj.productSellingPrice)
    document.getElementById("totalSellingPrice").innerHTML = totalSellingPrice


    const deleteButton = document.createElement("input")
    deleteButton.type = "button"
    deleteButton.value = "Delete"

    childElement.appendChild(deleteButton)
    parentElement.appendChild(childElement)

    deleteButton.onclick = () => {
        base_url = "https://crudcrud.com/api/f9928b2f5e514939a5a2635cb8419c9d/products/"
        axios.delete(base_url + obj._id)
        parentElement.removeChild(childElement)
        totalSellingPrice -= Number(obj.productSellingPrice)
        document.getElementById("totalSellingPrice").innerHTML = totalSellingPrice
    }
}
const detailProduct = document.querySelector('#detailProduct')

const getProduct = async  () => {
  const url = new URLSearchParams(window.location.search)
  const id = url.get('idproducto')
  
  try{
    let response = await fetch(`http://localhost:3008/api/productos/${id}`)
    let producto = await response.json()
    if(producto) return producto
  }catch(err){
    alert('No existe el producto '+  err)
  }
  
}

const renderDetail = (producto) => {
  const {title, price, description, category, image} = producto
  detailProduct.innerHTML = `
  <div class='containerImagen'>
    <div> 
    <h1>${title}</h1>
    <small>${category}</small>
    </div>
    <img src=${image} alt=${title}>
  </div>
  <div class='containerInfo'>
    <p>${description}</p>
    <strong>$${price}</strong>
    <button>Agregar al carrito </button>
  </div>
  `
}

document.addEventListener('DOMContentLoaded', async () =>{
  let producto = await getProduct()
  console.log(producto);
  renderDetail(producto)
})



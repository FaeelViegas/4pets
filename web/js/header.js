//função que cria as li de cada categoria
function createCategoryItem(category) {
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="./search-product?category=${category.idCategory}&search=">${category.name}</a>
    `;
    return li;
}

//função que carregar as categorias na ul
function loadCategorys(categorys) {
    const ul = document.querySelector('.category');

    categorys.forEach(category => {
        const item = createCategoryItem(category);
        ul.appendChild(item);
    });
}

//Acesso aos dados da lista de categorias
fetch('./list-categorys')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter dados dos produtos');
        }
        return response.json();
    })
    .then(data => {
        loadCategorys(data);
    })
    .catch(error => {
        console.error(error);
    });
const PRODUCTS_DATA_URL = "https://automationexercise.com/api/productsList";

export async function fetchProductsData(request) {
    const response = await request.get(PRODUCTS_DATA_URL);

    if (!response.ok()) {
        throw new Error(
            `Failed to fetch products data: ${response.status()} ${response.statusText()}`,
        );
    }

    const data = await response.json();

    if (!Array.isArray(data.products)) {
        throw new Error("Products data is missing or invalid");
    }

    return data.products.map((product) => ({
        id: product.id,
        name: product.name,
    }));
}

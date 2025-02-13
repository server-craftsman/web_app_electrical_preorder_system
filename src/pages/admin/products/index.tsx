import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';

const Products = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={(searchTerm) => console.log(searchTerm)} />
        <button className="btn-submit">Tạo sản phẩm</button>
      </div>
      <ViewProducts />
    </div>
  );
};

export default Products;

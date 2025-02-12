import { Button } from 'antd';
import Search from '../../../components/generic/home/search/Search';

import ViewProducts from '../../../components/admin/products/ViewProducts';
const Products = () => {
  return (
    <div>
    <div className='flex justify-between mb-4'>
      <Search onSearch={(searchTerm) => console.log(searchTerm)} />
      <Button  className='h-11 bg-black text-white'>
        Create
      </Button>
      </div>
      <ViewProducts />
    </div>
  )
}

export default Products;

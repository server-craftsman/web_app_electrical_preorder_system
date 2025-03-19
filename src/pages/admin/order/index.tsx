import { useState } from 'react';
import ViewOrder from '../../../components/admin/order/ViewOrder'
import Search from '../../../components/search'

const Order = () => {
    const [_searchTerm, setSearchTerm] = useState('');
    const [_refresh, setRefresh] = useState(false);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setRefresh((prev) => !prev); // Trigger re-fetch
      };

  return (
    <div>
        <div className="flex justify-between mb-4">
            <Search onSearch={handleSearch} placeholder="Tìm kiếm tài khoản" />
        </div>
      <ViewOrder />
    </div>
  )
}

export default Order

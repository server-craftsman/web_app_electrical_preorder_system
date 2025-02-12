import { Button } from 'antd';
import Search from '../../../components/generic/home/search/Search';
import ViewAccount from '../../../components/admin/account/viewaccount'
const Account = () => {
  return (
    <div>
        <div className='flex justify-between mb-4'>
      <Search onSearch={(searchTerm) => console.log(searchTerm)} />
      <Button className='h-10 bg-black text-white'>
        Create
      </Button>
      </div>
        <ViewAccount />
    </div>
  );
}

export default Account
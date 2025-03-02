import Search from '../../../components/search';
import DisplayAccount from '../../../components/admin/account/DisplayAccount';

const Account = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={(searchTerm) => console.log(searchTerm)} />
        <button className="btn-submit">Tạo tài khoản</button>
      </div>
      <DisplayAccount searchTerm={''} refresh={false} />
    </div>
  );
};

export default Account;

import {
  DownloadOutlined,
  FileExcelOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';

// Custom Export Button Component
const ExportButton = ({ onClick }: { onClick: (type: string) => void }) => {
  const menuProps = {
    items: [
      {
        key: 'xlsx',
        icon: <FileExcelOutlined />,
        label: 'Export as XLSX',
      },
      {
        key: 'json',
        icon: <FileTextOutlined />,
        label: 'Export as JSON',
      },
    ],
    onClick: ({ key }: { key: string }) => onClick(key),
  };

  return (
    <Dropdown
      menu={menuProps}
      trigger={['click']}
      overlayClassName="custom-dropdown-overlay"
    >
      <button className="bg-white text-black p-2 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
        Export <DownloadOutlined className="ml-2" />
      </button>
    </Dropdown>
  );
};

// Example usage of the ExportButton
const ExportFile = () => {
  const handleExport = (type: string) => {
    // Logic for exporting files based on type
    console.log(`Exporting file as ${type}...`);
  };

  return (
    <div>
      <ExportButton onClick={handleExport} />
    </div>
  );
};

export default ExportFile;

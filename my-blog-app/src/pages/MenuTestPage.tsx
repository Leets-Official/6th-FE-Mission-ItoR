import Menu from "../components/common/Menu";
import { TrashIcon } from "../assets/icons/TrashIcon";

export default function MenuTestPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 overflow-visible">
      <Menu>
        <TrashIcon />
      </Menu>
    </div>
  );
}

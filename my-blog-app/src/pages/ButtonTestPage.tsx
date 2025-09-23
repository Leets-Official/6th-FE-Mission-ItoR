import { Button } from "../components/common/Button";
import { EditIcon } from "../assets/icons/EditIcon";

export default function ButtonTestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Button Test</h1>

      <div className="space-x-4">
        <Button variant="primary" icon={<EditIcon color="#00A1FF" />}>깃로그 시작하기</Button>
        <Button variant="secondary" icon={<EditIcon color="#909090" />}>깃로그 시작하기</Button>
        <Button variant="flat" icon={<EditIcon color="#909090"/>}>깃로그 시작하기</Button>
        <Button variant="tertiary" icon={<EditIcon color="#909090"/>}>깃로그 시작하기</Button>
        <Button variant="ghost" icon={<EditIcon color="#909090"/>}>깃로그 시작하기</Button>
        <Button variant="black" icon={<EditIcon color="#FFF"/>}>깃로그 시작하기</Button>
        <Button variant="blackMuted" icon={<EditIcon color="#909090"/>}>깃로그 시작하기</Button>
        <Button variant="tag" icon={<EditIcon color="#909090"/>} iconSize={10.5}>깃로그 시작하기</Button>
        <Button variant="tagFilled" icon={<EditIcon color="#909090"/>} iconSize={10.5}>깃로그 시작하기</Button>
      </div>

      <div className="space-x-4">
        <Button variant="primary" disabled>
          Disabled Primary
        </Button>
        <Button variant="black" disabled>
          Disabled Black
        </Button>
      </div>
    </div>
  );
}

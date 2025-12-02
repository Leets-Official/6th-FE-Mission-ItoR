import Modal from '../Modal';

const TestModal = () => {
  const handleClose = () => console.log('Modal closed');
  const handleConfirm = () => console.log('Modal confirmed');

  return (
    <>
      <p>Modal Component</p>
      <div className="p-6 flex flex-col gap-4">
        <Modal
          titleLine1="Title line one"
          titleLine2="Title line two"
          description="설명문 예시입니다."
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
        <Modal
          titleLine1="Title line one"
          titleLine2="Title line two"
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </div>
    </>
  );
};

export default TestModal;

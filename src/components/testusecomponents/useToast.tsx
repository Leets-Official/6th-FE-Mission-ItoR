import Toast from "../Toast"; 

const TestToast = () => {
  return (
    <>
      <p>Toast Component</p>
        <div className="flex flex-col gap-3 p-6">
          <Toast variant="success" />
          <Toast variant="warning" />
        </div>  
    </>
  )
}

export default TestToast;
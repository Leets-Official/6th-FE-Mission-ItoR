import Header from '../Header';

const TestHeader = () => {
  return (
    <>
      <p>Header Component</p>
      <div className="flex flex-col gap-6 p-6">
        <Header variant="write" />
        <Header variant="detail" />
        <Header variant="edit" />
      </div>
    </>
  )
}

export default TestHeader;
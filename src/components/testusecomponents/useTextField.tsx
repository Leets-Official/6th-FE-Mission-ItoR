import TextField from "@/components/TextField"; 


const TestTextField = () => {
  return (
    <>
        <p>TextField Component</p>
        <div className="flex flex-col gap-4">
            <TextField variant="gray" size="sm" />
            <TextField variant="outlineblack" size="sm" />
            <TextField variant="black" size="lg" />
            <TextField variant="filled" size="lg" />
        </div>
    </>
  )
}

export default TestTextField;
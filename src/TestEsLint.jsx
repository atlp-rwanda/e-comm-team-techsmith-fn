const TestEsLint = () => {
  const message = 'Example message';

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default TestEsLint;

function greet() {
  console.log('hello world!')
  let name = 'lame name'
  console.log('welcome, ', name)
}

greet();

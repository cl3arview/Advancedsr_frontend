const testCORS = async () => {
    try {
      const response = await fetch('http://localhost:8080/app/api/images/test');
      if (response.ok) {
        console.log('CORS setup is correct. Server responded successfully.');
      } else {
        console.error('Server responded with an error:', response.status);
      }
    } catch (error) {
      console.error('CORS setup might be incorrect or server is unreachable:', error);
    }
  };
  
  const TestCorsButton = () => {
    return (
      <button onClick={testCORS}>
        Test CORS Setup
      </button>
    );
  };
  
  export default TestCorsButton;
    
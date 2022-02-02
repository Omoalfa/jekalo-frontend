const ErrorHandler = (e) => {
    let errorResponse;
    try {
      if (e.response.data === undefined) errorResponse = "Something went wrong";
      const { error } = e.response.data;
      errorResponse = error;
    } catch (e) {
      errorResponse = "Something went wrong";
    }
    
    return errorResponse;
  };
  
  export default ErrorHandler;
  